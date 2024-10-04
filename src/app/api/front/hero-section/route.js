import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Category from '@/models/productcategory';
import Menufacturer from '@/models/productMenufacturer';

export async function GET() {
  // try {
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

    const menufacturers = await Menufacturer.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'menufacturer',
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

    return NextResponse.json({ categories,menufacturers, success: true });
  // } catch (error) {
  //   return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  // }
}
