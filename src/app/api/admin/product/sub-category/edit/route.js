import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import SubCategory from '@/models/subcategory';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const subcategory = await SubCategory.findById(id);
    return NextResponse.json(subcategory);
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
