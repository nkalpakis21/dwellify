import { getAllFeedback } from "@/app/lib/firestoreClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ formId: string }> }) {
    const { formId } = await params;

    if(!formId){
        return NextResponse.json({ error: 'Form ID is required' }, { status: 400 });
    }

    try{
        const application = await getAllFeedback();
        return NextResponse.json({application});
    } catch(error) {
        console.error('Error getting Feedback:', error);
        return NextResponse.json({ error: 'Failed to get Feedback' }, { status: 500 });
    }
}