import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Category from '@/models/productcategory';
import Manufacturer from '@/models/productManufacturer';

export async function GET() {
  try {
    await connect();
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'products', // Name of the product collection
          localField: '_id',
          foreignField: 'category',
          as: 'products',
          pipeline: [
            { $limit: 5 }, // Limit the number of products fetched per category
            { $project: { _id: 1 } }, // Only include _id or any minimal fields needed
          ],
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
        },
      }
    ]);
    


    const manufacturers = await Manufacturer.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'manufacturer',
          as: 'products',
        },
      },
      {
        $addFields: {
          productCount: { $size: '$products' },
        },
      },
      {
        $match: {
          productCount: { $gt: 0 },  // Only include categories with at least one product
        },
      },
      {
        $project: {
          products: 0,  // Exclude the products array
        },
      },
      {
        $sort: { createdAt: -1 },  // Sort by createdAt field
      },
    ]);

    return NextResponse.json({ categories,manufacturers, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
