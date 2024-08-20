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

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * parseInt(limit);

    const aggregationPipeline = [
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
      { $limit: parseInt(limit) }, // limit number of results
      { $skip: parseInt(skip) }, // skip number of results
    ];

    const PostCountPromise = Post.countDocuments();
    const GetPostsPromise = Post.aggregate(aggregationPipeline);

    const [count, blogs] = await Promise.all([PostCountPromise, GetPostsPromise]);

    const pageCount = Math.ceil(count / limit);
    blogs;
    return NextResponse.json({ blogs: blogs, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connect();

  const ValBlog = Yup.object({
    title: Yup.string().required('Title is required!'),
    content: Yup.string().required('Content is required!'),
    thumbnail: Yup.string().required('Thumbnail is required!'),
    category: Yup.object().required('Category is required!'),
  });

  try {
    const { title, content, thumbnail, category } = await request.json();
    await ValBlog.validate({ title, content, thumbnail, category }, { abortEarly: false });

    let slug = generateSlug(title);
    const postType = 'blog-appliance-tips';
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
      thumbnail,
      category: category._id,
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
      thumbnail: Yup.string().required('Thumbnail is required!'),
      category: Yup.string().required('Category is required!'),
    });

    const { id, title, content, thumbnail, category } = await request.json();
    await ValBlog.validate({ id, title, content, thumbnail, category }, { abortEarly: false });

    const isCreated = await Post.findByIdAndUpdate(id, {
      title,
      content,
      thumbnail,
      category: category,
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
