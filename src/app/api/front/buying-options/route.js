import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    const product = await Product.findOne({ slug: slug });
    const partproducts = await Product.find({ part_number: product.part_number, _id: { $ne: product._id } }).sort({ createdAt: -1 });

    return NextResponse.json({ product, partproducts, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
