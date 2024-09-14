import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  
  const { email, password } = await request.json();
  
  let user;
  try {
    await connect();
    user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, msg: 'Ivalid User Credentials!' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const hash = await bcrypt.compare(password, user.password);
  const expiredAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

  if (hash) {
    const session = await encrypt({ id:user._id,email: user.email, expires:expiredAt });
    cookies().set('neu-user', session, { expires: expiredAt, httpOnly: false });
    return NextResponse.json({ success: true, msg: 'Login successfull!' }, { status: 200 });
  } else {
    return NextResponse.json({ success: false, msg: 'Ivalid User Credentials!' }, { status: 401 });
  }
}
