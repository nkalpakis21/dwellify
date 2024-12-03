
// // **** NOT USED RIGHT NOW
// import { NextRequest, NextResponse } from 'next/server';
// import stripe from '../../../lib/stripe'
// export async function POST(req: NextRequest) {
//   const success_url = `${process.env.BASE_URL}/schedule`;
//   const cancel_url = `${process.env.BASE_URL}/payment`;

//   try {
//     const SCHEDULE_AMOUNT = 500
//     // Create Stripe Checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Schedule Viewing',
//             },
//             unit_amount: SCHEDULE_AMOUNT, // Amount in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url,
//       cancel_url,
//       // Add metadata here
//       metadata: {
//       },
//     });
//     console.error(session);

//     // Return the session URL in the response
//     return NextResponse.json({ url: session.url });
//   } catch (error) {
//     console.error('Error creating Stripe Checkout session:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }
