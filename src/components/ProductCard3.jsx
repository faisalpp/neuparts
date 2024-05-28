import React from 'react';
import { AiOutlineQuestionCircle, AiFillStar } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import Tag from '@/components/svgs/Tag';

const ProductCard3 = ({ isGrid, product }) => {
  return (
    <>
      {isGrid ? (
        <Link href={`/product/${product.slug}`} className="grid place-items-center rounded-2xl border border-b16/10 p-2.5 md:p-4 2xl:p-5">
          <div className="relative">
            <Image width={400} height={400} quality={100} src={product.image} alt="Product Feature Image" className={`mx-auto h-32 w-full object-contain md:h-[220px] 2xl:w-2/3 maxmd:p-4`} />
          </div>
          <div className="w-full space-y-3">
            <button type="button" className="flex items-center gap-2 text-b3 maxmd:text-xs">
              <FaRegHeart /> Add to favorites
            </button>
            <h3 className="text-xs font-semibold md:text-sm lg:text-lg 3xl:text-xl">{product.title}</h3>

            <div className="flex flex-wrap gap-1 sm:items-center coxs:gap-2">
              <span className="flex gap-1 text-10px text-b1 md:text-sm coxs:gap-2 maxmd:font-semibold [&>svg]:maxcosm:h-3.5 [&>svg]:maxcosm:w-3.5 [&>svg]:maxsm:h-4 [&>svg]:maxsm:w-4">
                Price Range
                <Tag />
              </span>
              <div className="inline-flex w-fit rounded-full bg-b3 px-1.5 py-1 text-10px font-medium text-white sm:px-3 md:text-xs">
                ${product.salePrice} - ${product.regPrice}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1 coxs:gap-2">
              <span className="flex items-center gap-1 text-10px text-b1 md:text-sm coxs:gap-2 maxmd:font-semibold">
                Discount <br /> Range
                <span className="text-base">%</span>
              </span>
              <div className="inline-flex w-fit rounded-full bg-b3 px-1.5 py-1 text-10px font-medium text-white sm:px-3 md:text-xs">10%-70%</div>
            </div>
            <button type="button" className="flex items-center font-semibold text-b3 underline maxsm:text-10px">
              15 Buying Options →
            </button>
          </div>
        </Link>
      ) : (
        <Link className="flex w-full cursor-pointer items-center space-x-2 rounded-2xl border border-b16/10 px-2 py-5 lg:space-x-10 lg:px-8 lg:py-10" href={`/product/${product.slug}`}>
          <Image width={400} height={400} quality={100} src="/popular-parts.webp" alt="Product Feature Image" className="h-auto w-[124px] object-contain md:h-60 md:w-60 md:p-4 maxxs:w-[80px]" />

          <div className="flex w-full flex-col gap-2 px-1 sm:gap-3 md:w-[60%] lg:px-5 3xl:w-[55%]">
            <button type="button" className="flex items-center gap-2 text-b3 maxsm:text-xs">
              <FaRegHeart /> Add to favorites
            </button>
            <h3 className="text-sm font-semibold lg:text-lg 3xl:text-xl">{product.title}</h3>

            <div className="flex flex-wrap items-center gap-1 coxs:gap-2">
              <span className="flex gap-1 text-10px text-b1 sm:text-sm coxs:gap-2 maxmd:font-semibold">
                <span className="maxmd:w-16">Price Range</span>
                <Tag />
              </span>
              <div className="inline-flex w-fit rounded-full bg-b3 px-3 py-1 text-10px font-medium text-white sm:text-xs">
                ${product.salePrice} - ${product.regPrice}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1 coxs:gap-2">
              <span className="flex items-center gap-1 text-10px text-b1 sm:text-sm coxs:gap-2 maxmd:font-semibold">
                <span className="maxmd:w-16">
                  Discount <br /> Range
                </span>
                <span className="text-base">%</span>
              </span>
              <div className="inline-flex w-fit rounded-full bg-b3 px-3 py-1 text-10px font-medium text-white sm:text-xs">10%-70%</div>
            </div>
            <Link href="/" className="flex items-center font-semibold text-b3 underline maxsm:text-sm">
              15 Buying Options →
            </Link>
          </div>
        </Link>
      )}
    </>
  );
};

export default ProductCard3;
