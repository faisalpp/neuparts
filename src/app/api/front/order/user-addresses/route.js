import Address from '@/models/address'
import { NextResponse } from 'next/server';
import connect from '@/lib/db';


export async function POST(request) {

  try {
    await connect();

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    
    const shippingAddress = await Address.findOne({user:userId,type:'Shipping'}).sort({ createdAt: -1 })
    const billingAddress = await Address.findOne({user:userId,type:'Billing'}).sort({ createdAt: -1 })

    return NextResponse.json({ shippingAddress:shippingAddress,billingAddress:billingAddress, success: true },{status:200});

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error!', success: false });
  }
}