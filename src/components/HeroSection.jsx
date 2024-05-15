'use client';
import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <>
      <div className="bg-blue-gradient relative py-10 lg:py-16 xl:py-20">
        <Image src="/hero-bg.webp" className="absolute inset-0 -z-10 h-full w-full" width={1000} height={1000} alt="Neuappliance" />
        <div className="maincontainer flex flex-col items-center space-y-10 text-center">
          <h1 className="text-40px font-extrabold text-white lg:text-4xl xl:text-5xl 2xl:text-6xl maxxl:leading-tight">Austin&apos;s Best Deals For Scratch & Dent Appliances</h1>
          <p class="text-white">Come for the Savings. Stay for the Quality and Service.</p>
          <div className="">
            <div className="flex items-center gap-1">
              <button type="button" className="bg-darkpurple rounded-t-lg px-4 py-2 text-sm font-semibold text-white">
                Search By
              </button>
              <button type="button" className="rounded-t-lg bg-[#C4C4C4] px-4 py-2 text-sm font-semibold text-white">
                Browse By Tab
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
