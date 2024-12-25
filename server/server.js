import axios from 'axios';

const createPaymentLink = async () => {
  try {
    const response = await axios.post('https://api.link.com/create-payment', {
      amount: 500,  
      currency: 'USD',
      description: 'Telegram Premium',
      redirect_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`
    });

    const paymentLink = response.data.payment_url;

    window.location.href = paymentLink;
  } catch (error) {
    console.error('Error creating payment link:', error);
    alert('Payment link creation failed');
  }
};
