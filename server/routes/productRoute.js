import express from "express";
import { allProducts, createProduct, deleteProduct, product, products, searchProduct, updateProduct } from "../controllers/productController.js";
import auth from "../middleware/auth.js";
import restrict from "../middleware/isAdmin.js";
const router = express.Router();

router.get("/products/search", searchProduct);

router.get("/all-products", allProducts);

router.post("/create", auth, restrict("admin"), createProduct);

router.post("/products", auth, restrict("admin"), products);

router.put("/:productId", auth, restrict("admin"), updateProduct);
router.delete("/:productId", auth, restrict("admin"), deleteProduct);

router.get("/:productId", product);

export default router;
