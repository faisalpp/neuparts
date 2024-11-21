'use client';
import React, { useState } from 'react';
import InputCheckbox from './InputCheckbox';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';

const NewsLetterSection = ({ backimage }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const SubscribeNews = async (e) => {
    e.preventDefault();
    if(email != '' ){
      setLoading(true)
      const crtToastId = toast.loading('Subscribing to newsletter...');
      fetch('/api/front/news-letter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({email:email}) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          toast.update(crtToastId, { type: 'success',render:'Newsletter subscribed successfully!', autoClose: 1000, isLoading: false });
        } else {
          toast.update(crtToastId, { type:'info',render:resp.message, autoClose: 1000, isLoading: false });
        }
        setLoading(false)
        setEmail('')
      })
      .catch((error) => {
        toast.update(crtToastId, { type: 'error',render:'Something went wrong!', autoClose: 1000, isLoading: false });
        setLoading(false)
        setEmail('')
      });
    }else{
     toast.error('Invalid email address!')
    }
  };

  return (
    <div id="news" className="relative">
      <div className="maincontainer flex h-auto items-center justify-center py-10 lg:py-16">
        <Image width={1000} height={1000} quality={100} src={backimage} className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full object-cover" alt="new" />
        <div id="news-grid" className="relative z-10 flex w-full grid-cols-12 flex-col items-center justify-center rounded-lg bg-white/80 py-10 backdrop-blur-[20px] md:h-80 lg:grid lg:h-72 xl:h-96 maxmd:px-4">
          <div className="flex flex-col items-center justify-center space-y-2 lg:col-start-2 lg:col-end-6 lg:space-y-5 xl:space-y-5 [&>*]:text-b16">
            <div className="w-fit rounded-3xl bg-b3 px-7 py-2 text-sm font-bold !text-white">STAY UPDATED</div>
            <h4 className="text-40px font-bold lg:text-4xl xl:text-[56px]">Subscribe!</h4>
            <p className="text-center text-base md:w-72">Get updates on exclusive discounts, experiences and more.</p>
          </div>
          <div className="flex flex-col space-y-2 lg:col-start-7 lg:col-end-12 [&>*]:text-b16">
            <h4 className="text-sm font-bold">Email</h4>
            <form onSubmit={SubscribeNews} className="flex flex-col items-center space-y-2 md:space-x-5 lg:flex-row lg:space-y-0">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-md bg-white px-2 py-2 text-xs outline-none placeholder:font-normal placeholder:text-[#777E90] md:w-72 lg:py-3 xl:py-3" placeholder="Type here" />
              <button disabled={loading === true} className="w-full rounded-md bg-b3 px-7 py-3 text-xs font-bold text-white md:w-max md:whitespace-nowrap">Get Updates</button>
            </form>
            <div className="label-p-0 flex items-center gap-4 py-2">
              <InputCheckbox />
              {/* <Checkbox color='black' checked ripple={true} /> */}
              <span className="text-b1">Yes, sign me up!</span>
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
