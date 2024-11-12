import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Review from '@/models/reviews';
import * as Yup from 'yup';

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
        { review: { $regex: search, $options: 'i' } }
      ]}
    }

    const ReviewCountPromise = Review.countDocuments(query);
    const GetReviewsPromise = Review.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);

    const [count, reviews] = await Promise.all([ReviewCountPromise, GetReviewsPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ reviews: reviews, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connect();

  const ValReview = Yup.object({
    name: Yup.string().required('Name is required!'),
    review: Yup.string().required('Review is required!'),
    rating: Yup.string().required('Rating is required!'),
    pages: Yup.array().of(Yup.string().required('Page is required!')).min(1, 'At least one page is required!'),
  });

  try {
    const { name, review, rating, pages } = await request.json();
    await ValReview.validate({ name, review, rating, pages }, { abortEarly: false });

    const isCreated = await Review.create({
      name,
      review,
      rating,
      pages,
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Review Created!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function PUT(request) {
  await connect();

  const ValReview = Yup.object({
    id: Yup.string().required('Review id is required!'),
    name: Yup.string().required('Name is required!'),
    review: Yup.string().required('Review is required!'),
    rating: Yup.string().required('Rating is required!'),
    pages: Yup.array().of(Yup.string().required('Page is required!')).min(1, 'At least one page is required!'),
  });

  try {
    const { id, name, review, rating, pages } = await request.json();
    await ValReview.validate({ id, name, review, rating, pages }, { abortEarly: false });

    const isUpdated = await Review.findByIdAndUpdate(id, {
      name,
      review,
      rating,
      pages,
    });

    if (isUpdated) {
      return NextResponse.json({ message: 'Review Updated!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (id === '') {
      return NextResponse.json({ message: 'Review ID required!', success: false });
    }

    await connect();

    await Review.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Review Deleted!', success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  }
}
