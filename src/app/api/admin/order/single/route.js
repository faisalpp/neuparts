import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Order from '@/models/order';
import User from '@/models/user';

export async function GET(request) {
//   try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    const order = await Order.findOne({_id:id}).populate('shipping_address').populate('billing_address');
    const user = await User.findOne({_id:order.user})

    return NextResponse.json({ order: order,user:user, success: true });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
}