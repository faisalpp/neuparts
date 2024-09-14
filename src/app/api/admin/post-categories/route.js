import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import PostCategories from '@/models/postCategories';

export async function GET(request) {
  try {
  await connect();
  const searchParams = request.nextUrl.searchParams;
  const postType = searchParams.get('postType');
  if (!postType) {
    return NextResponse.json({ cats: [], success: false });
  }

    const cats = await PostCategories.find({ postType: postType });

    return NextResponse.json({ cats: cats, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
