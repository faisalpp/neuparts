'use client';
import FourStar from '@/components/svgs/FourStar';
import React, { useState } from 'react';
import { BsGrid } from 'react-icons/bs';
import { FaBars, FaRegHeart } from 'react-icons/fa';
import FilterSvg from '@/components/svgs/FilterSvg';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import Tag from '@/components/svgs/Tag';
import ToolTip from '@/components/ToolTip';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const BuyingOptions = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [products, setProducts] = useState([
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      condtition: 'new',
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      condition: 'new-open-box',
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      condition: 'used-grade-a',
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      condition: 'used-grade-b',
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      condition: 'used-grade-c',
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      condition: 'used-grade-d',
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
  ]);

  const modalClass = isFilter ? 'maxlg:flex maxlg:top-[67px] maxlg:bottom-0' : 'maxlg:-bottom-[420px] maxlg:opacity-0 maxlg:pointer-events-none';

  return (
    <>
      {/* FIlter */}
      <div className="mb-10">
        <div className="mt-5 flex items-center justify-between py-5">
          <h2 className="text-2xl font-bold text-black">Buying Options</h2>
          {/* Grid */}
          <div className="flex items-center justify-end gap-5 text-b1/65">
            <BsGrid className={`cursor-pointer ${isGrid && 'text-b3'}`} onClick={() => setIsGrid(true)} />
            <FaBars className={`cursor-pointer ${!isGrid && 'text-b3'}`} onClick={() => setIsGrid(false)} />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <h3 className="text-black">Filter by Cosmetic Ratings</h3>
          <div className={`z-40 duration-200`}>
            <div className="flex h-auto w-full flex-wrap items-center gap-3 bg-white lg:gap-2.5">
              <button className="rounded-full border border-b33 px-4 py-3 text-xs font-semibold duration-200 maxmd:w-full">Show All</button>
              <button className="inline-flex items-center justify-center gap-1 rounded-full border border-dark-blue bg-dark-blue px-4 py-3 text-xs font-semibold text-white duration-200 hover:bg-transparent hover:text-dark-blue">
                <FourStar />
                New
              </button>
              <button className="rounded-full border border-dark-light-cyan bg-dark-light-cyan px-4 py-3 text-xs font-semibold text-white duration-200 hover:bg-transparent hover:text-dark-light-cyan">Like New / Open Box</button>
              <button className="rounded-full border border-c-orange bg-c-orange px-4 py-3 text-xs font-semibold text-white duration-200 hover:bg-transparent hover:text-c-orange">Used • Grade A</button>
              <button className="rounded-full border border-c-orange bg-c-orange px-4 py-3 text-xs font-semibold text-white duration-200 hover:bg-transparent hover:text-c-orange">Used • Grade C</button>
              <button className="rounded-full border border-c-orange bg-c-orange px-4 py-3 text-xs font-semibold text-white duration-200 hover:bg-transparent hover:text-c-orange">Used • Grade D</button>
            </div>
          </div>
        </div>
      </div>

      {/* Buying Cards */}
      <div className={`grid ${isGrid ? 'grid-cols-2 gap-2 md:gap-4 xl:grid-cols-3' : 'grid-cols-1 gap-4'} mb-10 w-full`}>
        {products.map((item, index) => (
          <BuyingCards product={item} isGrid={isGrid} key={index} />
        ))}
      </div>
    </>
  );
};

export default BuyingOptions;

export const BuyingCards = ({ isGrid, product }) => {
  return (
    <div className={`group relative flex ${isGrid ? 'flex-col' : ''} overflow-hidden rounded-2xl border-2 border-gray-100 bg-white`}>
      <span className={`absolute ${isGrid ? '' : 'hidden'} right-0 top-0 z-20 mr-1 mt-2 rounded-2xl bg-b4 px-1.5 py-0.5 text-xs font-bold sm:px-4 maxsm:text-[9.32px]`}>{(100 - (product?.salePrice / product?.regPrice) * 100).toFixed(0)}% Off</span>
      <div className={`relative flex ${isGrid ? '' : 'items-center xl:min-w-[300px]'} justify-center px-3 pt-4 lg:px-5 xl:px-5`}>
        {/* Product Image */}
        <Image src={product?.image ? product?.image : '/popular-parts.webp'} width={400} height={400} quality={100} className={`xl:w-54 w-full object-contain sm:h-32 md:h-60 lg:w-52 ${isGrid ? 'h-32 maxsm:p-3' : 'h-20 sm:h-32'}`} alt="refrigrator" />
        <div className={`pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex scale-0 items-center justify-center bg-b3/50 opacity-0 duration-300 ${isGrid ? '' : 'hidden'} group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100`}>
          <Link href={`/product/${product?.slug}`} className="rounded-lg bg-white px-1 py-2 font-semibold text-black duration-300 sm:px-5 maxsm:text-xs">
            View Details
          </Link>
        </div>
      </div>
      <div className={`flex w-full flex-col gap-y-2 px-2.5 py-3 sm:gap-y-3 lg:p-5 xl:p-6 xs:p-3`}>
        <Link href={`/product/${product?.slug}`}>
          <h3 className="line-clamp-2 font-reg text-[11px] font-semibold sm:text-sm xl:text-base xs:text-xs">{product?.title}</h3>
        </Link>
        <div className="flex maxsm:hidden">
          <h4 className="font-semibold text-b3">${product?.isSale ? product?.salePrice : product?.regPrice}</h4>
          {product?.isSale ? (
            <div className="flex w-full items-center justify-end space-x-2">
              <strike className="text-[rgba(17,16,16,0.64)]">${product?.regPrice}</strike>
              <span className="rounded-xl bg-b4 px-2 py-1 text-xs font-semibold">{(100 - (product?.salePrice / product?.regPrice) * 100).toFixed(0)}%</span>
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 maxsm:hidden">
          <div className="flex items-center gap-1">
            <h4 className="w-[44px] text-[9px] font-semibold text-b18 sm:w-[75px] sm:text-sm xs:w-[60px] xs:text-xs">Quantity</h4>
            <AiOutlineShoppingCart className="text-lg text-b18" />
          </div>
          <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full border border-b18/50 px-4 py-1 text-xs font-semibold text-black">1</div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1">
            <h4 className="w-[44px] text-[9px] font-semibold text-b18 sm:w-[75px] sm:text-sm xs:w-[60px] xs:text-10px xs:text-xs">Condition</h4>
            <ToolTip dimension="maxsm:w-4 maxsm:h-4" color="text-b18" />
          </div>
          <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-2 py-1 text-[8px] font-semibold text-white xs:px-3 xs:text-xs">
            <FourStar />
            New
          </div>
          {/* <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-cyan px-2 xs:px-3 py-1 text-[8px] xs:text-xs font-semibold text-white">Certified Refurbished</div> */}
          {/* <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-light-cyan px-2 xs:px-3 py-1 text-[8px] xs:text-xs font-semibold text-white">New / Open Box</div> */}
          {/* <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-2 xs:px-3 py-1 text-[8px] xs:text-xs font-semibold text-white">Used • Grade B</div> */}
          {/* <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-2 xs:px-3 py-1 text-[8px] xs:text-xs font-semibold text-white">Used • Grade C</div> */}
          {/* <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-2 xs:px-3 py-1 text-[8px] xs:text-xs font-semibold text-white">Used • Grade D</div> */}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 text-[9px] font-semibold text-b18 sm:text-sm xs:text-10px xs:text-xs">
            <h4 className="w-[44px] sm:w-[75px] xs:w-[60px]">Discount</h4>
            <span className="maxcosm:text-sm">%</span>
          </div>
          <div className="w-full rounded-lg bg-gray-200 md:w-52 maxmd:max-w-52">
            <span className="flex h-2 w-1/3 rounded-lg bg-gradient-to-r from-b4 to-b7 xs:h-2.5"></span>
          </div>
        </div>
        <Link href={`/product/${product?.slug}`} className="flex w-full items-center justify-center rounded-lg bg-b3 px-2 py-2 text-xs font-semibold text-white duration-300 sm:py-3">
          View Appliance <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};
