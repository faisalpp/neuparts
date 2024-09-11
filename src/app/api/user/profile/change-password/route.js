import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';


export async function POST(request) {
  try {
    await connect();

    const { userId,curPassword,password} = await request.json()

    const isUser = await User.findOne({_id:userId})
    if(isUser){
     const curHash = await bcrypt.compare(curPassword, isUser.password);   
     if(curHash){ 
      const hash = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(userId,{
       password:hash
      });
      return NextResponse.json({ message:'Password updated successfully!' ,success: true }, { status: 200 });
     }
    }

    return NextResponse.json({ success: false, message: 'Incorrect current password!' }, { status: 401 });
  }catch(error){
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }
}
