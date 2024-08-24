import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Category from '@/models/productcategory';
import ProductTyoe from '@/models/producttype';
import SubCategory from '@/models/subcategory';

export async function GET(request) {
  await connect();
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    const parttypes = await ProductTyoe.find().sort({ createdAt: -1 });
    const subcategories = await SubCategory.find().sort({ createdAt: -1 });

    return NextResponse.json({ categories, parttypes, subcategories, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
