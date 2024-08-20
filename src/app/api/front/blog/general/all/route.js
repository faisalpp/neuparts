import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Post from '@/models/posts';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * parseInt(limit);

    let query = { postType: 'blog' };

    const PostCountPromise = Post.countDocuments(query);
    const GetPostsPromise = Post.find(query).skip(skip).limit(limit);

    const [count, blogs] = await Promise.all([PostCountPromise, GetPostsPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ blogs: blogs, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
