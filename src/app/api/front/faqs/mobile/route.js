import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import PostCategories from '@/models/postCategories';

export async function GET(request) {
  await connect();
  try {
    const result = await PostCategories.aggregate([
      {
        // Match categories with postType 'general-faqs'
        $match: {
          postType: 'general-faqs',
        },
      },
      {
        // Lookup posts that match the ObjectId version of the category field
        $lookup: {
          from: 'posts', // The collection name in the database
          let: { categoryId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$category', { $toString: '$$categoryId' }],
                },
              },
            },
          ],
          as: 'posts',
        },
      },
    ]);

    return NextResponse.json({ faqs: result, success: true });
  } catch (err) {
    console.error('Error retrieving FAQ data:', err);
  }
}
