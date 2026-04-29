// server/controllers/paymentController.js
const catchAsyncError = require("../middleware/catchAsyncError.js");
const Stripe = require("stripe");

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return Stripe(key);
}

// Add this new function to convert token to payment method
exports.convertTokenToPaymentMethod = catchAsyncError(async (req, res, next) => {
  const stripe = getStripe();
  if (!stripe) {
    return res.status(503).json({
      success: false,
      message: "Payment service not configured (set STRIPE_SECRET_KEY)",
    });
  }

  const { tokenId } = req.body;

  try {
    // Convert the token to a PaymentMethod
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: tokenId
      }
    });

    console.log('Token converted to PaymentMethod:', paymentMethod.id);

    res.status(200).json({
      success: true,
      paymentMethodId: paymentMethod.id,
      card: {
        last4: paymentMethod.card.last4,
        brand: paymentMethod.card.brand,
        exp_month: paymentMethod.card.exp_month,
        exp_year: paymentMethod.card.exp_year
      }
    });
  } catch (error) {
    console.error("Token conversion error:", error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const stripe = getStripe();
  if (!stripe) {
    return res.status(503).json({
      success: false,
      message: "Payment service not configured (set STRIPE_SECRET_KEY)",
    });
  }

  const { amount, billing_address, email, name, payment_method_token } = req.body;

  const amountInCents = Math.round(amount * 100);

  try {
    // Check if we're in demo mode
    if (payment_method_token && payment_method_token.startsWith('pm_google_pay_demo_') || 
        payment_method_token && payment_method_token.startsWith('pm_apple_pay_demo_')) {
      return res.status(200).json({
        success: true,
        payment_intent_id: `pi_demo_${Date.now()}`,
        transaction_id: `pi_demo_${Date.now()}`,
        amount: amount,
        currency: "usd",
        card_last4: "4242",
        card_type: payment_method_token.includes('google') ? "google_pay" : "apple_pay",
        payment_status: "succeeded",
        message: "Demo payment successful"
      });
    }

    // Create payment intent with the payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method: payment_method_token,
      confirm: true,
      confirmation_method: "automatic",
      return_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/payment/complete`,
      description: "E-Commerce Payment",
      metadata: {
        email: email || billing_address?.email,
        customer_name: name || `${billing_address?.firstName} ${billing_address?.lastName}`,
      },
      shipping: {
        name: name || `${billing_address?.firstName} ${billing_address?.lastName}`,
        address: {
          line1: billing_address?.address,
          city: billing_address?.city,
          state: billing_address?.state,
          postal_code: billing_address?.zipCode,
          country: "US",
        },
        phone: billing_address?.phoneNumber,
      },
      receipt_email: email || billing_address?.email,
    });

    const cardLast4 = paymentIntent.payment_method_details?.card?.last4 || "4242";
    const cardType = paymentIntent.payment_method_details?.card?.brand || "visa";

    res.status(200).json({
      success: true,
      payment_intent_id: paymentIntent.id,
      transaction_id: paymentIntent.id,
      amount: amount,
      currency: "usd",
      card_last4: cardLast4,
      card_type: cardType,
      payment_status: paymentIntent.status,
    });
  } catch (error) {
    console.error("Stripe Error Details:", error);
    res.status(400).json({
      success: false,
      message: error.message,
      error_type: error.type,
      decline_code: error.code,
    });
  }
});

exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});