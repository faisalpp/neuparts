import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';

export async function GET(request) {
  

  try {
    await connect();
    const products = await Product.countDocuments();

      return NextResponse.json({ data:products ,success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}
