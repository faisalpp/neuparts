import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import StaticVideos from '@/models/static-videos';
import * as Yup from 'yup';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * limit;

    let query = {};

    const ReviewCountPromise = StaticVideos.estimatedDocumentCount(query);
    const GetReviewsPromise = StaticVideos.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);

    const [count, videos] = await Promise.all([ReviewCountPromise, GetReviewsPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ videos: videos, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connect();

  const ValReview = Yup.object({
    url: Yup.string().required('Url is required!'),
    pages: Yup.array().of(Yup.string().required('Page is required!')).min(1, 'At least one page is required!'),
  });

  try {
    const { url, pages } = await request.json();
    await ValReview.validate({ url, pages }, { abortEarly: false });

    const isCreated = await StaticVideos.create({
      url,
      pages,
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Video Created!', success: true });
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
    url: Yup.string().required('Url is required!'),
    pages: Yup.array().of(Yup.string().required('Page is required!')).min(1, 'At least one page is required!'),
  });

  try {
    const { id, url, pages } = await request.json();
    await ValReview.validate({ id, url, pages }, { abortEarly: false });

    const isUpdated = await Review.findByIdAndUpdate(id, {
      url,
      pages,
    });

    if (isUpdated) {
      return NextResponse.json({ message: 'Video Updated!', success: true });
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
      return NextResponse.json({ message: 'Video ID required!', success: false });
    }

    await connect();

    await StaticVideos.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Video Removed!', success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  }
}
