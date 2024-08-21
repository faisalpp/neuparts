import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import HomeGallery from '@/models/homeGallery';
import * as Yup from 'yup';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * limit;

    let query = {};

    const ReviewCountPromise = HomeGallery.estimatedDocumentCount(query);
    const GetReviewsPromise = HomeGallery.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);

    const [count, images] = await Promise.all([ReviewCountPromise, GetReviewsPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ images: images, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connect();

  const ValReview = Yup.object({
    urls: Yup.array().required('Image is required!'),
   });

//   try {
    const { urls } = await request.json();
    await ValReview.validate({ urls }, { abortEarly: false });

   urls.forEach( async (url)=>{
      await HomeGallery.create({url});
   })

   return NextResponse.json({ message: 'Home Gallery Updated!', success: true });

//   } catch (error) {
//     return NextResponse.json({ error: error.message, success: false }, { status: 500 });
//   }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (id === '') {
      return NextResponse.json({ message: 'Gallery image ID required!', success: false });
    }

    await connect();

    await HomeGallery.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Gallery image removed!', success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  }
}
