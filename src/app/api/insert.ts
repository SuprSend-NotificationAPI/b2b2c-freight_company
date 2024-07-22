import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/dbConnect';
import Shipment from '@/models/Shipment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { id, description } = req.body;
      
      if (!id || !description) {
        return res.status(400).json({ error: 'ID and description are required' });
      }

      const newShipment = new Shipment({ id, description });
      await newShipment.save();
      res.status(201).json(newShipment);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
