import { getApplicationsByProperty } from "@/app/lib/firestoreClient";
import userService from "@/app/services/user/UserService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ refType: string, refId: string }> }) {
    const { refType, refId } = await params;

    if (!refType || !refId) {
        return NextResponse.json({ error: 'refType and refId are required' }, { status: 400 });
    }

    try {
        let data;
        switch (refType) {
            case 'user':
                data = await userService.getApplicationsByUser(refId);
                return NextResponse.json(data); // Return response immediately for 'user'
            
            case 'property':
                data = await getApplicationsByProperty(refId);
                return NextResponse.json(data); // Return response immediately for 'property'

            default:
                return NextResponse.json({ error: 'Invalid refType' }, { status: 400 }); // Handle invalid refType
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to get properties and applications' }, { status: 500 });
    }
}
