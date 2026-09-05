import express from "express";
import { createOrder, customerOrder, getOrderById, getSingleOrder, orders, orderStats, updateOrderStatus } from "../controllers/OrderController.js";
import auth from "../middleware/auth.js";
import restrict from "../middleware/isAdmin.js";
const router = express.Router();


// create order
router.post("/",auth, createOrder);
// order counts/revenue overview (admin)
router.get("/stats", auth, restrict("admin"), orderStats);
// all orders (admin)
router.get("/all-orders", auth , restrict("admin"),orders);
// single order (admin) - any order, not just the requesting user's own
router.get("/all-orders/:orderId", auth, restrict("admin"), getOrderById);
// update order status (admin)
router.patch("/all-orders/:orderId/status", auth, restrict("admin"), updateOrderStatus);
// orders by customer
router.get("/customer-order",auth,customerOrder);
// single order route
router.get("/:orderId",auth, getSingleOrder )

export default router;
