'use client';
import React, { useState } from 'react';
import InputCheckbox from './InputCheckbox';
import Link from 'next/link';
import Image from 'next/image';

const NewsLetterSection = ({ backimage }) => {
  const [email, setEmail] = useState('');

  const SubscribeNews = async (e) => {
    e.preventDefault();
    // const res = await subscribeNewLetter({email:email})
    // if(res.status === 200){
    //   Toast(res.data.msg,'success',1000)
    //   setEmail('')
    // }else{
    //   Toast(res.data.message,'error',1000)
    // }
  };

  return (
    <div id="news" className="relative">
      <div className="maincontainer flex h-auto items-center justify-center py-10 lg:py-16">
        <Image width={1000} height={1000} quality={100} src={backimage} className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full object-cover" alt="new" />
        <div id="news-grid" className="relative z-10 flex w-full grid-cols-12 flex-col items-center justify-center rounded-lg bg-white/80 py-5 backdrop-blur-[20px] md:h-80 lg:grid lg:h-72 xl:h-96 maxmd:px-5">
          <div className="col-start-2 col-end-6 flex flex-col items-center justify-center space-y-2 lg:space-y-5 xl:space-y-5 [&>*]:text-b16">
            <div className="w-fit rounded-3xl bg-b3 px-7 py-2 text-xs font-bold !text-white xl:text-sm">STAY UPDATED</div>
            <h4 className="text-xl font-bold lg:text-4xl xl:text-[56px]">Subscribe!</h4>
            <p className="text-center text-xs lg:w-72 lg:text-sm xl:text-base">Get updates on exclusive discounts, experiences and more.</p>
          </div>
          <div className="col-start-7 col-end-12 flex flex-col space-y-2 [&>*]:text-b16">
            <h4 className="text-sm font-bold">Email</h4>
            <form onSubmit={SubscribeNews} className="flex flex-col items-center space-x-5 space-y-2 lg:flex-row lg:space-y-0">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-72 rounded-md bg-white px-2 py-2 text-xs outline-none placeholder:font-normal placeholder:text-[#777E90] lg:py-3 xl:py-3" placeholder="Type here" />
              <button className="w-max whitespace-nowrap rounded-md bg-b3 px-7 py-3 text-xs font-bold text-white">Get Updates</button>
            </form>
            <div className="flex items-center space-x-2 py-2">
              <InputCheckbox />
              {/* <Checkbox color='black' checked ripple={true} /> */}
              <span className="text-sm font-semibold">Yes, sign me up!</span>
            </div>
            <p className="w-[280px] text-xs xl:w-[350px]">
              Sign up above to get updates delivered directly to your inbox. See our{' '}
              <Link href="/privacy-policy" className="font-semibold underline">
                Privacy Policy.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
