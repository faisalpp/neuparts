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

    let query = { postType: 'blog' };
    if(search != ''){
      query = {$and: [
        { title: { $regex: search, $options: 'i' } },
        { postType: 'blog' }
      ]}
    }

    const PostCountPromise = Post.countDocuments(query);
    const GetPostsPromise = Post.find(query).skip(skip).limit(limit);

    const [count, blogs] = await Promise.all([PostCountPromise, GetPostsPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ blogs: blogs, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
  await connect();

  const ValBlog = Yup.object({
    title: Yup.string().required('Title is required!'),
    content: Yup.string().required('Content is required!'),
    thumbnail: Yup.string().required('Thumbnail is required!'),
  });

    const { title, content, thumbnail } = await request.json();
    await ValBlog.validate({ title, content, thumbnail }, { abortEarly: false });

    let slug = generateSlug(title);
    const postType = 'blog';
    const regex = new RegExp(`^${slug}-\\d+$`);

    const blogCount = await Post.countDocuments({ postType: postType, slug: regex });
    if (blogCount > 0) {
      let inc = parseInt(blogCount) + 1;
      slug = slug + `-${inc}`;
    }

    const exactMatch = await Post.countDocuments({ postType: postType, slug: slug });
    if (exactMatch > 0) {
      slug = slug + `-1`;
    }

    const isCreated = await Post.create({
      postType,
      title,
      slug,
      content,
      thumbnail,
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
    });

    const { id, title, content, thumbnail } = await request.json();
    await ValBlog.validate({ id, title, content, thumbnail }, { abortEarly: false });

    const isCreated = await Post.findByIdAndUpdate(id, {
      title,
      content,
      thumbnail,
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
    await connect();

    const { id } = await request.json();

    if (id === '') {
      return NextResponse.json({ message: 'Blog ID required!', success: false });
    }


    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Blog Deleted!', success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  }
}
