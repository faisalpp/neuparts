import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET(request) {
  // try {
    await connect();
    cookies().set('neu-admin', '', { expires: new Date(0) });
    return NextResponse.json({ success: true, msg: 'Signout successfull!' }, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ success: false }, { status: 500 });
  // }
}
