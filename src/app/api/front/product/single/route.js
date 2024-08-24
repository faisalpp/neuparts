import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';

export async function GET(request) {
  await connect();
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    slug;

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
    }).populate({
      path: 'category',
      match: { slug: product.category.slug },
    });

    partproducts = partproducts.filter((product) => product.category !== null);

    const buyingOptions = await Product.find({
      part_number: product.part_number,
      _id: { $ne: product._id },
    });

    const partCount = await Product.countDocuments({
      part_number: product.part_number,
      _id: { $ne: product._id },
    });
    return NextResponse.json({ product: product, partproducts, buyingOptions, partCount, success: true });
  } catch (error) {
    error;

    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
