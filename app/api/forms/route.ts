import { NextResponse } from 'next/server';
import { addSessionWithRandomHash, FormData } from '../../lib/firebaseClient'; // Make sure the path to your firebase functions is correct
import stripe from '../../lib/stripe'

export async function POST(request: Request) {
    
    try {
        // Parse form data from the request
        const formData: FormData = await request.json();

        // Add session data to Firestore and get session ID hash
        const sessionIdHash = await addSessionWithRandomHash(formData);
        
        try {
            // Extracting the request body
            const success_url = `${process.env.BASE_URL}/schedule?sessionID=${sessionIdHash}`;
            const cancel_url = `${process.env.BASE_URL}/apply?sessionID=${sessionIdHash}`;
            const SCHEDULE_AMOUNT = 500
            // Create Stripe Checkout session
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: 'Schedule Viewing',
                    },
                    unit_amount: SCHEDULE_AMOUNT, // Amount in cents
                  },
                  quantity: 1,
                },
              ],
              mode: 'payment',
              success_url,
              cancel_url,
              // Add metadata here
              metadata: {
              },
            });
            // Return the session URL in the response
            return NextResponse.json({ url: session.url });
          } catch (error) {
            console.error('Error creating Stripe Checkout session:', error);
            return new NextResponse('Internal Server Error', { status: 500 });
          }

    } catch (error) {
        console.error('Error submitting form data:', error);
        return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
    }
}