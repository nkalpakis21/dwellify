import { addFeedback } from "@/app/lib/firestoreClient";
import { IFeedbackFormRequest } from "@/app/types/application";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Parse form data from the request
        const feedbackFormData: IFeedbackFormRequest = await request.json();

        // Add property data to Firestore
        await addFeedback(feedbackFormData);
    } catch (error) {
        console.error('Error submitting form data:', error);
        return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
    }
    return NextResponse.json({}, { status: 200 });
}