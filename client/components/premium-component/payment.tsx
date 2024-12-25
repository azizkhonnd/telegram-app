import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';

const PaymentForm = () => {
  const [paymentId, setPaymentId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const { data: session } = useSession();

  const handlePayment = async () => {
    try {
      const response = await axios.post('/api/create-payment-link');
      
      if (response.data?.url) {
        window.location.href = response.data.url; 
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus('Failed to create payment link');
      toast({ description: 'Failed to create payment link', variant: 'destructive' });
    }
  };

  return (
    <div>
      <h2 className="mt-2 text-center">Telegram Premium</h2>

      <Input
        className="mt-2"
        type="text"
        placeholder="Payment ID"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
      />

      <Input
        className="mt-2 mb-2"
        type="text"
        placeholder="User ID"
        value={session?.currentUser?._id}
        disabled
      />

      <Button className="w-full" onClick={handlePayment}>
        Buy Telegram Premium
      </Button>

      {paymentStatus && <p>Status: {paymentStatus}</p>}
    </div>
  );
};

export default PaymentForm;
