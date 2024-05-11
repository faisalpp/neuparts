'use client'
import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Form = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="flex w-full flex-col items-center space-y-10 px-5 py-32 pt-20">
        <div>
          <Image width={400} height={400} quality={100} className='w-full h-auto' src="/login_logo.webp" alt="login_logo" />
        </div>
        <form onSubmit={Login} className="flex flex-col space-y-8 rounded-2xl border-[1px] border-gray-200 bg-white px-10 py-10 md:w-7/12 lg:w-[512px] xl:w-[512px]">
          <h4 className="text-xl font-bold">Login</h4>
          <div className="flex flex-col space-y-1">
            <h5 className="text-xs font-semibold">Email Address</h5>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border-[1px] border-gray-200 px-4 py-3 text-sm outline-none" placeholder="youremail@mail.com" />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <h5 className="text-xs font-semibold">Password</h5>
              <div className="flex w-full justify-end">
                <Link href="/forgot-password">
                  <span className="cursor-pointer text-xs font-semibold text-b3 hover:underline">Forgot Password?</span>
                </Link>
              </div>
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border-[1px] border-gray-200 px-4 py-3 text-sm outline-none" placeholder="youremail@mail.com" />
          </div>
          <button type="submit" className="flex w-full cursor-pointer items-center justify-center rounded-md bg-b3 py-1">
            <span className="flex w-fit items-center  rounded-md px-4 py-1 text-center font-semibold text-white">
              <span className="text-xs">Login</span>
              <BsArrowRightShort className="text-2xl" />
            </span>
          </button>
          <div className="flex w-full justify-center">
            <h5 className="text-sm">
              New customer?{' '}
              <Link href="/register">
                <span className="cursor-pointer text-b3 hover:underline">Create an Account</span>
              </Link>
            </h5>
          </div>
        </form>
      </div>
      <div className="flex w-full items-center justify-center text-xs font-normal ">
        <div className="flex py-4 text-[9px] text-black/70 md:w-7/12 xl:w-5/12  coxxl:w-5/12 xss-to-xs:w-10/12 xs-to-sm:w-7/12 lg-to-xl:w-6/12">
          <h3 className="w-1/2 xl:w-8/12 coxxl:w-8/12 lg-to-xl:w-8/12">© 2023 Neu Appliances</h3>
          <h3 className="text-end">Terms&nbsp;of&nbsp;Use&nbsp;•&nbsp;Privacy&nbsp;Policy&nbsp;•&nbsp;Help&nbsp;Center</h3>
        </div>
      </div>
    </>
  );
};

export default Form;
