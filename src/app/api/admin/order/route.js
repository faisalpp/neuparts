import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Order from '@/models/order';


export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * limit;

    let query = {};

    const OrderCountPromise = Order.countDocuments(query);
    const GetOrdersPromise = Order.find(query).populate('shipping_address').sort({ createdAt: -1 }).limit(limit).skip(skip);

    const [count, orders] = await Promise.all([OrderCountPromise,GetOrdersPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ orders: orders, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}