import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';
import ProductCategory from '@/models/productcategory';
import mongoose from 'mongoose';

export async function POST(req) {
  await connect();

  const { model_no, part_number } = await req.json();
  console.log(model_no);

  let modelCategory = '';
  let product = '';
  let partTypes = [];

  if (model_no) {
    modelCategory = await ProductCategory.findOne({ model_no: model_no }).lean();
  }

  if (part_number) {
    product = await Product.findOne({ part_number: part_number, category: modelCategory ? modelCategory._id : { $exists: true } }).populate({
      path: 'category',
    });
  }
  if (!product) {
    product = await Product.findOne({ category: modelCategory ? modelCategory._id : { $exists: true } }).populate({
      path: 'category',
    });
  }

  if (modelCategory) {
    // Retrieve all part types under the found category
    partTypes = await Product.aggregate([
      {
        $match: {
          category: new mongoose.Types.ObjectId(modelCategory._id),
        },
      },
      {
        $lookup: {
          from: 'productTypes', // The collection name for product types
          localField: 'parttype',
          foreignField: '_id',
          as: 'parttype',
        },
      },
      {
        $unwind: '$parttype',
      },
      {
        $group: {
          _id: '$parttype._id',
          title: { $first: '$parttype.title' },
          slug: { $first: '$parttype.slug' },
          thumbnail: { $first: '$parttype.thumbnail' },
        },
      },
    ]);
  }

  return NextResponse.json({ success: true, product, partTypes, modelCategory });
}
