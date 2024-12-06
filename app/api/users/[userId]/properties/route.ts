import { getPropertiesByUser } from "@/app/lib/firestoreClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
  
    try {
        // Use the userId to fetch the user's properties
        const properties = await getPropertiesByUser(userId);
        return NextResponse.json(properties);
    } catch (error) {
        console.error('Error getting Properties:', error);
        return NextResponse.json({ error: 'Failed to get Properties' }, { status: 500 });
    }

  
}