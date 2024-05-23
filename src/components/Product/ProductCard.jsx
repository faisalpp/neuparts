import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Tag from '@/components/svgs/Tag';

const ProductCard = ({ product }) => {
  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 border-gray-100 bg-white`}>
      <span className="absolute right-0 top-0 z-20 mr-1 mt-2 rounded-2xl bg-b4 px-4 py-2 text-xs font-bold">{(100 - (product?.salePrice / product?.regPrice) * 100).toFixed(0)}% Off</span>
      <div className="relative flex w-full justify-center px-3 pt-10 lg:px-5 xl:px-5">
        <Image src={product?.image ? product?.image : '/popular-parts.webp'} width={400} height={400} quality={100} className=" xl:w-54 h-60 w-[160px] object-contain lg:w-52" alt="refrigrator" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex scale-0 items-center justify-center bg-b3/50 opacity-0 duration-300 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
          <Link href={`/product/${product?.slug}`} className="rounded-lg bg-white px-5 py-2 font-semibold text-black duration-300">
            View Details
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 p-3 lg:p-5 xl:p-6">
        <p className="line-clamp-2 font-reg text-sm font-semibold xl:text-base">{product?.title}</p>
        <div className="flex">
          <h4 className="font-semibold text-b3">${product?.isSale ? product?.salePrice : product?.regPrice}</h4>
          {product?.isSale ? (
            <div className="flex w-full items-center justify-end space-x-2">
              <strike className="text-[rgba(17,16,16,0.64)]">${product?.regPrice}</strike>
              <span className="rounded-xl bg-b4 px-2 py-1 text-xs font-semibold">{(100 - (product?.salePrice / product?.regPrice) * 100).toFixed(0)}%</span>
            </div>
          ) : null}
        </div>
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
        <button type="button" className="flex items-center text-xs font-semibold text-b3 underline">
          15 Buying Options →
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
