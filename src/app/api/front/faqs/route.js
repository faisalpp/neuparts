import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Post from '@/models/posts';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit');

    let query = { postType: 'faq-general', category: category };
    const skip = (page - 1) * limit;

    const FaqCountPromise = Post.countDocuments(query);
    const GetFaqPromise = Post.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);

    const [count, faqs] = await Promise.all([FaqCountPromise, GetFaqPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ faqs: faqs, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
