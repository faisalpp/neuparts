import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import ModelNo from '@/models/modelno';

export async function GET(request) {
    try {
      await connect();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const producttyoe = await ModelNo.findById(id);
    return NextResponse.json(producttyoe);
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
