// server/routes/paymentRoute.js
const express = require("express");
const { processPayment, sendStripeApi, convertTokenToPaymentMethod } = require("../controllers/paymentController.js");
const router = express.Router();

router.route("/payment/process").post(processPayment);
router.route("/payment/convert-token").post(convertTokenToPaymentMethod);
router.route("/stripeapi").get(sendStripeApi);

module.exports = router;