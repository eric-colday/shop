import Category from "../models/CategoryPost.js";

//create a category
export const createCategory = async (req, res, next) => {
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    next(err);
  }
};

//get category
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

//update a category
export const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

//delete a category
export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted");
  } catch (err) {
    next(err);
  }
};

// get all categories
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

