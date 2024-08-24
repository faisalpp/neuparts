import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import StaticVideos from '@/models/static-videos';
import * as Yup from 'yup';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const type = searchParams.get('type') || '';

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * limit;

    let query = {page:type};

    const ReviewCountPromise = StaticVideos.countDocuments(query);
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
    page: Yup.string().required('Page is required!')
  });

  
  try {
    const { url, page } = await request.json();
    await ValReview.validate({ url, page }, { abortEarly: false });
    
    let isFound;
    if(page != 'product-page'){
     isFound = await StaticVideos.findOne({page:page})
    }

    if(isFound){
     const isUpdated = await StaticVideos.findByIdAndUpdate(isFound._id,{url:url})
     if (isUpdated) {
      return NextResponse.json({ message: 'Video Created!', success: true });
     }
    }else{
      const isCreated = await StaticVideos.create({url,page});
      if (isCreated) {
        return NextResponse.json({ message: 'Video Created!', success: true });
      }
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
