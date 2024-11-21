import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import NewsLetter from '@/models/newsLetter';
import * as Yup from 'yup';


export async function POST(request) {
  // try {
    await connect();
  
    const ValFaq = Yup.object({
      email: Yup.string().required('Email is required!'),
    });
  
      const { email } = await request.json();
      await ValFaq.validate({ email}, { abortEarly: false });
      
      const find = await NewsLetter.findOne({email:email})
      if(find){
        return NextResponse.json({ message: 'Newsletter already subscribed!', success: false });
      }else{
        await NewsLetter.create({
          email,
        });
        return NextResponse.json({ message: 'Newsletter subscribed successfully!', success: true });
      }
   
    // } catch (error) {
    //   return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    // }
  }