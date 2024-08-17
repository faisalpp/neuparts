import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Product from '@/models/product';

export async function GET(request) {
  await connect();
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    slug;

    const product = await Product.findOne({ slug: slug }).populate('category');
    const partproducts = await Product.find({ model_no: product.model_no }).populate('category');
    if (!product) {
      return NextResponse.json({ success: false });
    }
    return NextResponse.json({ product: product, partproducts, success: true });
  } catch (error) {
    error;

    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
