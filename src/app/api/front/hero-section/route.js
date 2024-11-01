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
          from: 'products',
          localField: '_id',
          foreignField: 'category',
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
