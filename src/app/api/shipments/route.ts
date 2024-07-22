// src/app/api/shipments/route.ts

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/dbConnect';
import Shipment from '@/models/Shipment';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const { company, destination, weight } = await request.json();

    if (!company || !destination || !weight) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const trackingId = uuidv4(); // Generate a UUID

    // Generate random tracking details
    const trackingDetails = generateRandomTrackingDetails(destination);

    // Create a new shipment with the trackingId and trackingDetails
    const newShipment = new Shipment({ trackingId, company, destination, weight, trackingDetails });
    await newShipment.save();

    // Return the newly created shipment excluding _id and __v
    const { _id, __v, ...shipmentWithoutId } = newShipment.toObject();
    return NextResponse.json(shipmentWithoutId, { status: 201 });
  } catch (error) {
    console.error('Error adding shipment:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Function to generate random tracking details
function generateRandomTrackingDetails(finalDestination: string) {
  const locations = ['New York', 'Chicago', 'Los Angeles', 'Dallas', 'Atlanta'];
  const trackingDetails = [];

  for (let i = 0; i < 3; i++) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - i); // Set random past dates

    trackingDetails.push({
      location,
      timestamp,
    });
  }

  // Add final destination as the last entry
  trackingDetails.push({
    location: finalDestination,
    timestamp: new Date(),
  });

  return trackingDetails;
}
