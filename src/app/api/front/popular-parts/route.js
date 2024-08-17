import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Product from '@/models/product';

export async function GET(req) {
  await connect();
  try {
    const productsparts = await Product.aggregate([{ $sample: { size: 6 } }]);

    return NextResponse.json({ products: productsparts, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
