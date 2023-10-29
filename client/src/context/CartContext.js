import { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]

  function getProductQuantity(_id) {
    const quantity = cartProducts.find(
      (product) => product._id === _id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(_id) {
    const quantity = getProductQuantity(_id);

    if (quantity === 0) {
      // product is not in cart
      setCartProducts([
        ...cartProducts,
        {
          id: _id,
          quantity: 1,
        },
      ]);
    } else {
      // product is in cart
      // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]    add to product id of 2
      setCartProducts(
        cartProducts.map(
          (product) =>
            product._id === _id // if condition
              ? { ...product, quantity: product.quantity + 1 } // if statement is true
              : product // if statement is false
        )
      );
    }
  }

  function removeOneFromCart(_id) {
    const quantity = getProductQuantity(_id);

    if (quantity === 1) {
      deleteFromCart(_id);
    } else {
      setCartProducts(
        cartProducts.map(
          (product) =>
            product._id === _id // if condition
              ? { ...product, quantity: product.quantity - 1 } // if statement is true
              : product // if statement is false
        )
      );
    }
  }

  function deleteFromCart(_id) {
    // [] if an object meets a condition, add the object to array
    // [product1, product2, product3]
    // [product1, product3]
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct._id !== _id;
      })
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = axios.get(`/products/${cartItem._id}`);
      totalCost += productData.price * cartItem.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;

// CODE DOWN HERE

// Context (cart, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context
