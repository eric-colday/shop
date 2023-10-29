import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = Stripe("sk_test_t48jllUXmtFzPCcarVKa6ike");

router.post("/payment", async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

export default router;
