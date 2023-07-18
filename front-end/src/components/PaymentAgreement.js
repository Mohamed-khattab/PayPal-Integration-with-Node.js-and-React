import React from 'react';
import axios from 'axios';

const PaymentAgreement = () => {
  const handlePaymentAgreement = async () => {
    try {
      const response = await axios.post('/payment/agreement');
      // You can handle the response here if needed
      console.log(response.data);
      // Redirect to the success page
      window.location.href = '/success';
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Payment Agreement</h1>
      <button onClick={handlePaymentAgreement}>Create Payment Agreement</button>
    </div>
  );
};

export default PaymentAgreement;
