import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Post from '@/models/posts';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    
    const post = await Post.findOne({ slug: slug })
    if(post){
      return NextResponse.json({ blog: post, success: true });
    }
    return NextResponse.json({ success: false },{status: 404});

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
