import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Coupon from '@/models/coupon';


export async function POST(request) {
  try {
    await connect();

    const {code} = await request.json()
    const coupon = await Coupon.findOne({code:code});
    
    if(coupon){
      return NextResponse.json({ coupon: coupon, success: true });
    }

    return NextResponse.json({ message: 'Invalid coupon code!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}