// frontend/src/components/GooglePay.jsx
import GooglePayButton from "@google-pay/button-react";
import { useCart } from '../context/CartContext';
import { paymentAPI } from '../services/api';
import { useState } from 'react';

const GooglePay = ({ onSuccess, onError, isDisabled, billingAddress }) => {
  const { cart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate cart total
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  const shipping = 12.87;
  const total = (subtotal + shipping).toFixed(2);
  
  const processGooglePayPayment = async (paymentData) => {
    if (isProcessing || isDisabled) return;
    
    setIsProcessing(true);
    
    try {
      console.log('Google Pay payment data:', paymentData);
      
      // Parse the token from Google Pay response
      const tokenObject = JSON.parse(paymentData.paymentMethodData.tokenizationData.token);
      const stripeToken = tokenObject.id;
      
      console.log('Stripe Token:', stripeToken);
      
      // Convert token to payment method
      const convertResponse = await paymentAPI.convertTokenToPaymentMethod({
        tokenId: stripeToken
      });
      
      console.log('Conversion response:', convertResponse.data);
      
      if (convertResponse.data.success) {
        const paymentMethodId = convertResponse.data.paymentMethodId;
        const cardLast4 = convertResponse.data.card?.last4 || '0000';
        const cardType = convertResponse.data.card?.brand || 'google_pay';
        
        const walletData = {
          billingAddress: billingAddress,
          email: paymentData.email || billingAddress?.email,
          paymentType: 'google_pay'
        };
        
        await onSuccess(paymentMethodId, cardLast4, cardType, walletData);
      } else {
        throw new Error('Failed to convert token');
      }
    } catch (error) {
      console.error('Google Pay processing error:', error);
      if (onError) {
        onError(error.response?.data?.message || error.message || 'Google Pay failed');
      }
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="w-full flex justify-center">
      <GooglePayButton 
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX', 'DISCOVER'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'stripe',
                  'stripe:version': '2024-06-20',
                  'stripe:publishableKey': 'pk_test_51TGu5dBH31pt7B5lehbsnQmaEH2iBFfffkbYMhCJ0vsFjAvEJ8EUUUL7JTMGmZDrrkMYnsaVjt6baiVp7HkXO73J00tZ0ohRoB'
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: 'BCR2DN6T3R5S4EXAMPLE',
            merchantName: 'Your Store Name',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: total,
            currencyCode: 'USD',
            countryCode: 'US',
          },
          emailRequired: true,
          shippingAddressRequired: true,
        }}
        onLoadPaymentData={processGooglePayPayment}
        onError={(error) => {
          console.error('Google Pay Error:', error);
          if (onError) {
            onError(error.statusMessage || 'Google Pay failed. Please try again.');
          }
        }}
        existingPaymentMethodRequired={false}
        buttonColor="black"
        buttonType="buy"
      />
    </div>
  );
};

export default GooglePay;