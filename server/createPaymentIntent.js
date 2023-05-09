require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function createPaymentIntent(req, res) {
  const { amount, currency } = req.body;

  stripe.paymentIntents
    .create({
      amount,
      currency,
      // You can also add additional parameters here, such as a customer 
      // ID or payment method ID
      metadata: { integration_check: "accept_a_payment" },
    })
    .then((paymentIntent) => {
      res.json({ clientSecret: paymentIntent.client_secret });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .send({ error: "An error occurred while creating the payment intent" });
    });
}

module.exports = {
  createPaymentIntent,
};
