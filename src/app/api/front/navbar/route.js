import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Categories from '@/models/productcategory';

export async function GET(req) {
  // try {
  
  //   const categories = await Categories.find({isvisible:1}).sort({ createdAt: -1 });
  //   return NextResponse.json({ success: true, categories });
  // } catch (error) {
  //   return NextResponse.json({ success: false, message: 'Error retrieving attributes' });
  // }


  try {
    await connect();
    const categories = await Categories.aggregate([
      {
        $lookup: {
          from: 'products', // Name of the product collection
          localField: '_id',
          foreignField: 'category',
          as: 'products',
        },
      },
      {
        $match: {
          products: { $ne: [] }, // Only include categories with at least one product
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          slug: 1,
          description: 1,
          thumbnail: 1,
          isvisible: 1,
          productCount: { $size: '$products' }, // Optionally get the count of products
        },
      },
    ]);
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error retrieving attributes' });
  }


}
