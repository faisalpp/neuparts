import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Category from '@/models/productcategory';
import ProductTyoe from '@/models/producttype';
import Product from '@/models/product';

export async function GET() {
  await connect();
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    const parttyoes = await ProductTyoe.find().sort({ createdAt: -1 });

    const count = await Product.countDocuments();
    const random = Math.floor(Math.random() * count);

    const productsparts = await Product.find().skip(random).limit(6).sort({ createdAt: -1 });

    return NextResponse.json({ categories: categories, parttyoes: parttyoes, productsparts: productsparts, success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
