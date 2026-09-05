import express from "express";
import { allCustomers, getCustomerById } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import restrict from "../middleware/isAdmin.js";
const router = express.Router();

// admin-only customer management
router.get("/all-customers", auth, restrict("admin"), allCustomers);
router.get("/:userId", auth, restrict("admin"), getCustomerById);

export default router;
