import { getApplicationsByProperty } from "@/app/lib/firestoreClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ propertyId: string }> }) {
    
    const { propertyId } = await params;

    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
    }
  
    try {
        // Use the userId to fetch the user's properties
        const properties = await getApplicationsByProperty(propertyId);
        return NextResponse.json(properties);
    } catch (error) {
        console.error('Error getting Properties:', error);
        return NextResponse.json({ error: 'Failed to get Properties' }, { status: 500 });
    }

  
}