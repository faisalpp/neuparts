import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import ProductType from '@/models/producttype';


export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') || 12;

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * limit;

    const TypeCountPromise = ProductType.countDocuments();
    const GetTypesPromise = ProductType.find().limit(limit).skip(skip);

    const [count, types] = await Promise.all([TypeCountPromise,GetTypesPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ types: types, pagination: { pageCount, count:count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}