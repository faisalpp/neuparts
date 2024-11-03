import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';

export async function GET(req) {
  try {
    await connect();
    const productsparts = await Product.find({is_variant:true}).limit(6)
    // aggregate([{ $sample: { size: 6 } }]);

    return NextResponse.json({ products: productsparts, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
