// src/models/Shipment.ts

import mongoose, { Schema, Document } from 'mongoose';

interface Shipment extends Document {
  trackingId: string;
  company: string;
  destination: string;
  weight: number;
  status: string;
  trackingDetails: {
    location: string;
    timestamp: Date;
  }[];
}

const ShipmentSchema: Schema = new Schema({
  trackingId: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  destination: { type: String, required: true },
  weight: { type: Number, required: true },
  status: { type: String, default: 'In Transit' },
  trackingDetails: [
    {
      location: { type: String, required: true },
      timestamp: { type: Date, required: true },
    },
  ],
});

export default mongoose.models.Shipment || mongoose.model<Shipment>('Shipment', ShipmentSchema);
