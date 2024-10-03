import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import ModelNo from '@/models/modelno';

export async function POST(request) {
  
  try {
    await connect();
    const res = await request.json();

    const isCreated = await ModelNo.create(res);

    if (isCreated) {
      return NextResponse.json({ message: 'Model # Created!', success: true });
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

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * limit;

    let query = {};

    const ReviewCountPromise = ModelNo.estimatedDocumentCount(query);
    const GetSubCategoryPromise = ModelNo.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);

    const [count, producttypes] = await Promise.all([ReviewCountPromise, GetSubCategoryPromise]);

    const pageCount = Math.ceil(count / limit);

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
      return NextResponse.json({ message: 'Model # id required!', success: false });
    }

    const isDeleted = await ModelNo.findByIdAndDelete(id);
    if (isDeleted) {
      return NextResponse.json({ message: 'Model # Deleted!', success: true });
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
      return NextResponse.json({ message: 'Model # id required!', success: false });
    }

    const isUpdated = await ModelNo.findByIdAndUpdate(id, res);
    if (isUpdated) {
      return NextResponse.json({ message: 'Model # Updated!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
