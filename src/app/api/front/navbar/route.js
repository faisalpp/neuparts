import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Categories from '@/models/productcategory';

export async function GET(req) {
  await connect();
  try {
    const categories = await Categories.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    error;
    return NextResponse.json({ success: false, message: 'Error retrieving attributes' });
  }
}
