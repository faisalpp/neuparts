import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Post from '@/models/posts';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    let query = { postType: 'blog', slug: slug };

    const blog = await Post.findOne(query);

    if (blog) {
      return NextResponse.json({ blog: blog, success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
