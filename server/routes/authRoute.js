import express from "express";
import { forgotPassword, isLoggedIn, resetPassword, signIn, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-up", signUp);

router.post("/sign-in", signIn);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:resetToken", resetPassword);
router.get("/isloggedin", isLoggedIn);

export default router;
