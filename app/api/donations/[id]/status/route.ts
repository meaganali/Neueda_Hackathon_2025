import { NextRequest, NextResponse } from 'next/server';
import { astraService } from '@/lib/astradb';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Donation ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { status, transactionHash } = body;
    
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    // Update donation status in AstraDB
    const result = await astraService.updateDonationStatus(id, status, transactionHash);
    
    if (!result) {
      return NextResponse.json({ error: "Failed to update donation status" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error updating donation status:", error);
    return NextResponse.json(
      { error: "Failed to update donation status" }, 
      { status: 500 }
    );
  }
} 