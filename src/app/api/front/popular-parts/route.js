import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Product from '@/models/product';

export async function GET() {
  await connect();
  try {
    const count = await Product.countDocuments();
    const random = Math.floor(Math.random() * count);

    const productsparts = await Product.find().skip(random).limit(6).sort({ createdAt: -1 });

    return NextResponse.json({ products: productsparts, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
