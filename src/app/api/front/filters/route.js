import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Categories from '@/models/productcategory';
import ProductTypes from '@/models/producttype';
import ProductConditions from '@/models/condition';
import Product from '@/models/product';

export async function GET() {
  try {
    await connect();

    let categories = [];
    let category = null;

      categories = await Categories.aggregate([
        {
          $lookup: {
            from: 'products',
            let: { categoryId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { 
                    $and: [
                      { $eq: ['$category', '$$categoryId'] },
                      { $eq: ['$is_variant', true] }
                    ]
                  }
                }
              }
            ],
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
          from: 'products',
          let: { productTypeId: '$_id' },
          pipeline: [
            { $match: { $expr: { $and: [ { $eq: ['$parttype', '$$productTypeId'] }, { $eq: ['$is_variant', true] } ] } } },
            ...(category ? [{ $match: { category: category._id } }] : []),
          ],
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

    const isSale = await Product.countDocuments({ is_variant:true,is_sale: true });

    return NextResponse.json({ success: true, categories: categories, parttypes: parttypes, conditions: conditions, isSale: isSale });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error retrieving attributes',error });
  }
}
