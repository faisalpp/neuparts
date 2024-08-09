import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Product from '@/models/product';
import * as Yup from 'yup';
import { generateSlug } from '@/utils/index';
//

export async function POST(request) {
  await connect();

  try {
    const res = await request.json();
    console.log(res);

    let slug = generateSlug(res.title);
    const regex = new RegExp(`^${slug}-\\d+$`);

    const blogCount = await Product.countDocuments({ slug: regex });
    if (blogCount > 0) {
      let inc = parseInt(blogCount) + 1;
      slug = slug + `-${inc}`;
    }

    const exactMatch = await Product.countDocuments({ slug: slug });
    if (exactMatch) {
      slug = slug + `-1`;
    }

    const isCreated = await Product.create({ ...res, slug: slug });

    if (isCreated) {
      return NextResponse.json({ message: 'Product Created!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
