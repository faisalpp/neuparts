import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import Tag from '@/components/svgs/Tag';
import ProductCard from '@/components/Product/ProductCard';

const ApplianceGrid = ({ isGrid, product }) => {
  return (
    <>
      {isGrid ? (
        <ProductCard product={product} />
      ) : (
        <Link className="flex w-full cursor-pointer items-center space-x-2 rounded-2xl border-[1px] border-gray-200 px-2 py-5 lg:space-x-10 lg:px-8 lg:py-10" href={`/product/${product.slug}`}>
          {/* <div className="relative w-44 coxs:w-52"> */}
          <Image width={400} height={400} quality={100} src={product.thumbnail} alt={product.title} className="h-auto w-[124px] object-contain md:h-60 md:w-60 md:p-4 maxxs:w-[80px]" />
          {/* </div> */}

          <div className="flex w-[60%] flex-col gap-3 px-1 lg:px-5 3xl:w-[55%]">
            <button type="button" className="flex items-center gap-2 text-b3">
              <FaRegHeart /> Add to favorites
            </button>
            <h3 className="line-clamp-2 text-sm font-semibold lg:text-lg 3xl:text-xl">{product.title}</h3>

            <div className="flex items-center gap-1 coxs:gap-2 maxxs:flex-wrap">
              <span className="w-[74px] text-xs font-semibold leading-4 text-b1 sm:w-[87.1px] sm:text-sm">
                Part <br /> Number
              </span>
              <Tag />
              <div className="inline-flex rounded-full border border-black px-3 py-1 text-xs font-medium text-b1">{product.part_number}</div>
            </div>
            <div className="flex items-center gap-1 coxs:gap-2 maxxs:flex-wrap">
              <span className="text-xs font-semibold text-b1 sm:text-sm">Price Range</span>
              <Tag />
              <div className="inline-flex rounded-full bg-b3 px-1 py-1 text-xs font-medium text-white sm:px-3">
                ${product.sale_price} - ${product.regular_price}
              </div>
            </div>
            <Link href={`/product/${product.slug}/buying-options`} className="flex items-center font-semibold text-b3 underline maxsm:text-sm">
              15 Buying Options →
            </Link>
          </div>
        </Link>
      )}
    </>
  );
};

export default ApplianceGrid;
