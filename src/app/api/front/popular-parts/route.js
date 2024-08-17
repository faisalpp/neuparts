import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Product from '@/models/product';

export async function GET(req) {
  await connect();
  try {
    const count = await Product.countDocuments();
    const random = Math.floor(Math.random() * count);

    if (section === 'categories') {
      data = await Category.find().sort({ createdAt: -1 });
    } else if (section === 'parttyoes') {
      data = await ProductTyoe.find().sort({ createdAt: -1 });
    } else if (section === 'productsparts') {
      const count = await Product.countDocuments();
      const random = Math.floor(Math.random() * count);
      data = await Product.aggregate([{ $sample: { size: 6 } }]);
    }

    return NextResponse.json({ products: productsparts, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
