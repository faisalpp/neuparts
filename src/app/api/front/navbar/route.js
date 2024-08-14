import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Categories from '@/models/productcategory';

export async function GET(req) {
  await connect();
  try {
    const categories = await Categories.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: 'Error retrieving attributes' });
  }
}
