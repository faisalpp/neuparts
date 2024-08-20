import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Categories from '@/models/productcategory';
import ProductTypes from '@/models/producttype';
import ProductConditions from '@/models/condition';
import Product from '@/models/product';

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
          localField: '_id',
          foreignField: 'parttype',
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
    const conditions = await ProductConditions.aggregate([
      {
        $lookup: {
          from: 'products', // the name of the products collection
          localField: 'slug',
          foreignField: 'condition',
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

    const isSale = await Product.countDocuments({ is_sale: true });

    return NextResponse.json({ success: true, categories: categories, parttypes: parttypes, conditions: conditions, isSale: isSale });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error retrieving attributes' });
  }
}
