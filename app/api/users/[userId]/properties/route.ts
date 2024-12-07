import { getApplicationsByProperty, getFeedbackByApplication, getPropertiesByUser } from "@/app/lib/firestoreClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    if (req.method !== 'GET') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const { userId } = await params;

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        // Fetch the user's properties
        const properties = await getPropertiesByUser(userId);

        // For each property, fetch its applications and feedback for those applications
        const feedbackByProperty = await Promise.all(properties.map(async (property) => {
            // Fetch applications for the property
            const applications = await getApplicationsByProperty(property.id);

            // Fetch feedback for each application, and map it directly to the property
            const feedback = await Promise.all(applications.map(async (application) => {
                return await getFeedbackByApplication(application.id);
            }));

            return {
                ...property,  // Include property ID to tie the feedback to a property
                feedback: feedback.flat(), // Flatten feedback if there are multiple per application
            };
        }));

        // Return only the properties with their feedback, without application info
        return NextResponse.json(feedbackByProperty);

    } catch (error) {
        console.error('Error getting properties:', error);
        return NextResponse.json({ error: 'Failed to get properties' }, { status: 500 });
    }
}
