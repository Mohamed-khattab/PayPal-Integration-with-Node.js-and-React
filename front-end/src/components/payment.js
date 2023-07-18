import React, { useEffect } from 'react';
import axios from 'axios';

function PaymentPage() {
  useEffect(() => {
    const createPaymentAgreement = async () => {
      try {
        const response = await axios.post('/api/payment/agreement', {
          // Include any required data for creating the payment agreement
        });
        const { approvalUrl } = response.data;
        window.location.href = approvalUrl;
      } catch (error) {
        console.error('Error:', error);
        // Handle any error during the payment agreement creation
      }
    };

    createPaymentAgreement();
  }, []);

  return (
    <div>
      <h2>Redirecting to PayPal for payment agreement approval...</h2>
    </div>
  );
}

export default PaymentPage;
