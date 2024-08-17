import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import HelpsCategories from '@/models/helpsCategories';

export async function GET() {
  try {
    await connect();

    const cats = await HelpsCategories.aggregate([
      {
        $addFields: {
          categoryIdString: { $toString: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'posts', // Name of the posts collection
          localField: 'categoryIdString', // Field from HelpsCategories (as string)
          foreignField: 'category', // Field from Posts (as string)
          as: 'posts', // Output array field
        },
      },
      {
        $addFields: {
          postCount: { $size: '$posts' },
        },
      },
      // Project to include only necessary fields
      {
        $project: {
          _id: 1,
          title: 1,
          slug: 1,
          postCount: 1,
          thumbnail: 1,
        },
      },
      { $sort: { index: 1 } },
    ]);

    return NextResponse.json({ cats: cats, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
