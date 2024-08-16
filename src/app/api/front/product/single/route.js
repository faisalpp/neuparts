import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Product from '@/models/product';
import ProductCategory from '@/models/productcategory';

export async function GET(request) {
  await connect();
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    console.log(slug);

    const product = await Product.findOne({ slug: slug }).populate('category');
    if(!product){
      return NextResponse.json({ success: false });
    }
    return NextResponse.json({ product: product, success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
