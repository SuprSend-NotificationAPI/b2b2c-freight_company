// app/api/track/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/dbConnect';
import Shipment from '@/models/Shipment';

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const trackingId = searchParams.get('trackingId');

  if (!trackingId) {
    return NextResponse.json({ error: 'Invalid tracking ID' }, { status: 400 });
  }

  try {
    const shipment = await Shipment.findOne({ trackingId });
    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }
    return NextResponse.json(shipment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
