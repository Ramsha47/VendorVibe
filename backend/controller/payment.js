const express = require("express");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment/process", catchAsyncError(async (req, res) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
          company: "vendorvibe",
        },
      });
    res.json({ clientSecret: myPayment.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
}));

router.get(
    "/stripeapikey",
    catchAsyncError(async (req, res, next) => {
      res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
    })
  );

module.exports = router;
