import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Categories from '@/models/productcategory';
import ProductTypes from '@/models/producttype';
import ProductConditions from '@/models/condition';
import Product from '@/models/product';

export async function GET(req) {
  await connect();
  const searchParams = req.nextUrl.searchParams;
  try {
    // const { model_no, part_number } = searchParams.get('model_no');
    const model_no = searchParams.get('model_no');

    let categories = [];
    let category = null;

    if (model_no != 'all') {
      category = await Categories.findOne({ model_no: model_no });
    } else {
      categories = await Categories.aggregate([
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
    }

    const parttypes = await ProductTypes.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'parttype',
          as: 'products',
        },
      },
      // Step 3: Conditional filtering based on the presence of model_no and the related category
      {
        $match: category ? { 'products.category': category._id } : {},
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
        $match: category ? { 'products.category': category._id } : {},
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
