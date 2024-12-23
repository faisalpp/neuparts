import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import ProductTyoe from '@/models/producttype';
import { generateSlug } from '@/utils/index';

export async function POST(request) {
  
  try {
    await connect();
    const res = await request.json();

    let slug = generateSlug(res.title);
    const regex = new RegExp(`^${slug}-\\d+$`);

    const blogCount = await ProductTyoe.countDocuments({ slug: regex });
    if (blogCount > 0) {
      let inc = parseInt(blogCount) + 1;
      slug = slug + `-${inc}`;
    }

    const exactMatch = await ProductTyoe.countDocuments({ slug: slug });
    if (exactMatch) {
      slug = slug + `-1`;
    }

    const isCreated = await ProductTyoe.create({ ...res, slug: slug });

    if (isCreated) {
      return NextResponse.json({ message: 'Part Type Created!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const By = searchParams.get('by');
    const search = searchParams.get('search');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * limit;

    let query = {};
    if(search != ''){
      query = {$or: [
        { title: { $regex: search, $options: 'i' } }
      ]}
    }

    const ReviewCountPromise = ProductTyoe.countDocuments(query);
    const GetSubCategoryPromise = ProductTyoe.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);

    const [count, producttypes] = await Promise.all([ReviewCountPromise, GetSubCategoryPromise]);

    const pageCount = Math.ceil(count / limit);

    // const products = await Product.find({});
    return NextResponse.json({ producttypes, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connect();
    const res = await request.json();
    const id = res.id;
    if (!id) {
      return NextResponse.json({ message: 'Part Type id required!', success: false });
    }

    const isDeleted = await ProductTyoe.findByIdAndDelete(id);
    if (isDeleted) {
      return NextResponse.json({ message: 'Part Type Deleted!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connect();
    const res = await request.json();
    const id = res._id;
    if (!id) {
      return NextResponse.json({ message: 'Part Type id required!', success: false });
    }

    const isUpdated = await ProductTyoe.findByIdAndUpdate(id, res);
    if (isUpdated) {
      return NextResponse.json({ message: 'Category Updated!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
