import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Post from '@/models/posts';
import ApplianceCategories from '@/models/applianceCategories';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') || 0;

    const page = searchParams.get('page') || 1;
    let skip = (page - 1) * limit;
    if(skip < 0){
      skip = 0
    }

    const postCategory = await ApplianceCategories.findOne({ slug: category });

    // Find related posts in the same category
    const query = {
      category: postCategory._id,
    };

    if (search != '') {
      query.$or = [{ title: search }, { content: search }];
    }
     console.log(skip)
    const count = await Post.countDocuments(query);

    const blogs = await Post.find(query).limit(limit).skip(skip);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ blogs: blogs, category: postCategory, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
