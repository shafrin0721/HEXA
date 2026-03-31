// controllers/paymentController.js
const catchAsyncError = require('../middleware/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const { 
        amount,
        billing_address,
        email,
        name 
    } = req.body;
    
    // Format amount properly (convert to cents if needed)
    const amountInCents = Math.round(amount * 100);
    
    // Create payment intent with customer information
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        description: "E-Commerce Payment",
        metadata: { 
            integration_check: "accept_payment",
            email: email || billing_address?.email,
            customer_name: name || `${billing_address?.firstName} ${billing_address?.lastName}`
        },
        shipping: {
            name: name || `${billing_address?.firstName} ${billing_address?.lastName}`,
            address: {
                line1: billing_address?.address || req.body.shipping?.address?.line1,
                city: billing_address?.city || req.body.shipping?.address?.city,
                state: billing_address?.state || req.body.shipping?.address?.state,
                postal_code: billing_address?.zipCode || req.body.shipping?.address?.postal_code,
                country: "US"
            },
            phone: billing_address?.phoneNumber || req.body.shipping?.phone
        },
        receipt_email: email || billing_address?.email
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
        amount: amount,
        currency: "usd"
    });
});

exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});