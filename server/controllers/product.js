import Product from '../models/Product.js';


//create a product
export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

//get product
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id); 
    res.status(200).json(product);
  } catch (err) { 
    next(err);
  }
};


//Update a product
export const updatedProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

//delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted');
  } catch (err) {
    next(err);
  }
}

//get all products
export const getAllProducts = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}


