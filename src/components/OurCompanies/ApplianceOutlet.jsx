import React from 'react';
import Link from 'next/link';
import ShieldSvg from '@/components/svgs/ShieldSvg';
import ScratchSvg from '@/components/svgs/ScratchSvg';
import BoxSvg from '@/components/svgs/BoxSvg';
import RoundedTick from '@/components/svgs/RoundedTick';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { BiPlayCircle } from 'react-icons/bi';
import Image from 'next/image';

const ApplianceParts = () => {
  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-[#F2F9FC] px-3 2xl:p-7 xs:p-10 3xl:p-10 maxcosm:py-5">
      <Link href="/">
        <Image width={400} height={400} quality={100} src="/nueappliancesoutlet.webp" alt="nueappliancesoutlet" className="h-16 w-auto" />
      </Link>
      <div className="flex flex-col gap-3 text-b18">
        <h3 className="text-2xl font-bold">Neu Appliance Outlet</h3>
        <p className="leading-6">Appliances can be expensive and the need to replace an appliance seems to always happen at an inconvenient time. Our website&apos;s live inventory provides our customers with reliable up to date - remote access to all of our discount appliance inventory in real time.</p>
      </div>
      <div className="flex flex-col gap-3 text-b18">
        <p className="font-bold">Neu Appliance Outlet provides the solutions you have been looking for:</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-2 rounded-lg bg-[#F7FBFD] px-0 py-4 sm:px-4 lg:p-2">
            <ShieldSvg className="mx-auto h-10 w-10" />
            <p className="text-center text-[10px] font-bold text-b18 lg:text-xs">Certified Refurbished Appliances</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-[#F7FBFD] px-0 py-4 sm:px-4 lg:p-2">
            <ScratchSvg className="mx-auto h-10 w-10" />
            <p className="text-center text-[10px] font-bold text-b18 lg:text-xs">Scratch & Dent Appliances</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-[#F7FBFD] px-0 py-4 sm:px-4 lg:p-2">
            <BoxSvg className="mx-auto h-10 w-10" />
            <p className="text-center text-[10px] font-bold text-b18 lg:text-xs">Open Box Appliances</p>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-3 text-b18">
          <p className="font-bold">Our Website&apos;s Tools For Success include:</p>
          <ul className="flex flex-col gap-4">
            {toolsList.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="h-5 w-5 md:h-6 md:w-6">
                  <RoundedTick />
                </div>
                <p className="maxmd:text-sm">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="inline-flex gap-2 pt-6 maxmd:flex-col">
          <Link href="/products" className="flex items-center justify-center gap-1 rounded-lg bg-[#071822] px-4 py-3 text-xs font-medium text-white">
            <HiOutlineShoppingCart className="text-sm text-white" />
            <span>Shop Now</span>
          </Link>
          <Link href="https://youtu.be/YliJxHkreaE" target="_blank" className="flex items-center justify-center gap-1  rounded-lg border border-[#071822] px-4 py-3 text-xs font-medium text-[#071822]">
            <BiPlayCircle className="text-sm text-[#071822]" />
            <span>Watch Video</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplianceParts;

const toolsList = ['High definition appliance pictures of the actual item you’re purchasing.', 'Detailed appliance specifications & dimensions.', 'Accurate condition descriptions.', 'Fast & convenient delivery.'];
