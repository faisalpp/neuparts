import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/user';

export async function GET(request) {
  
  try {

    await connect();
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Ivalid User Credentials!' }, { status: 401 });
    }

    const profile = {
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        country:user.country,
        phone:user.phone
    }

    return NextResponse.json({ profile:profile ,success: true, }, { status: 200 });
    
  }catch(error){
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }
}


export async function PUT(request) {
  
  try {

    await connect();

    const { firstName, lastName, email, country, phone } = await request.json()

     await User.findOneAndUpdate({email:email},{
      firstName, lastName, email, country, phone
    });

    return NextResponse.json({ message:'Profile updated successfully!' ,success: true, }, { status: 200 });
    
  }catch(error){
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }
}
