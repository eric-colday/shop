import express from "express";
import { login, register, logout, loginAdmin } from "../controllers/auth.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//6- 
router.post("/register", register)
router.post("/login", login) 
router.post("/login-admin", verifyAdmin, loginAdmin) 
router.get("/logout", logout)      

export default router