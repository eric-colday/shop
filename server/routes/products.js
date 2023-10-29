import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updatedProduct,
} from "../controllers/product.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// @route   POST api/products
router.post("/", verifyAdmin, createProduct);

// @route   GET api/find/:id
router.get("/find/:id", getProduct); 

// @route  PUT api/products/:id
router.put("/:id", verifyAdmin, updatedProduct);

// @route   DELETE api/products/:id
router.delete("/:id", verifyAdmin, deleteProduct);

// @route   GET api/products
router.get("/", getAllProducts);

export default router;
