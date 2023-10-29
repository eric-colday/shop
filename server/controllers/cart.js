import Cart from '../models/Cart.js';


//create a cart
export const createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    next(err);
  }
};

//get cart
export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({usedId: req.params.id});
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};


//Update a cart
export const updatedCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
};

//delete a cart
export const deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('Cart has been deleted');
  } catch (err) {
    next(err);
  }
}

//get all Carts
export const getAllCarts = async (req, res, next) => {
 

  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    next(err);
  }
}


