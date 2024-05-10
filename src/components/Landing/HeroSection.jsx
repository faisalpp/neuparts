import React, { useState } from 'react';
import { AiOutlineArrowRight, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoCloseOutline, IoMenu } from 'react-icons/io5';
import { MdOutlinePhone } from 'react-icons/md';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import Link from 'next/link';

const HeroSection = () => {
  const [mobMenu, setMobMenu] = useState(false);
  return (
    <>
      <header className="relative">
        <img src="landing.webp" alt="landing" className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full" />
        {/* Navigation */}
        <nav className="mx-auto flex max-w-1680px items-center justify-between px-4 py-5 sm:px-10 lg:px-16 xl:px-20 2xl:px-120px">
          <Link href="/">
            <img src="/neu.webp" alt="neuappliances" className="h-10" />
          </Link>
          <div className="flex items-center gap-6">
            <button type="button" className="relative inline-flex items-center justify-center rounded-lg bg-[rgba(255,255,255,0.08)] px-4 py-3 text-xs font-medium text-white md:hidden">
              <AiOutlineShoppingCart className="text-base" />
              <span className="absolute -right-2 -top-2 rounded-full bg-b3 px-[6px] py-1 text-sm font-bold text-white">0</span>
            </button>
            {mobMenu ? (
              <button type="button" onClick={() => setMobMenu(false)} className="flex h-12 w-12 items-center justify-center rounded-full bg-b2 text-white md:hidden">
                <IoCloseOutline className="text-2xl text-white" />
              </button>
            ) : (
              <button type="button" onClick={() => setMobMenu(true)} className="flex h-12 w-12 items-center justify-center rounded-full bg-b2 text-white md:hidden">
                <IoMenu className="text-2xl" />
              </button>
            )}
          </div>
          <div className={`${mobMenu ? 'maxmd:fixed' : 'maxmd:hidden'} right-0 top-16 z-50 flex gap-4 rounded-md py-5 md:gap-6 maxmd:h-auto maxmd:w-2/3 maxmd:flex-col maxmd:overflow-y-scroll maxmd:bg-b1 maxmd:p-10`}>
            <Link href="" className="inline-flex items-center justify-center gap-1 rounded-lg bg-[rgba(255,255,255,0.08)] px-4 py-3 text-xs font-medium text-white">
              <AiOutlineShoppingCart className="text-base" />
              <span>Go to Store</span>
            </Link>
            <button type="button" className="relative inline-flex items-center justify-center rounded-lg bg-[rgba(255,255,255,0.08)] px-4 py-3 text-xs font-medium text-white maxmd:hidden">
              <AiOutlineShoppingCart className="text-base" />
              <span className="absolute -right-2 -top-2 rounded-full bg-b3 px-[6px] py-1 text-sm font-bold text-white">0</span>
            </button>
            <Link href="tel:(512) 992-2714" className="flex items-center gap-1 text-xs font-medium text-white">
              <MdOutlinePhone className="text-base" />
              <span>(512) 992-2714</span>
            </Link>
            <Link href="tel:(512) 992-2714" className="flex items-center gap-1 text-xs font-medium text-white">
              <TfiHeadphoneAlt className="text-base" />
              <span>Need Help?</span>
            </Link>
          </div>
        </nav>
        {/* End Navigation*/}
        <div className="pb-120px pt-60px">
          <div className="mx-auto flex grid-cols-2 flex-col items-center gap-10 px-4 sm:px-10 md:grid lg:px-16 xl:px-20 2xl:px-120px 3xl:max-w-1680px">
            <div className="flex flex-col gap-1 lg:gap-2">
              <div>
                <span className="inline-flex items-center justify-center rounded-full bg-b4 px-3 py-2 text-sm font-semibold text-b16">Amazing Deals!!!</span>
              </div>
              <h1 className="text-6xl font-extrabold leading-[80px] text-white lg:text-7xl lg:leading-[120px] xl:text-8xl 2xl:text-[120px]">30% OFF</h1>
              <p className="text-xl text-white lg:text-2xl">on all our 3 stars appliances.</p>
              <div className="pt-8 text-white">
                <Link href="" className="inline-flex items-center justify-center gap-1 rounded-lg bg-b3 px-6 py-3 font-semibold text-white">
                  View All <AiOutlineArrowRight className="text-lg" />
                </Link>
              </div>
            </div>
            <div className="flex justify-end">
              <img src="/landing_banner.webp" alt="refrigrators" className="mx-auto 2xl:h-[457px] 2xl:w-[568px]" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeroSection;
