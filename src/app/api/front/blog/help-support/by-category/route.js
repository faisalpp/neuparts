import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Post from '@/models/posts';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * parseInt(limit);

    let query = { category: category };
    if (search != '') {
      query.$or = [
        { title: { $regex: search, $options: 'i' } }, // case-insensitive search on title
        { content: { $regex: search, $options: 'i' } }, // case-insensitive search on content
      ];
    }

    const aggregationPipeline = [
      { $match: query }, // Match documents based on the query conditions
      {
        $addFields: {
          categoryId: { $toObjectId: '$category' }, // Convert string to ObjectId
        },
      },
      {
        $lookup: {
          from: 'helpscategories', // name of the collection to join
          localField: 'categoryId', // field in the Posts collection (after conversion)
          foreignField: '_id', // field in the faqCategories collection
          as: 'joinedCategory', // name for the field where the joined data will be stored
        },
      },
      { $unwind: '$joinedCategory' }, // Unwind to destructure the array to object
      { $sort: { index: 1 } }, // sorting by createdAt descending
      { $skip: parseInt(skip) }, // skip number of results
      { $limit: parseInt(limit) }, // limit number of results
    ];

    const PostCountPromise = Post.countDocuments(query);
    const GetPostsPromise = Post.aggregate(aggregationPipeline);

    const [count, blogs] = await Promise.all([PostCountPromise, GetPostsPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ blogs: blogs, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
