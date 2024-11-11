'use client';
import FourStar from '@/components/svgs/FourStar';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import GasSvg from '@/components/svgs/GasSvg';

const BuyingHero = ({ data }) => {
  const conditions = [
    {
      title: 'New',
      slug: 'new',
      class: 'bg-dark-light-cyan',
    },
    {
      title: 'Like New / Open Box',
      slug: 'like-new-open-box',
      class: 'bg-dark-light-cyan',
    },
    {
      title: 'Certified Refurbished',
      slug: 'certified-refurbished',
      class: 'bg-dark-cyan',
    },
    {
      title: 'Used • Grade A',
      slug: 'used-part-a-condition-grade',
      class: 'bg-[#FF9A3E]',
    },
    {
      title: 'Used • Grade B',
      slug: 'used-part-b-condition-grade',
      class: 'bg-[#FF9A3E]',
    },
    {
      title: 'Used • Grade C',
      slug: 'used-part-c-condition-grade',
      class: 'bg-[#FF9A3E]',
    },
    {
      title: 'Used • Grade D',
      slug: 'used-part-d-condition-grade',
      class: 'bg-[#FF9A3E]',
    },
  ];

  const conditionData = (cond) => {
    return conditions.find((item) => item.slug === cond);
  };

  // Aggregate products by condition and check for existence
  const aggregatedProducts = conditions.reduce((acc, condition) => {
    const matchingProducts = data.partproducts?.filter((product) => product.condition === condition.slug);

    if (matchingProducts?.length > 0) {
      const productWithMaxStock = matchingProducts.reduce((maxProduct, currentProduct) => (currentProduct.stock > maxProduct.stock ? currentProduct : maxProduct), matchingProducts[0]);

      acc[condition.slug] = { ...productWithMaxStock, count: matchingProducts.length };
    } else {
      acc[condition.slug] = {
        ...data.product,
        condition: condition.slug,
        stock: 0,
        count: 0,
      };
    }

    return acc;
  }, {});

  const productConditions = Object.keys(aggregatedProducts);

  const [thumbnail,setThumbnail] = useState(data.product?.thumbnail ? data.product.thumbnail : '/no-image.webp')

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[360px_auto] xl:grid-cols-[530px_auto] ">
      <div className="grid place-items-center">
        <Image width={200} height={200} quality={100} onErrorCapture={()=>setThumbnail('/no-image.webp')} src={thumbnail} priority={1} alt="Product" className="h-auto w-2/3 object-contain" />
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
                <div className={`grid grid-cols-2 gap-x-2 gap-y-4 rounded-[20px] bg-b3/5 p-4 sm:grid-cols-6 sm:gap-4 md:p-5 ${product.stock ? '' : 'pointer-events-none select-none grayscale'}`} key={index}>
                  <div className="col-span-2 flex items-center justify-between gap-2 sm:col-span-3">
                    <div className={`inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-white ` + conditionData(product.condition).class}>
                      {product.condition === 'new' && <FourStar />}
                      {conditionData(product.condition).title}
                    </div>
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
                        <GasSvg /> {(((product.regular_price - product.sale_price) / product.regular_price) * 100).toFixed(2)}% Off
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
