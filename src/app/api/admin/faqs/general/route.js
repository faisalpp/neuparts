import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Post from '@/models/posts';
import PostCategories from '@/models/postCategories';
import * as Yup from 'yup';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');
    const By = searchParams.get('by');


    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * parseInt(limit);

    let query = { postType: 'faq-general' };
    if(search != ''){
      query = {$and: [
        { title: { $regex: search, $options: 'i' } },
        { postType: 'faq-general' }
      ]}
    }

    const aggregationPipeline = [
      { $match: query }, // Match documents based on the query conditions
      {
        $addFields: {
          categoryId: { $toObjectId: '$category' }, // Convert string to ObjectId
        },
      },
      {
        $lookup: {
          from: 'postCategories', // name of the collection to join
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

    const PostCountPromise = Post.countDocuments(query);
    const GetPostsPromise = Post.aggregate(aggregationPipeline);

    const [count, faqs] = await Promise.all([PostCountPromise, GetPostsPromise]);

    const pageCount = Math.ceil(count / limit);

    //get faq categories
    const cats = await PostCategories.find({ postType: 'general-faqs' });
    

    return NextResponse.json({ faqs: faqs, cats: cats, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connect();

  const ValFaq = Yup.object({
    title: Yup.string().required('Title is required!'),
    content: Yup.string().required('Content is required!'),
    category: Yup.string().required('Category is required!'),
  });

  try {
    const { title, content, category } = await request.json();
    await ValFaq.validate({ title, content, category }, { abortEarly: false });

    const postType = 'faq-general';

    const isCreated = await Post.create({
      postType,
      title,
      content,
      category,
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
      category: Yup.object().required('Category is required!'),
    });

    const { id, title, content, category } = await request.json();
    await ValFaq.validate({ title, content, category }, { abortEarly: false });

    await connect();

    const isCreated = await Post.findByIdAndUpdate(id, {
      title,
      content,
      category: category._id,
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
