import express from "express";
import auth from "../middleware/auth.js";
import { createOrder } from "../controllers/OrderController.js";
const router = express.Router();


// Create an order
router.post('/',auth, createOrder);


export default router;
