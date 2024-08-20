import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  await connect();

  const { firstName, lastName, email, country, phone, password } = await request.json();

  const hash = await bcrypt.hash(password, 10);

  let USER;
  try {
    USER = await User.create({ firstName, lastName, country, phone, email, password: hash });
    if (!USER) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    //create newly created user session early login
    const expiredAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    const session = await encrypt({ email: USER.email, expiredAt });
    cookies().set('neu-user', session, { expires: expiredAt, httpOnly: false });
    return NextResponse.json({ success: true, msg: 'Signup successfull!' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
