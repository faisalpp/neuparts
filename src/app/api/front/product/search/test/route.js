import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';
import ProductCategory from '@/models/productcategory';
import mongoose from 'mongoose';
import ProductManufacturer from '@/models/productManufacturer';

export async function POST(req) {
  await connect();

  const { model_no, part_number, manufacturer, selectedCategory } = await req.json();

  let modelCategory = null;
  let product = null;
  let partTypes = [];
  let getCategory = null;

  // Fetch category and manufacturer if provided
  const category = selectedCategory ? await ProductCategory.findOne({ slug: selectedCategory }) : null;
  const s_manufacturer = manufacturer ? await ProductManufacturer.findOne({ slug: manufacturer }) : null;

  // Condition handling for combinations of manufacturer and category
  if (s_manufacturer && category) {
    // Case: Both manufacturer and category are provided
    product = await Product.findOne({
      is_variant: true,
      manufacturer: s_manufacturer._id,
      category: category._id,
    })
      .populate('category')
      .populate('manufacturer');
  } else if (s_manufacturer) {
    // Case: Only manufacturer is provided
    product = await Product.findOne({
      is_variant: true,
      manufacturer: s_manufacturer._id,
    })
      .populate('category')
      .populate('manufacturer');
  } else if (category) {
    // Case: Only category is provided
    product = await Product.findOne({
      is_variant: true,
      category: category._id,
    }).populate('category');
  }

  // model_no and part_number search if no product was found with manufacturer and category
  if (!product && (model_no || part_number)) {
    if (model_no) {
      getCategory = await Product.findOne({ is_variant: false, model_no }).populate('category');
      modelCategory = getCategory?.category || null;
    }

    if (part_number) {
      product = await Product.findOne({
        part_number,
        category: modelCategory ? modelCategory._id : { $exists: true },
      }).populate('category');
    }

    if (!product && modelCategory) {
      // Find any product within the modelCategory if part_number search fails
      product = await Product.findOne({
        category: modelCategory._id,
      }).populate('category');
    }
  }

  if (s_manufacturer) {
    getCategory = await Product.findOne({ is_variant: false, id: product.parent_id }).populate('category');
    modelCategory = getCategory?.category || null;
  }

  // If a category is found, retrieve all part types under that category
  if (modelCategory) {
    partTypes = await Product.aggregate([
      {
        $match: {
          category: new mongoose.Types.ObjectId(modelCategory._id),
        },
      },
      {
        $lookup: {
          from: 'productTypes', // Collection name for product types
          localField: 'parttype',
          foreignField: '_id',
          as: 'parttype',
        },
      },
      { $unwind: '$parttype' },
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

  // Return the first found card with model_no and part_no if available
  const firstCard = getCategory ? { model_no: getCategory.model_no[0], part_no: getCategory.part_number } : null;

  return NextResponse.json({
    success: true,
    product,
    partTypes,
    modelCategory,
    firstCard, // Include first card info for display
  });
}
