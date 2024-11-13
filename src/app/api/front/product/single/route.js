import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    const product = await Product.findOne({ slug: slug }).populate('category').populate('parttype');
    if (!product) {
      return NextResponse.json({ success: false });
    }
    // const partproducts = await Product.find({
    //   part_number: product.part_number,
    //   _id: { $ne: product._id },
    // }).populate('category');
    let partproducts = await Product.find({
      _id: { $ne: product._id },
      is_variant: true,
    }).limit(20).populate({
      path: 'category',
      match: { slug: product.category.slug },
    });

    const buyingOptions = await Product.find({
      parent_id: product.parent_id,
      is_variant: true,
      _id: { $ne: product._id },
    });

    const partCount = await Product.countDocuments({
      parent_id: product.parent_id,
      is_variant: true,
    });
    return NextResponse.json({ product: product, partproducts, buyingOptions, partCount, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
