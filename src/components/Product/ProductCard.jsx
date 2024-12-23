import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Tag from '@/components/svgs/Tag';


const ProductCard = ({ product }) => {
  const [thumbnail,setThumbnail] = useState(product?.thumbnail ? product.thumbnail : '/no-image.webp')
  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 border-gray-100 bg-white`}>
      <span className="absolute right-0 top-0 z-20 mr-1 mt-2 rounded-2xl bg-b4 px-4 py-2 text-xs font-bold">{(100 - (product.sale_price / product.regular_price) * 100).toFixed(0)}% Off</span>
      <div className="relative flex w-full justify-center px-3 pt-10 lg:px-5 xl:px-5">
        <Image onErrorCapture={()=>setThumbnail('/no-image.webp')} src={thumbnail} width={400} height={400} quality={100} className="xl:w-54 h-32 w-full object-contain p-3 md:h-60 lg:w-52" alt="refrigrator" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex scale-0 items-center justify-center bg-b3/50 opacity-0 duration-300 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
          <Link href={`/product/${product.slug}`} className="rounded-lg bg-white px-5 py-2 font-semibold text-black duration-300">
            View Details
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 p-3 lg:p-5 xl:p-6">
        <h3 className="line-clamp-2 font-reg text-sm font-semibold xl:text-base">{product.title}</h3>
        <div className="flex">
          <h4 className="font-semibold text-b3">${product.is_sale ? product.sale_price : product.regular_price}</h4>
          {product.is_sale ? (
            <div className="flex w-full items-center justify-end space-x-2">
              <strike className="text-[rgba(17,16,16,0.64)]">${product?.regular_price}</strike>
              <span className="rounded-xl bg-b4 px-2 py-1 text-xs font-semibold">{(100 - (product.sale_price / product.regular_price) * 100).toFixed(2)}%</span>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-0.5 sm:gap-2 maxxs:flex-wrap [&>svg]:maxsm:h-4 [&>svg]:maxsm:w-4">
          <span className="w-[74px] text-10px font-semibold leading-4 text-b1 sm:w-[87.1px] sm:text-sm">
            Part <br /> Number
          </span>
          <Tag />
          <div className="inline-flex rounded-full border border-black px-3 py-1 text-10px font-medium text-b1 maxcosm:whitespace-nowrap">{product.part_number}</div>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-2 maxxs:flex-wrap [&>svg]:maxsm:h-4 [&>svg]:maxsm:w-4">
          <span className="text-10px font-semibold text-b1 sm:text-sm">Price Range</span>
          <Tag />
          <div className="inline-flex rounded-full bg-b3 px-1 py-1 text-10px font-medium text-white sm:px-3 maxcosm:whitespace-nowrap">
            ${product.sale_price} - ${product.regular_price}
          </div>
        </div>
        <Link href={`/product/${product.slug}/buying-options`} className="flex items-center text-xs font-semibold text-b3 underline">
          {product.partCount} Buying Options →
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
