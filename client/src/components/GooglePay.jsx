import GooglePayButton from "@google-pay/button-react";
import { useCart } from '../context/CartContext';
import { paymentAPI } from '../services/api';
import { useState, useEffect } from 'react';

const GooglePay = ({ onSuccess, onError, isDisabled, billingAddress,  selectedShipping, shippingCost }) => {
  const { cart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [dynamicShippingCost, setDynamicShippingCost] = useState(12.87);
  const [dynamicSelectedShipping, setDynamicSelectedShipping] = useState('standard');

  useEffect(() => {
    if (shippingCost !== undefined) {
      setDynamicShippingCost(shippingCost);
    } else {
      const savedShippingCost = localStorage.getItem('shippingCost');
      if (savedShippingCost) {
        setDynamicShippingCost(parseFloat(savedShippingCost));
      }
    }

    if (selectedShipping !== undefined) {
      setDynamicSelectedShipping(selectedShipping);
    } else {
      const savedSelectedShipping = localStorage.getItem('selectedShipping');
      if (savedSelectedShipping) {
        setDynamicSelectedShipping(savedSelectedShipping);
      }
    }
  }, [shippingCost, selectedShipping]);

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  const total = (subtotal + dynamicShippingCost).toFixed(2);
  
  const processGooglePayPayment = async (paymentData) => {
    if (isProcessing || isDisabled) return;
    
    setIsProcessing(true);
    
    try {
      console.log('Google Pay payment data:', paymentData);
      
      const tokenObject = JSON.parse(paymentData.paymentMethodData.tokenizationData.token);
      const stripeToken = tokenObject.id;
      
      console.log('Stripe Token:', stripeToken);
      const convertResponse = await paymentAPI.convertTokenToPaymentMethod({
        tokenId: stripeToken
      });
      
      console.log('Conversion response:', convertResponse.data);
      
      if (convertResponse.data.success) {
        const paymentMethodId = convertResponse.data.paymentMethodId;
        const cardLast4 = convertResponse.data.card?.last4 || '0000';
        const cardType = convertResponse.data.card?.brand || 'google_pay';
        
        const googlePayAddress = paymentData.shippingAddress;
        const googlePayEmail = paymentData.email;

        const walletData = {
          billingAddress: billingAddress || {
            givenName: googlePayAddress?.name?.split(' ')[0] || '',
            familyName: googlePayAddress?.name?.split(' ').slice(1).join(' ') || '',
            address1: googlePayAddress?.address1 || '',
            locality: googlePayAddress?.locality || '',
            administrativeArea: googlePayAddress?.administrativeArea || '',
            postalCode: googlePayAddress?.postalCode || '',
            phoneNumber: googlePayAddress?.phoneNumber || ''
          },
          email: googlePayEmail || billingAddress?.email,
          paymentType: 'google_pay',
          shippingMethod: dynamicSelectedShipping,
          shippingCost: dynamicShippingCost
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
                  'stripe:publishableKey': 'pk_test_51TGu5ABewZFiD3qE5EtyR6SJO8cnMHRGWT3PwwpF3SYRYSsNl3Dz1hfqmlCXKbz8f9sc97sv334Or628zKgIDy4u00cWyVE9Ky'
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
          shippingAddressParameters: {
            allowedCountryCodes: ['US'],
            phoneNumberRequired: true,
          },
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