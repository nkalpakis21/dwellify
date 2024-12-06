import { IPropertyFormRequest } from '@/app/types/property';
import { NextResponse } from 'next/server';
import { addProperty } from '../../lib/firestoreClient'; // Make sure the path to your firebase functions is correct

export async function POST(request: Request) {
    try {
        // Parse form data from the request
        const propertyData: IPropertyFormRequest = await request.json();

        // Add property data to Firestore
        await addProperty(propertyData);
    } catch (error) {
        console.error('Error submitting form data:', error);
        return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
    }
    return NextResponse.json({}, { status: 200 });
}