const catchAsyncError = require('../middleware/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const { 
        amount,
        billing_address,
        email,
        name,
        card_info
    } = req.body;
    
    console.log('=== PAYMENT CONTROLLER ===');
    console.log('Received card_info:', card_info);
    console.log('Amount:', amount);
    
    // Extract card information
    const cardLast4 = card_info?.card_last4 || card_info?.cardNumber?.slice(-4) || '0000';
    const cardType = card_info?.cardType || 'unknown';
    
    // Format amount properly (convert to cents)
    const amountInCents = Math.round(amount * 100);
    
    // Create payment intent with ALL metadata
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        description: "E-Commerce Payment",
        metadata: { 
            integration_check: "accept_payment",
            email: email || billing_address?.email,
            customer_name: name || `${billing_address?.firstName} ${billing_address?.lastName}`,
            card_last4: cardLast4,
            card_type: cardType
        },
        shipping: {
            name: name || `${billing_address?.firstName} ${billing_address?.lastName}`,
            address: {
                line1: billing_address?.address,
                city: billing_address?.city,
                state: billing_address?.state,
                postal_code: billing_address?.zipCode,
                country: "US"
            },
            phone: billing_address?.phoneNumber
        },
        receipt_email: email || billing_address?.email
    });

    console.log('Stripe Payment Intent created:', paymentIntent.id);
    console.log('Card Last4:', cardLast4);
    console.log('Card Type:', cardType);

    // Return ALL required data
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
        transaction_id: paymentIntent.id,
        amount: amount,
        currency: "usd",
        card_last4: cardLast4,
        card_type: cardType
    });
});

exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});