import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Post from '@/models/posts';
import * as Yup from 'yup';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');
    const by = searchParams.get('by');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * parseInt(limit);

    let query = { postType: 'faq-appliance-repair' };
    if(search != ''){
      query = {$and: [
        { title: { $regex: search, $options: 'i' } },
        { postType: 'faq-appliance-repair' }
      ]}
    }

    const PostCountPromise = Post.countDocuments(query);
    const GetPostsPromise = Post.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);

    const [count, faqs] = await Promise.all([PostCountPromise, GetPostsPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ faqs: faqs, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connect();

  const ValFaq = Yup.object({
    title: Yup.string().required('Title is required!'),
    content: Yup.string().required('Content is required!'),
  });

  try {
    const { title, content } = await request.json();
    await ValFaq.validate({ title, content }, { abortEarly: false });

    const postType = 'faq-appliance-repair';

    const isCreated = await Post.create({
      postType,
      title,
      content,
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Faq Created!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const ValFaq = Yup.object({
      title: Yup.string().required('Title is required!'),
      content: Yup.string().required('Content is required!'),
    });

    const { id, title, content } = await request.json();

    await ValFaq.validate({ title, content }, { abortEarly: false });

    await connect();

    const isCreated = await Post.findByIdAndUpdate(id, {
      title,
      content,
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Faq Updated!', success: true });
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
      return NextResponse.json({ message: 'Faq ID required!', success: false });
    }

    await connect();

    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Faq Deleted!', success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  }
}
