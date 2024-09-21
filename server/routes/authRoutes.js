import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private routes
router.get("/user", authenticate, authorize(["user", "admin"]), (req, res) => {
	res
		.status(200)
		.json({ message: `Welcome ${req.user.name}, you are a ${req.user.role}` });
});

router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
	res
		.status(200)
		.json({ message: `Welcome ${req.user.name}, you have admin access` });
});

export default router;