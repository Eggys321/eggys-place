import USER from "../models/userModel.js";
import ORDER from "../models/OrderModel.js";

export const allCustomers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const [customers, totalCustomers] = await Promise.all([
            USER.find({ role: "customer" })
                .select("firstName lastName email createdAt")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            USER.countDocuments({ role: "customer" }),
        ]);

        const customerIds = customers.map((c) => c._id);
        const orderStats = await ORDER.aggregate([
            { $match: { user: { $in: customerIds } } },
            { $group: { _id: "$user", orderCount: { $sum: 1 }, totalSpent: { $sum: "$totalPrice" } } },
        ]);
        const statsByUser = Object.fromEntries(orderStats.map((s) => [s._id.toString(), s]));

        const customersWithStats = customers.map((customer) => ({
            ...customer,
            orderCount: statsByUser[customer._id.toString()]?.orderCount || 0,
            totalSpent: statsByUser[customer._id.toString()]?.totalSpent || 0,
        }));

        res.status(200).json({
            success: true,
            message: "all customers",
            currentPage: page,
            totalPages: Math.ceil(totalCustomers / limit),
            totalCustomers,
            customers: customersWithStats,
        });
    } catch (error) {
        res.status(500).json({ success: false, errMsg: error.message });
    }
};

export const getCustomerById = async (req, res) => {
    try {
        const customer = await USER.findOne({ _id: req.params.userId, role: "customer" }).select("firstName lastName email createdAt");
        if (!customer) {
            return res.status(404).json({ success: false, errMsg: "customer not found" });
        }
        const orders = await ORDER.find({ user: customer._id }).select("totalPrice status createdAt").sort({ createdAt: -1 }).lean();

        res.status(200).json({ success: true, message: "customer found", customer, orders });
    } catch (error) {
        res.status(500).json({ success: false, errMsg: error.message });
    }
};
