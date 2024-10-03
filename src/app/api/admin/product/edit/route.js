import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const product = await Product.findById(id);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
