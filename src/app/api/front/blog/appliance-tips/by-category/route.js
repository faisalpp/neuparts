import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Post from '@/models/posts';
import PostCategories from '@/models/postCategories';
import ApplianceCategories from '@/models/applianceCategories';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * parseInt(limit);

    const postCategory = await ApplianceCategories.findOne({ slug: category });

    // Find related posts in the same category
    const query = {
      category: postCategory._id,
    };

    if (search) {
      query.$or = [{ title: search }, { content: search }];
    }

    const count = await Post.countDocuments(query);

    const blogs = await Post.find(query)
      .limit(Number(limit) || 10)
      .skip(Number(skip) || 0);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ blogs: blogs, category: postCategory, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
