import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.

      return;
    }

    setIsProcessing(true);

    // const res = await axios.post("/orders", {
    //   userId: props.userId,
    //   products: props.products.map((item) => ({
    //     productId: item._id,
    //     quantity: item._quantity,
    //   })),
    //   amount: props.amount(),
    // });
    // console.log(res.data);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/success`,
      },
    });
    

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element"/>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 rounded"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
