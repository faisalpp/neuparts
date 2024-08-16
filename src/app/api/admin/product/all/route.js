import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Category from '@/models/productcategory';
import ProductTyoe from '@/models/producttype';

export async function GET(request) {
  await connect();
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    const parttyoes = await ProductTyoe.find().sort({ createdAt: -1 });

    return NextResponse.json({ categories, parttyoes, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
