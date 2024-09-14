import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Order from '@/models/order';


export async function GET(request) {
    try {
  
      await connect();
      const searchParams = request.nextUrl.searchParams;
      const userId = searchParams.get('userId');
      
      const orders = await Order.find({ user:userId });
  
      return NextResponse.json({ orders:orders ,success: true }, { status: 200 });
      
    }catch(error){
      return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
    }
  }