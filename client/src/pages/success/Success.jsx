import React from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartReducer";

const Success = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    window.location.replace("/");
    dispatch(resetCart());
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-1/2 p-4 rounded">
        <h1 className="text-2xl font-bold mb-4">Merci pour votre commande !</h1>
        <p className="text-lg font-light mb-4">
          Vous allez recevoir un email de confirmation.
        </p>
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Success;
