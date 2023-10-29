import express from "express";

import {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
} from "../controllers/categoriesPost.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create a category
router.post("/", createCategory);

//get category
router.get("/:id", getCategory);

//update a category
router.put("/:id", verifyAdmin, updateCategory);

//delete a category
router.delete("/:id", verifyAdmin, deleteCategory);

// get all categories
router.get("/", getAllCategories);

export default router;