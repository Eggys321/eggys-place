import express from "express";
import { allProducts, createProduct, deleteProduct, product, products, searchProduct, updateProduct } from "../controllers/productController.js";
import auth from "../middleware/auth.js";
import restrict from "../middleware/isAdmin.js";
const router = express.Router();

// search (must come before the "/:productId" param route below)
router.get("/products/search",searchProduct)

// all products
router.get("/all-products",allProducts);

// admin-only product management
router.post("/create", auth, restrict("admin"), createProduct);

// insert many
router.post('/products', auth, restrict("admin"), products );

router.put("/:productId", auth, restrict("admin"), updateProduct);
router.delete("/:productId", auth, restrict("admin"), deleteProduct);

// single product
router.get("/:productId",product);

export default router;
