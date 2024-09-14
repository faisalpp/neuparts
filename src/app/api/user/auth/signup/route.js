import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import {SubscribeNewsLetter} from  '@/utils/order'

export async function POST(request) {
  try {
  await connect();

  const { firstName, lastName, email, country, phone, password } = await request.json();
  
  const isPrev = await User.findOne({email:email})
  if(isPrev){
    return NextResponse.json({ message: 'User with this email already exist!' }, { status: 401 });
  }

  const hash = await bcrypt.hash(password, 10);

  const USER = await User.create({ firstName, lastName, country, phone, email, password: hash });
    if (!USER) {
      return NextResponse.json({ error: 'Internal server error!' }, { status: 500 });
    }

    await SubscribeNewsLetter(email)

    return NextResponse.json({ success: true, msg: 'Signup successfull!' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error!' }, { status: 500 });
  }

}
