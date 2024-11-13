import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import ApplianceCategories from '@/models/applianceCategories';

export async function GET(request) {
  try {
    await connect();

    const cats = await ApplianceCategories.aggregate([
      {
        $addFields: {
          _idStr: { $toString: '$_id' }, // convert ObjectId to string
        },
      },
      {
        $lookup: {
          from: 'posts', // collection with posts
          localField: '_idStr', // converted string field
          foreignField: 'category', // field in posts
          as: 'posts',
        },
      },
      {
        $addFields: {
          postCount: { $size: '$posts' }, // count the number of posts in each category
        },
      },
      {
        $project: {
          posts: 0, // exclude the posts array if only count is needed
          _idStr: 0, // remove the temporary string field
        },
      },
      {
        $sort: { index: 1 }, // sort by index field
      },
    ]);
    

    return NextResponse.json({ cats, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
