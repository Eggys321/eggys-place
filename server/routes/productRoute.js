import express from "express";
import { createProduct } from "../controllers/productController.js";
const router = express.Router();

// post request
router.post("/create",createProduct);

export default router;