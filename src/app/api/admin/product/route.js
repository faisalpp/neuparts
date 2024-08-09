import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Product from '@/models/product';
import * as Yup from 'yup';
import { generateSlug } from '@/utils/index';
//

export async function POST(request) {
  await connect();

  try {
    const res = await request.json();
    console.log(res);

    let slug = generateSlug(res.title);
    const regex = new RegExp(`^${slug}-\\d+$`);

    const blogCount = await Product.countDocuments({ slug: regex });
    if (blogCount > 0) {
      let inc = parseInt(blogCount) + 1;
      slug = slug + `-${inc}`;
    }

    const exactMatch = await Product.countDocuments({ slug: slug });
    if (exactMatch) {
      slug = slug + `-1`;
    }

    const isCreated = await Product.create({ ...res, slug: slug });

    if (isCreated) {
      return NextResponse.json({ message: 'Product Created!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function GET(request) {
  await connect();
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * limit;

    let query = {};

    const ReviewCountPromise = Product.estimatedDocumentCount(query);
    const GetProductsPromise = Product.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);

    const [count, products] = await Promise.all([ReviewCountPromise, GetProductsPromise]);

    const pageCount = Math.ceil(count / limit);

    // const products = await Product.find({});
    return NextResponse.json({ products: products, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function DELETE(request) {
  await connect();
  try {
    const res = await request.json();
    const id = res.id;
    if (!id) {
      return NextResponse.json({ message: 'Product id required!', success: false });
    }

    const isDeleted = await Product.findByIdAndDelete(id);
    if (isDeleted) {
      return NextResponse.json({ message: 'Product Deleted!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function PUT(request) {
  await connect();
  try {
    const res = await request.json();
    const id = res._id;
    if (!id) {
      return NextResponse.json({ message: 'Product id required!', success: false });
    }

    const isUpdated = await Product.findByIdAndUpdate(id, res);
    if (isUpdated) {
      return NextResponse.json({ message: 'Product Updated!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}