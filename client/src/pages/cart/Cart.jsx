import React, { useContext, useEffect, useState } from "react";
import Announcement from "../../components/announcement/Announcement";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  decrease,
  increase,
  removeItem,
  resetCart,
} from "../../redux/cartReducer";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate;

  const [modal, setModal] = useState(false);

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:5500/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate("/success", {
          stripeData: res.data,
          products: products,
        })
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [navigate, products, stripeToken]);

  const handlePayment = async () => {
    try {
      fetch("/config").then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      });

      setModal(true);

      fetch("/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({}),
      }).then(async (result) => {
        var { clientSecret } = await result.json();
        setClientSecret(clientSecret);
        console.log(clientSecret);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <Announcement />
      <div className="bg-gray-50 py-6">
        <div className="cart2 max-w-screen-lg mx-auto px-4">
          <h1 className="cartTttle text-3xl font-bold mb-6">Panier</h1>
          <div className="cartBox">
            {products.map((item) => (
              <div key={item.id} className="cartCont flex items-center mb-6">
                <div className="cartWrap w-1/4 mr-4">
                  <img
                    className="cartImg w-full object-cover border-solid border-stone-200"
                    src={item.img}
                    alt={item.title}
                  />
                </div>
                <div className="cartInfo2">
                  <p className="text-xl font-medium mb-2">{item.title}</p>
                  <p className="text-lg font-light mb-2">{item.size}</p>
                  <p className="text-lg font-light mb-2">{item.color}</p>
                  <p className="text-lg font-light mb-2">
                    {item.quantity} x {item.price.toFixed(2)} €
                  </p>
                  <div className="cartButtons">
                    <button
                      className=""
                      onClick={() =>
                        dispatch(
                          increase({
                            id: item.id,
                            quantity: 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          dispatch(
                            decrease({
                              id: item.id,
                              quantity: 1,
                            })
                          );
                        } else {
                          dispatch(removeItem(item.id));
                        }
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="cartButton"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {products.length === 0 ? null : (
            <div className="cartPay">
              <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
                <span className="text-lg font-medium">Sous-total:</span>
                <span className="text-xl font-bold">{totalPrice()} €</span>
              </div>
              <div className="flex items-center justify-end py-6">
                <button onClick={handlePayment} className="cartButton">
                  Acheter
                </button>
                <StripeCheckout
                  name="Lama Shop"
                  image="https://avatars.githubusercontent.com/u/1486366?v=4"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${totalPrice}`}
                  amount={totalPrice * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <button>CHECKOUT NOW</button>
                </StripeCheckout>
              </div>
              <div className="text-right">
                <button
                  className="cartButton"
                  onClick={() => dispatch(resetCart())}
                >
                  Vider le panier
                </button>
              </div>
            </div>
          )}
          {modal && clientSecret && stripePromise && (
            <>
              <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white w-1/2 p-4 rounded">
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                      products={products}
                      userId={user._id}
                      amount={totalPrice}
                    />
                  </Elements>
                  <button
                    onClick={() => setModal(false)}
                    className="cartButton"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </>
          )}
          {products.length === 0 ? (
            <div className="empty-cart">
              <h3>Votre panier est vide</h3>
              <Link to="/">
                <button className="cartButton"> {"<"} Accueil </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Cart;
