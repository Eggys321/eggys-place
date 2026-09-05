import express from "express";
import { createOrder, customerOrder, getOrderById, getSingleOrder, orders, orderStats, updateOrderStatus } from "../controllers/OrderController.js";
import auth from "../middleware/auth.js";
import restrict from "../middleware/isAdmin.js";
const router = express.Router();

router.post("/", auth, createOrder);
router.get("/stats", auth, restrict("admin"), orderStats);
router.get("/all-orders", auth, restrict("admin"), orders);
router.get("/all-orders/:orderId", auth, restrict("admin"), getOrderById);
router.patch("/all-orders/:orderId/status", auth, restrict("admin"), updateOrderStatus);
router.get("/customer-order", auth, customerOrder);
router.get("/:orderId", auth, getSingleOrder);

export default router;
