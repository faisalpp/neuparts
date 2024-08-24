import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import StaticVideos from '@/models/static-videos';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || '';

    let query = {page:type};

    const video = await StaticVideos.findOne(query)

    return NextResponse.json({ video: video, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message,success:false }, { status: 500 });
  }
}