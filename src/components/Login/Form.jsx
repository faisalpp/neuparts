'use client';
import React from 'react';
import {authCookieUser} from '@/app/GlobalRedux/slices/AuthSlice'
import { BsArrowRightShort } from 'react-icons/bs';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux';

const Form = () => {

  const router = useRouter()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginVal = Yup.object({
    email: Yup.string().email().required('Email is required!'),
    password: Yup.string().required('Password is required!')
  });


  const getCookie = async (toastId) => {
    const secretKey = process.env.NEXT_PUBLIC_ENCRYPT_SALT;
    const key = new TextEncoder().encode(secretKey);

    const cookieStr = document.cookie;
    const cookies = cookieStr.split('; ');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if(cookieName === 'neu-user'){
       const res = await dispatch(authCookieUser({cookieValue:cookieValue,key:key}))
       if(res.payload?.id){
         router.push('/my-account/profile');
         toast.update(toastId,{render:'Signin Successfull!',type:'success',autoClose:1000,isLoading: false})
       }
      }
    }
  }


  const Login = async (e) => {
    e.preventDefault()

 
    try {
     await loginVal.validate({email,password}, {abortEarly: false});   
   } catch (error) {
     (error)
     error?.inner?.forEach((err) => {
       toast.error(err.message);
     });
     return
   }
 
   const crtToastId = toast.loading("Signing in...")
   
   fetch('/api/user/auth/login', {method: 'POST',
     headers: { 'Content-Type': 'application/json' },body: JSON.stringify({email,password}),
   }).then((res) => res.json())
    .then((resp) => {
     if(resp.success){
       getCookie(crtToastId)
      }else{
       toast.update(crtToastId,{render:'Invalid Credentials',type:'error',autoClose:1000,isLoading: false})
      }
     })
     .catch((error) => {
       toast.update(crtToastId,{render:'Something went wrong!',type:'error',autoClose:1000,isLoading: false})
     });
   }



  return (
    <>
      <div className="flex w-full flex-col items-center space-y-8 px-5 py-32 pt-20">
        <Link href="/">
          <Image width={400} height={400} quality={100} className="h-auto w-32" src="/neu-blue.webp" alt="login_logo" />
        </Link>
        <form onSubmit={(e)=>Login(e)} className="flex flex-col space-y-8 rounded-2xl border border-b1/10 bg-white px-10 py-10 md:w-7/12 lg:w-[512px] xl:w-[512px]">
          <h4 className="text-xl font-bold">Login</h4>
          <div className="flex flex-col space-y-2">
            <h5 className="text-xs font-semibold">Email Address</h5>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-b1/15 px-4 py-3 text-sm outline-none" placeholder="youremail@mail.com" />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <h5 className="text-xs font-semibold">Password</h5>
              <div className="flex w-full justify-end">
                <Link href="/forgot-password">
                  <span className="cursor-pointer text-xs font-semibold text-b3 hover:underline">Forgot Password?</span>
                </Link>
              </div>
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-b1/15 px-4 py-3 text-sm outline-none" placeholder="youremail@mail.com" />
          </div>
          <button type="submit" className="flex w-full cursor-pointer items-center justify-center rounded-md bg-b3 py-3 font-medium text-white">
            <span className="text-xs">Login</span>
            <BsArrowRightShort className="text-2xl" />
          </button>
          <div className="flex w-full justify-center">
            <h5 className="text-sm">
              New customer?{' '}
              <Link href="/register">
                <span className="cursor-pointer font-bold text-b3 underline">Create an Account</span>
              </Link>
            </h5>
          </div>
        </form>
      </div>
      <div className="flex w-full items-center justify-center text-xs font-normal ">
        <div className="flex py-4 text-[9px] text-black/70 md:w-7/12 xl:w-5/12  coxxl:w-5/12 xss-to-xs:w-10/12 xs-to-sm:w-7/12 lg-to-xl:w-6/12">
          <h3 className="w-1/2 xl:w-8/12 coxxl:w-8/12 lg-to-xl:w-8/12">© 2023 Neu Parts</h3>
          <h3 className="text-end">Terms&nbsp;of&nbsp;Use&nbsp;•&nbsp;Privacy&nbsp;Policy&nbsp;•&nbsp;Help&nbsp;Center</h3>
        </div>
      </div>
    </>
  );
};

export default Form;
