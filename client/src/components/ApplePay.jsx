import React, { useState } from 'react';

const ApplePay = ({ total, onSuccess, onError, isDisabled, billingAddress, orderId }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplePay = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      const mockPaymentMethodId = `pm_apple_pay_demo_${Date.now()}`;
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockLast4 = '1234';
      const mockWalletData = {
        billingAddress: billingAddress,
        email: billingAddress?.email,
        paymentType: 'apple_pay_demo'
      };
      
      await onSuccess(mockPaymentMethodId, mockLast4, 'apple_pay', mockWalletData);
    } catch (error) {
      console.error('Apple Pay failed:', error);
      onError(error.message || 'Apple Pay payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <button
        onClick={handleApplePay}
        disabled={isDisabled || isProcessing}
        className="w-[220px] h-10 md:h-11 rounded-lg bg-black hover:bg-gray-900 transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        type="button"
        aria-label="Apple Pay"
      >
        {isProcessing ? (
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <>
            <span className="text-white text-xl font-normal leading-none"></span>
            <span className="text-white text-sm font-semibold tracking-wide">Pay</span>
            <span className="text-white/60 text-xs font-medium">${total.toFixed(2)}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ApplePay;