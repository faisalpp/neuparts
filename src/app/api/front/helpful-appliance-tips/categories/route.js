import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import ApplianceCategories from '@/models/applianceCategories';

export async function GET(request) {
  try {
    await connect();

    const cats = await ApplianceCategories.aggregate([
      {
        $lookup: {
          from: 'posts', // the name of the products collection
          localField: '_id',
          foreignField: '_id',
          as: 'posts',
        },
      },
      {
        $addFields: {
          postCount: { $size: '$posts' }, // count the number of products in each product type
        },
      },
      {
        $project: {
          products: 0, // optionally exclude the product array if you only want the count
        },
      },
      {
        $sort: { index: 1 },
      },
    ]);

    return NextResponse.json({ cats, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
