'use client';
import FourStar from '@/components/svgs/FourStar';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import GasSvg from '@/components/svgs/GasSvg';

const BuyingHero = ({ data }) => {
  const aggregatedProducts = data.partproducts.reduce((acc, product) => {
    if (!acc[product.condition]) {
      acc[product.condition] = { ...product, count: 1 };
    } else {
      acc[product.condition].count += 1;
      if (product.sale_price < acc[product.condition].sale_price || acc[product.condition].sale_price === undefined) {
        acc[product.condition] = { ...acc[product.condition], ...product };
      }
    }
    return acc;
  }, {});

  const productConditions = Object.keys(aggregatedProducts);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[360px_auto] xl:grid-cols-[530px_auto] ">
      <div className="grid place-items-center">
        <Image width={200} height={200} quality={100} src="/popular-parts.webp" priority={1} alt="Product" className="h-auto w-2/3 object-contain" />
      </div>
      <div>
        <h1 className="mb-6 line-clamp-2 text-2xl font-bold text-b18">{data.product.title}</h1>
        {/* Part No */}
        <div className="mb-10 flex flex-wrap items-center gap-2 rounded-lg border border-b3 px-5 py-4 shadow-[0px_4px_24px_rgba(0,0,0,0.08)]">
          <h3 className="text-base font-semibold text-b16/50 md:text-xl xs:text-lg">Part Number</h3>
          <IoSettingsOutline className="h-4 w-4 text-b16/50 md:h-5 md:w-5" />
          <span className="text-sm font-semibold text-b3 md:text-lg xs:text-base">{data.product.part_number}</span>
        </div>

        {/* Buying Lists */}
        <div className="space-y-2.5">
          {productConditions.length > 0 &&
            productConditions.map((condition, index) => {
              const product = aggregatedProducts[condition];
              return (
                <div className={`grid grid-cols-2 gap-x-2 gap-y-4 rounded-[20px] bg-b3/5 p-4 sm:grid-cols-6 sm:gap-4 md:p-5 ${product.stock ? '' : 'grayscale'}`} key={index}>
                  <div className="col-span-2 flex items-center justify-between gap-2 sm:col-span-3">
                    {product.condition === 'new' && (
                      <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                        <FourStar />
                        New
                      </div>
                    )}
                    {product.condition === 'certified' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-cyan px-3 py-1 text-xs font-semibold text-white">Certified Refurbished</div>}
                    {product.condition === 'new-open-box' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-light-cyan px-3 py-1 text-xs font-semibold text-white">New / Open Box</div>}
                    {['used-grade-a', 'used-grade-b', 'used-grade-c', 'used-grade-d'].includes(product.condition) && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade {product.condition.split('-').pop().toUpperCase()}</div>}
                    <span className="text-sm text-black">
                      <strong>{product.count}</strong> buying options
                    </span>
                  </div>
                  {product.sale_price && (
                    <div className="flex items-center justify-between gap-2 sm:col-span-2">
                      <div className="w-32 rounded-lg bg-gray-200 sm:w-full xs:w-40">
                        <span className="flex h-2 rounded-lg bg-gradient-to-r from-b4 to-b7" style={{ width: `${((product.regular_price - product.sale_price) / product.regular_price) * 100}%` }}></span>
                      </div>
                      <div className="flex w-fit items-center justify-center gap-1 whitespace-nowrap rounded-full bg-b4 px-3 py-1 text-xs font-semibold text-b18 [&>svg]:h-3 maxsm:[&>svg]:w-3">
                        <GasSvg /> {(((product.regular_price - product.sale_price) / product.regular_price) * 100).toFixed(1)}% Off
                      </div>
                    </div>
                  )}
                  <div className="text-right text-lg font-bold text-b3">${product.sale_price ? product.sale_price : product.regular_price}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BuyingHero;
