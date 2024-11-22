'use client';
import FourStar from '@/components/svgs/FourStar';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import GasSvg from '@/components/svgs/GasSvg';

const BuyingHero = () => {
  const [Options, setOptions] = useState([
    { condition: 'new', quantity: 3, perc: '20', price: '279.00' },
    { condition: 'new-open-box', quantity: 12, perc: '35', price: '279.00' },
    { condition: 'used-grade-a', quantity: 15, perc: '35', price: '279.00' },
    { condition: 'used-grade-b', quantity: 0, perc: '35', price: '279.00' },
    { condition: 'used-grade-c', quantity: 15, perc: '35', price: '279.00' },
    { condition: 'used-grade-d', quantity: 15, perc: '35', price: '279.00' },
  ]);
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[360px_auto] xl:grid-cols-[530px_auto] ">
      <div className="grid place-items-center">
        <Image width={200} height={200} quality={100} src="/popular-parts.webp" alt="Product" className="h-auto w-2/3 object-contain" />
      </div>
      <div>
        <h1 className="mb-6 line-clamp-2 text-2xl font-bold text-b18">Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for washing Controls and manuallong text</h1>
        {/* Part No */}
        <div className="mb-10 flex flex-wrap items-center gap-2 rounded-lg border border-b3 px-5 py-4 shadow-[0px_4px_24px_rgba(0,0,0,0.08)]">
          <h3 className="text-base font-semibold text-b16/50 md:text-xl xs:text-lg">Part Number</h3>
          <IoSettingsOutline className="h-4 w-4 text-b16/50 md:h-5 md:w-5" />
          <span className="text-sm font-semibold text-b3 md:text-lg xs:text-base">LGWM0L2CRV2T2</span>
        </div>

        {/* Buying Lists */}
        <div className="space-y-2.5">
          {Options.map((item, index) => (
            <div className={`grid grid-cols-2 gap-x-2 gap-y-4 rounded-[20px] bg-b3/5 p-4 sm:grid-cols-6 sm:gap-4 md:p-5 ${item.quantity ? '' : 'grayscale'}`} key={index}>
              <div className="col-span-2 flex items-center justify-between gap-2 sm:col-span-3">
                {item.condition == 'new' && (
                  <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                    <FourStar />
                    New
                  </div>
                )}
                {item.condition == 'certified-refurbished' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-cyan px-3 py-1 text-xs font-semibold text-white">Certified Refurbished</div>}
                {item.condition == 'like-new-open-box' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-light-cyan px-3 py-1 text-xs font-semibold text-white">New / Open Box</div>}
                {item.condition == 'used-part-a-condition-grade' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade B</div>}
                {item.condition == 'used-part-b-condition-grade' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade B</div>}
                {item.condition == 'used-part-c-condition-grade' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade C</div>}
                {item.condition == 'used-part-d-condition-grade' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade D</div>}
                <span className="text-sm text-black">
                  <strong>{item.quantity}</strong> buying options
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 sm:col-span-2">
                <div className="w-32 rounded-lg bg-gray-200 sm:w-full xs:w-40">
                  <span className="flex h-2 w-2/4 rounded-lg bg-gradient-to-r from-b4 to-b7"></span>
                </div>
                <div className="flex w-fit items-center justify-center gap-1 whitespace-nowrap rounded-full bg-b4 px-3 py-1 text-xs font-semibold text-b18 [&>svg]:h-3 maxsm:[&>svg]:w-3">
                  <GasSvg /> {item.perc}% Off
                </div>
              </div>
              <div className="text-right text-lg font-bold text-b3">${item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyingHero;
