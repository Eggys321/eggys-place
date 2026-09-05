import ORDER from "../models/OrderModel.js";
import PRODUCT from "../models/productModel.js";
import { sendOrder } from "../emails/emailHandlers.js";
import { verifyPaystackTransaction } from "../utils/verifyPayment.js";

const DELIVERY_FEE = 2500;

// "?status=paid,delivered" -> { status: { $in: ["paid","delivered"] } }, "?status=paid" -> { status: "paid" }
const statusFilter = (statusParam) => {
    if (!statusParam) return {};
    const statuses = statusParam.split(",").map((s) => s.trim()).filter(Boolean);
    return statuses.length > 1 ? { status: { $in: statuses } } : { status: statuses[0] };
};

export const createOrder  = async (req,res)=>{
    try {
        req.body.user = req.user.userId
        const {orderItems,recipientInfo,deliveryAddress,paymentRef} = req.body;
        if(!orderItems || !recipientInfo || !deliveryAddress || !paymentRef){
            return res.status(400).json({success:false,errMsg:"all fields are required"})
        }
        if(!Array.isArray(orderItems) || orderItems.length === 0){
            return res.status(400).json({success:false,errMsg:"No ordered item(s) yet"})
        }

        // never trust price/quantity from the client - look every item up by its
        // real product id and recompute the total from the database
        const resolvedItems = await Promise.all(
            orderItems.map(async (item) => {
                const product = await PRODUCT.findById(item._id).lean();
                if (!product) return null;
                const quantity = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
                return {
                    product: product._id,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    category: product.category,
                    price: product.price,
                    duration: product.duration,
                    rating: product.rating,
                    quantity,
                };
            })
        );

        if (resolvedItems.some((item) => item === null)) {
            return res.status(400).json({success:false,errMsg:"One or more items in your order are no longer available"});
        }

        const totalPrice = resolvedItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + DELIVERY_FEE;

        // confirm the payment actually happened before ever marking an order "paid"
        try {
            const transaction = await verifyPaystackTransaction(paymentRef);
            const paidAmount = transaction.amount / 100; // paystack returns kobo
            if (Math.round(paidAmount) !== Math.round(totalPrice)) {
                return res.status(400).json({success:false,errMsg:"Payment amount does not match order total"});
            }
        } catch (error) {
            return res.status(402).json({success:false,errMsg: error.message || "Payment could not be verified"});
        }

        const order = await ORDER.create({
            user: req.body.user,
            orderItems: resolvedItems,
            recipientInfo,
            deliveryAddress,
            paymentRef,
            totalPrice,
            status: "paid",
        });
        res.status(201).json({success:true,message:"order created",order})
        sendOrder(order);

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({success:false,errMsg:"This payment reference has already been used"});
        }
        res.status(500).json({success:false,errMsg:error.message})
    }
}

// getting all orders (admin) - paginated
export const orders = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const filter = statusFilter(req.query.status);

        const [orders, totalOrders] = await Promise.all([
            ORDER.find(filter)
                .select("_id recipientInfo.fullName orderItems totalPrice status createdAt")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            ORDER.countDocuments(filter),
        ]);
        res.status(200).json({success:true,message:"all orders",currentPage:page,totalPages:Math.ceil(totalOrders/limit),totalOrders,orders})
    } catch (error) {
        res.status(500).json({success:false,errMsg:error.message})
    }
}

// admin: update an order's status
export const updateOrderStatus = async (req,res)=>{
    try {
        const { status } = req.body;
        const allowedStatuses = ["pending","paid","delivered","cancelled"];
        if(!allowedStatuses.includes(status)){
            return res.status(400).json({success:false,errMsg:`status must be one of: ${allowedStatuses.join(", ")}`});
        }
        const order = await ORDER.findByIdAndUpdate(req.params.orderId, { status }, { new:true });
        if(!order){
            return res.status(404).json({success:false,errMsg:"order not found"});
        }
        res.status(200).json({success:true,message:"order status updated",order});
    } catch (error) {
        res.status(500).json({success:false,errMsg:error.message})
    }
}

// admin: order counts/revenue overview for the dashboard
export const orderStats = async (req,res)=>{
    try {
        const [byStatus, totals] = await Promise.all([
            ORDER.aggregate([
                { $group: { _id: "$status", count: { $sum: 1 }, revenue: { $sum: "$totalPrice" } } },
            ]),
            ORDER.aggregate([
                { $group: { _id: null, totalOrders: { $sum: 1 }, totalRevenue: { $sum: "$totalPrice" } } },
            ]),
        ]);

        const statusCounts = { pending: 0, paid: 0, delivered: 0, cancelled: 0 };
        byStatus.forEach(({ _id, count }) => { if (_id in statusCounts) statusCounts[_id] = count; });

        res.status(200).json({
            success: true,
            totalOrders: totals[0]?.totalOrders || 0,
            totalRevenue: totals[0]?.totalRevenue || 0,
            statusCounts,
        });
    } catch (error) {
        res.status(500).json({success:false,errMsg:error.message})
    }
}

// admin: fetch any single order by id
export const getOrderById = async (req,res)=>{
    try {
        const order = await ORDER.findById(req.params.orderId).populate("user","firstName lastName email");
        if(!order){
            return res.status(404).json({success:false,errMsg:"order not found"});
        }
        res.status(200).json({success:true,message:"order found",order});
    } catch (error) {
        res.status(500).json({success:false,errMsg:error.message})
    }
}

// orders for customer with pagination
export const customerOrder = async (req,res)=>{
    const {userId} = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const filter = { user: userId, ...statusFilter(req.query.status) };

    try {
        const totalOrders = await ORDER.countDocuments(filter);
        const orders = await ORDER.find(filter).select("orderItems status createdAt totalPrice").sort({createdAt:-1}).skip(skip).limit(limit).lean();
        res.status(200).json({success:true,message:"your order(s)" ,currentPage:page, totalPages: Math.ceil(totalOrders/limit),totalOrders,orders})
    } catch (error) {
        res.status(500).json({success:false,errMsg:error.message})
    }
}

// controllers/orderController.js

export const getSingleOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const userId = req.user.userId;

      const order = await ORDER.findOne({ _id: orderId, user: userId });

      if (!order) {
        return res.status(404).json({
          success: false,
          errMsg: "Order not found or access denied",
        });
      }

      res.status(200).json({
        success: true,
        message: "Order details fetched successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        errMsg: "Server error",
      });
    }
  };
