import { NextResponse } from 'next/server';
import {updateSession} from '@/lib/auth'

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if(pathname.startsWith('/neu-admin/login')){
    const isAuth = await updateSession(request,'neu-admin')
    if(!isAuth){
      return NextResponse.next();   
    }else{
      return NextResponse.redirect(new URL('/neu-admin', request.url));
    }
  }else if (pathname.startsWith('/neu-admin')) {
    const isAuth = await updateSession(request,'neu-admin')
    if(isAuth){
     return NextResponse.next();   
    }else{
      return NextResponse.redirect(new URL('/neu-admin/login', request.url));
    }
  }

  if(pathname.startsWith('/login')){
    const isAuth = await updateSession(request,'neu-user');
    if(!isAuth){
      return NextResponse.next()
    }else{
      return NextResponse.redirect(new URL('/my-account/profile',request.url))
    }
  }else if(pathname.startsWith('/my-account')){
    const isAuth = await updateSession(request,'neu-user');
    if(isAuth){
      return NextResponse.next()
    }else{
      return NextResponse.redirect(new URL('/login',request.url))
    }
  }


  // Continue to the requested page
  return NextResponse.next();
}