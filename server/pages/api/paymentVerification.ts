import type { NextApiRequest, NextApiResponse } from 'next';
import { updateUserStatus } from '../../lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { paymentStatus, paymentId, userId } = req.body;

  if (paymentStatus === 'success') {
    try {
      await updateUserStatus(userId, 'premium');
      res.status(200).json({ message: 'Payment verified successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user status' });
    }
  } else {
    res.status(400).json({ error: 'Payment failed' });
  }
}