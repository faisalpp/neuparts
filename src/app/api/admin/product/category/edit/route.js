import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Category from '@/models/productcategory';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const category = await Category.findById(id);
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
