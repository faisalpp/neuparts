import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Post from '@/models/posts';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    let query = { postType: 'blog-appliance-tips', slug: slug };
    const aggregationPipeline = [
      { $match: query }, // Match documents based on the query conditions
      {
        $addFields: {
          categoryId: { $toObjectId: '$category' }, // Convert string to ObjectId
        },
      },
      {
        $lookup: {
          from: 'postCategories', // name of the collection to join
          localField: 'categoryId', // field in the Posts collection (after conversion)
          foreignField: '_id', // field in the faqCategories collection
          as: 'joinedCategory', // name for the field where the joined data will be stored
        },
      },
      { $unwind: '$joinedCategory' }, // Unwind to destructure the array to object
    ];

    const blog = await Post.aggregate(aggregationPipeline);

    if (blog) {
      return NextResponse.json({ blog: blog, success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
