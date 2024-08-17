import Image from 'next/image';
import React from 'react';
import ToolTip from '@/components/ToolTip';
import FourStar from '@/components/svgs/FourStar';

const Rotate360Product = ({ product, condition }) => {
  return (
    <div className="rounded-3xl">
      <div id="360-view" className="maincontainer flex flex-col items-center gap-5 py-10 lg:py-14 xl:py-20 ">
        <h4 className="text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl">360° View of This Appliance</h4>
        <div className="relative mb-5 mt-5 w-full">
          <Image width={400} height={400} quality={100} src="/popular-parts.webp" alt="product" className="mx-auto h-auto w-[17rem]" />
          <div className="absolute -bottom-5 left-0 right-0">
            <Image width={400} height={400} quality={100} src="/360angle.webp" alt="product" className="mx-auto h-auto w-80" />
          </div>
        </div>
        <p className="my-10 font-normal">
          Rotate <b>360°</b> to see the product from all angles
        </p>
        <div className="border-gray-[rgba(0,0,0,0.08)] flex w-full rounded-2xl border-2 md:w-2/3 xl:w-1/2">
          <div className="flex w-full flex-col items-center border-r-[1px] border-gray-300">
            <h5 className="w-full border-b-[1px] border-gray-300 py-4 text-center text-sm font-semibold sm:text-base">#ID</h5>
            <h5 className="flex w-full items-center justify-center gap-1 border-b border-gray-300 py-4 text-center text-sm sm:text-base">
              <span className="font-semibold">Cosmetic Rating </span>
              <ToolTip color="text-b3" />
            </h5>
            <h5 className="flex w-full items-center justify-center border-b border-gray-300 py-4 text-center text-sm font-semibold sm:text-base">Model Number</h5>
            <h5 className="flex w-full items-center justify-center gap-1 py-4 text-center text-sm font-semibold sm:text-base">
              <span>Warranty</span> <ToolTip color="text-b3" />
            </h5>
          </div>
          <div className="flex w-full flex-col items-center border-l-[1px] border-white">
            <h5 className="w-full border-b-[1px] border-gray-300 py-4 text-center font-normal">#12354567876</h5>
            <div className="flex w-full items-center justify-center border-b border-gray-300 py-[15px]">
              <div className={`inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase text-white ` + condition().class}>
                {condition().slug === 'new' && <FourStar />}
                {condition().title}
              </div>
            </div>
            <div className="w-full border-b-[1px] border-gray-300 py-4 text-center font-normal">{product?.model_no}</div>
            <div className="flex w-full items-center justify-center space-x-2 border-gray-300 py-3">
              <div className="flex items-center justify-center space-x-1 rounded-md border border-gray-300 py-1 pl-2 pr-2 sm:pr-8">
                <Image width={200} height={200} quality={100} className="h-6 w-6" src="/nueshield.webp" alt="nueshield" />
                <span className="w-full break-words text-xs font-medium ">
                  NeuShield <br /> 1 Year Warranty
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shop With Confidnce */}
        <div className="mx-auto mt-6 flex max-w-[930px] flex-col gap-4 rounded-3xl border-2 border-b3 bg-b3/5 p-5 sm:p-8 lg:mt-10">
          <h3 className="text-xl font-medium sm:text-2xl">Shop With Confidence.</h3>
          <p>The item in the pictures above is the item you will receive. Scratch and dent appliances are all unique, so we include 360° pictures and videos for every item we stock. Rotate the picture to Inspect the appliance&apos;s cosmetic condition.</p>
        </div>
      </div>
    </div>
  );
};

export default Rotate360Product;
