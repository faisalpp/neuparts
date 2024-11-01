import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Categories from '@/models/productcategory';
import Manufacturer from '@/models/productManufacturer';

export async function GET(req) {
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
    
    const manufacturers = await Manufacturer.aggregate([
      {
        $lookup: {
          from: 'products', // Name of the product collection
          localField: '_id',
          foreignField: 'manufacturer',
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
          productCount: { $size: '$products' }, // Optionally get the count of products
        },
      },
    ]);


    return NextResponse.json({ success: true, categories,manufacturers });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error retrieving attributes' });
  }


}
