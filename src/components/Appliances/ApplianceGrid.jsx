import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import Tag from '@/components/svgs/Tag';
import ProductCard from '@/components/Product/ProductCard';

const ApplianceGrid = ({ isGrid, product }) => {
  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-lg text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="mt-2 flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  return (
    <>
      {isGrid ? (
        <ProductCard product={product} />
      ) : (
        <Link className="flex w-full cursor-pointer items-center space-x-2 rounded-2xl border-[1px] border-gray-200 px-2 py-5 lg:space-x-10 lg:px-8 lg:py-10" href={`/product/${product.slug}`}>
          <div className="relative w-44 coxs:w-52">
            <Image width={400} height={400} quality={100} src="/popular-parts.webp" alt="Product Feature Image" className="h-60 w-60 object-contain" />
          </div>

          <div className="flex w-[60%] flex-col gap-3 px-1 lg:px-5 3xl:w-[55%]">
            <button type="button" className="flex items-center gap-2 text-b3">
              <FaRegHeart /> Add to favorites
            </button>
            <h3 className="line-clamp-2 text-sm font-semibold lg:text-lg 3xl:text-xl">{product.title}</h3>

            <div className="flex gap-1 sm:items-center coxs:gap-2 maxcosm:flex-col">
              <span className="w-[87.1px] text-sm font-semibold leading-4 text-b1">
                Part <br /> Number
              </span>
              <Tag />
              <div className="inline-flex rounded-full border border-black px-3 py-1 text-xs font-medium text-b1">WTWX2342</div>
            </div>
            <div className="flex gap-1 sm:items-center coxs:gap-2 maxcosm:flex-col">
              <span className="text-sm font-semibold text-b1">Price Range</span>
              <Tag />
              <div className="inline-flex rounded-full bg-b3 px-3 py-1 text-xs font-medium text-white">
                ${product.salePrice} - ${product.regPrice}
              </div>
            </div>
            <button type="button" className="flex items-center font-semibold text-b3 underline">
              15 Buying Options →
            </button>
          </div>
        </Link>
      )}
    </>
  );
};

export default ApplianceGrid;
