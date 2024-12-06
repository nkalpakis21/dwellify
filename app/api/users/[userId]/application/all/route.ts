import { getApplicationsByProperty, getPropertiesByUser } from "@/app/lib/firestoreClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
  
    try {
        const properties = await getPropertiesByUser(userId);

        // Fetch applications for each property
        const propertiesWithApplications = await Promise.all(properties.map(async (property) => {
            const applications = await getApplicationsByProperty(property.id);
            return {
                ...property,
                applications
            };
        }));

        // Aggregate all applications
        const allApplications = propertiesWithApplications.flatMap(property => property.applications);

        return NextResponse.json({
            properties: propertiesWithApplications,
            applications: allApplications
        });
    } catch (error) {
        console.error('Error getting Properties:', error);
        return NextResponse.json({ error: 'Failed to get Properties' }, { status: 500 });
    }

  
}