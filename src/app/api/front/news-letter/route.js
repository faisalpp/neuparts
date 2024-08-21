import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import NewsLetter from '@/models/newsLetter';
import * as Yup from 'yup';


export async function POST(request) {
    await connect();
  
    const ValFaq = Yup.object({
      email: Yup.string().required('Email is required!'),
    });
  
    // try {
      const { email } = await request.json();
      await ValFaq.validate({ email}, { abortEarly: false });
  
      const isSubscribed = await NewsLetter.create({
        email,
      });
  
      if (isSubscribed) {
        return NextResponse.json({ message: 'Newsletter subscribed successfully!', success: true });
      }
    //   return NextResponse.json({ message: 'Something Went Wrong!', success: false },{status:500});
    // } catch (error) {
    //   return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    // }
  }