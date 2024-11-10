import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    const parentId = await Product.findOne({ slug: slug }).distinct('parent_id');

    const models = await Product.find({ id: parentId[0], is_variant: false }).distinct('model_no');

    return NextResponse.json({ success: true, models });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

