import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import CheckoutFormTest from "../../components/CheckoutFormTest";


const stripePromise = loadStripe("pk_test_KExMf2lqdDMnlDHGSRCYTSMm");

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await publicRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [id]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div>
   {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutFormTest />
        </Elements>
      )}
  </div>;
};

export default Pay;
