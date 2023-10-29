import express from "express";
import {
  createCart,
  deleteCart,
  getAllCarts,
  getCart,
  updatedCart,
} from "../controllers/cart.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// @route   POST api/carts
router.post("/", verifyAdmin, createCart);

// @route   GET used cart api/find/:userdId
router.get("/find/:userdId", verifyAdmin, getCart);

// @route  PUT api/carts/:id
router.put("/:id", verifyAdmin, updatedCart);

// @route   DELETE api/carts/:id
router.delete("/:id", verifyAdmin, deleteCart);

// @route   GET api/carts
router.get("/", verifyAdmin, getAllCarts);

export default router;
