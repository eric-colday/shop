import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updatedOrder,
  getIncome,
} from "../controllers/order.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//@route   POST api/orders
router.post("/", createOrder);

// @route   GET used order api/find/:userdId
router.get("/find/:userdId", verifyAdmin, getOrder);

// @route  PUT api/orders/:id
router.put("/:id", verifyAdmin, updatedOrder);

// @route   DELETE api/orders/:id
router.delete("/:id", verifyAdmin, deleteOrder);

// @route   GET api/orders
router.get("/", getAllOrders);

//@route   GET api/orders/income
router.get("/income", getIncome);

export default router;
