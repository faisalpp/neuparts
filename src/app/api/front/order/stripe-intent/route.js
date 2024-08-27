import Stripe from 'stripe'
import { NextResponse } from 'next/server';

export async function POST(request) {
    
 try{
  const stripe = Stripe(process.env.NEXT_STRIPE_PRIVATE_KEY);
  const {price,currency,mode,description} = await request.json()
  
  const paymentIntent = await stripe.paymentIntents.create({
         amount: price,
         currency: currency,
         payment_method_types: mode,
         description: description,
  });

  return NextResponse.json({ intent: paymentIntent, success: true },{status:200});
        
 }catch(error){
    return NextResponse.json({ message: 'Internal Server Error!', success: false });
 }   
}




