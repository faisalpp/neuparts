import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import StaticVideos from '@/models/static-videos';

export async function GET(request) {
  try {
    await connect();

    let query = {page:'product-page'};

    const videos = await StaticVideos.find(query)

    return NextResponse.json({ videos: videos, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message,success:false }, { status: 500 });
  }
}