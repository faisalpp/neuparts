import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Categories from '@/models/productcategory';
import ProductTypes from '@/models/producttype';

export async function GET(req) {
  await connect();
  try {
    const categories = await Categories.aggregate([
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
        $project: {
          products: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    const parttypes = await ProductTypes.aggregate([
      {
        $lookup: {
          from: 'products', // the name of the products collection
          localField: 'slug',
          foreignField: 'type',
          as: 'products',
        },
      },
      {
        $addFields: {
          productCount: { $size: '$products' }, // count the number of products in each product type
        },
      },
      {
        $project: {
          products: 0, // optionally exclude the product array if you only want the count
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    const conditions = [
      {
        title: 'New',
        slug: 'new',
      },
      {
        title: 'New / Open Box',
        slug: 'new-open-box',
      },
      {
        title: 'Certified Refurbished',
        slug: 'certified-refurbished',
      },
      {
        title: 'Used • Grade A',
        slug: 'used-grade-a',
      },
      {
        title: 'Used • Grade B',
        slug: 'used-grade-b',
      },
      {
        title: 'Used • Grade C',
        slug: 'used-grade-c',
      },
    ];
    return NextResponse.json({ success: true, categories: categories, parttypes: parttypes, conditions: conditions });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: 'Error retrieving attributes' });
  }
}
