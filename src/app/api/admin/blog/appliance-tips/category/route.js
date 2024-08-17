import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import ApplianceCategories from '@/models/applianceCategories';
import * as Yup from 'yup';
import { generateSlug } from '@/utils/index';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') || '';

    const page = searchParams.get('page') || '';
    const skip = (page - 1) * limit;

    const PostCountPromise = ApplianceCategories.countDocuments();
    const GetPostsPromise = ApplianceCategories.find().sort({ index: 1 }).limit(limit).skip(skip);

    const [count, categories] = await Promise.all([PostCountPromise, GetPostsPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ cats: categories, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connect();

  const ValCat = Yup.object({
    title: Yup.string().required('Title is required!'),
    thumbnail: Yup.string().required('Thumbnail is required!'),
  });

  try {
    const { title, thumbnail } = await request.json();

    await ValCat.validate({ title, thumbnail }, { abortEarly: false });

    let slug = generateSlug(title);
    const regex = new RegExp(`^${slug}-\\d+$`);

    const catsCount = await ApplianceCategories.countDocuments({ slug: regex });
    slug = catsCount > 0 ? `${slug}-${parseInt(catsCount) + 1}` : slug;

    const exactMatch = await ApplianceCategories.countDocuments({ slug: slug });
    if (exactMatch) {
      slug = slug + `-1`;
    }

    const isCreated = await ApplianceCategories.create({
      title,
      thumbnail,
      slug,
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Blog Category Created!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function PUT(request) {
  await connect();

  const ValReview = Yup.object({
    id: Yup.string().required('Category id is required!'),
    title: Yup.string().required('Title is required!'),
    thumbnail: Yup.string().required('Thumbnail is required!'),
  });

  try {
    const { id, title, thumbnail } = await request.json();
    await ValReview.validate({ id, title, thumbnail }, { abortEarly: false });

    const isUpdated = await ApplianceCategories.findByIdAndUpdate(id, {
      title,
      thumbnail,
    });

    if (isUpdated) {
      return NextResponse.json({ message: 'Category Updated!', success: true });
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
      return NextResponse.json({ message: 'Category ID required!', success: false });
    }

    await connect();

    await ApplianceCategories.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Blog Category Deleted!', success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  }
}
