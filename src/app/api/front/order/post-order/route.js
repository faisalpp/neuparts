import Order from '@/models/order';
import { NextResponse } from 'next/server';
import connect from '@/lib/db';


export async function POST(request) {

  try {
    await connect();

    const {orderId,intent,paymentStatus} = await request.json()
    
    const isUpdated = await Order.findByIdAndUpdate(orderId,
      {payment_intent: intent,payment_status: paymentStatus},
      { new: true });
    if(isUpdated){
      return NextResponse.json({success: true },{status:200});
    }
    return NextResponse.json({ message: 'Order update failed!', success: false },{status:500});
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error!', success: false });
  }
}