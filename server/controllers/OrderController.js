import ORDER from "../models/OrderModel.js";

export const createOrder = async (req, res) => {
    req.body.user = req.user.userId

    try {
      const {
        orderItems,
        recipientInfo,
        deliveryAddress,
        totalAmount,
        paymentReference,
      } = req.body;
  
      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
      }
  
      if (!paymentReference) {
        return res.status(400).json({ message: 'Payment reference is required' });
      }
  
      const order = await ORDER.create({
        user: req.user.userId,
        orderItems,
        recipientInfo,
        deliveryAddress,
        totalAmount,
        paymentReference,
        status: 'paid',
      });
  
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  