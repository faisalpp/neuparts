import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    await connect();

    const { email,password} = await request.json()

    const isUser = await User.findOne({email:email})
    if(isUser){
     const hash = await bcrypt.hash(password, 10);
     
     await User.findByIdAndUpdate(isUser._id,{
      password:hash,
      forget_token:null
     });
     
     return NextResponse.json({ message:'Password updated successfully!' ,success: true }, { status: 200 });
    }

    return NextResponse.json({ success: false, message: 'Invalid user!' }, { status: 401 });
  }catch(error){
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }
}
