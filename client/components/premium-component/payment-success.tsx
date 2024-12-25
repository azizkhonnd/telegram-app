import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PaymentSuccess = () => {
  const router = useRouter();
  const { payment_id } = router.query;  

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post('/api/verify-payment', { payment_id });

        if (response.data.status === 'success') {
          alert('Payment successful!');
        } else {
          alert('Payment failed!');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        alert('Payment verification failed');
      }
    };

    if (payment_id) {
      verifyPayment();
    }
  }, [payment_id]);

  return <div>Payment Success!</div>;
};

export default PaymentSuccess
