import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Post from '@/models/posts';
import * as Yup from 'yup';
import { generateSlug } from '@/utils/index';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');
    const By = searchParams.get('by');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * parseInt(limit);

    const aggregationPipeline = [
      {
        $match: {
          title: { $regex: search, $options: 'i' }
        }
      },
      {
        $addFields: {
          categoryId: { $toObjectId: '$category' }, // Convert string to ObjectId
        },
      },
      {
        $lookup: {
          from: 'helpscategories', // name of the collection to join
          localField: 'categoryId', // field in the Posts collection (after conversion)
          foreignField: '_id', // field in the faqCategories collection
          as: 'joinedCategory', // name for the field where the joined data will be stored
        },
      },
      { $unwind: '$joinedCategory' }, // Unwind to destructure the array to object
      { $sort: { createdAt: -1 } }, // sorting by createdAt descending
    ];

    const PostCountPromise = Post.aggregate(aggregationPipeline);
    const GetPostsPromise = Post.aggregate([...aggregationPipeline,{ $skip: parseInt(skip) },{ $limit: parseInt(limit) }]);

    const [count, blogs] = await Promise.all([PostCountPromise, GetPostsPromise]);

    const pageCount = Math.ceil(count.length / limit);

    return NextResponse.json({ blogs: blogs, pagination: { pageCount, count:count.length }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connect();

  const ValBlog = Yup.object({
    title: Yup.string().required('Title is required!'),
    content: Yup.string().required('Content is required!'),
    category: Yup.object().required('Category is required!'),
  });

  try {
    const { title, content, category, meta } = await request.json();
    await ValBlog.validate({ title, content, category }, { abortEarly: false });

    let slug = generateSlug(title);
    const postType = 'blog-help-support';
    const regex = new RegExp(`^${slug}-\\d+$`);

    const blogCount = await Post.countDocuments({ postType: postType, slug: regex });
    if (blogCount > 0) {
      let inc = parseInt(blogCount) + 1;
      slug = slug + `-${inc}`;
    }

    const exactMatch = await Post.countDocuments({ postType: postType, slug: slug });
    if (exactMatch) {
      slug = slug + `-1`;
    }

    const isCreated = await Post.create({
      postType,
      title,
      slug,
      content,
      category: category._id,
      meta: meta,
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Blog Created!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connect();

    const ValBlog = Yup.object({
      id: Yup.string().required('Id is required!'),
      title: Yup.string().required('Title is required!'),
      content: Yup.string().required('Content is required!'),
      category: Yup.string().required('Category is required!'),
    });

    const { id, title, content, category, meta } = await request.json();
    await ValBlog.validate({ id, title, content, category }, { abortEarly: false });

    const isCreated = await Post.findByIdAndUpdate(id, {
      title,
      content,
      category: category,
      meta: meta,
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Blog Updated!', success: true });
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
      return NextResponse.json({ message: 'Blog ID required!', success: false });
    }

    await connect();

    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Blog Deleted!', success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  }
}
