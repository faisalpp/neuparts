import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Post from '@/models/posts';
import PostCategories from '@/models/postCategories';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');

    const postCategory = await PostCategories.findOne({ slug: category });
    const post = await Post.findOne({ slug: slug }).where('category').equals(postCategory._id);

    return NextResponse.json({ post: post, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
