// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request: Request) {
  await connectToDatabase(); // Ensure you are connecting to the database

  try {
    const { companyName, endUserName, companyEmail, endUserEmail } = await request.json();

    // Basic validation
    if (!companyName || !endUserName || !companyEmail || !endUserEmail) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Create a new user instance
    const newUser = new User({
      companyName,
      endUserName,
      companyEmail,
      endUserEmail,
    });

    // Save user data to the database
    await newUser.save();

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
