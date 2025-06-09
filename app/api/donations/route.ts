import { NextRequest, NextResponse } from 'next/server';
import { astraService } from '@/lib/astradb';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const donationData = await request.json();
    
    // Generate donation ID and add timestamp
    const donationId = uuidv4();
    const now = new Date();
    
    const donation = {
      id: donationId,
      ...donationData,
      timestamp: now,
      createdAt: now.toISOString(),
      status: "pending"
    };

    // Use the astraService to create the donation
    const result = await astraService.createDonation(donationData);
    
    if (!result) {
      return NextResponse.json(
        { error: "Failed to create donation" }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json({ id: donationId });
  } catch (error) {
    console.error("API Error creating donation:", error);
    return NextResponse.json(
      { error: "Failed to process donation" }, 
      { status: 500 }
    );
  }
} 