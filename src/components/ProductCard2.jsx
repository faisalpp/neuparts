import React from 'react';
import ToolTip from './ToolTip';
import Link from 'next/link';
import Image from 'next/image';
import FourStar from './svgs/FourStar';

const ProductCard2 = ({ sliderstyle, stars, product }) => {
  return (
    <>
      <div className={`group relative flex flex-col rounded-2xl border-2 border-gray-100 bg-white ${sliderstyle ? sliderstyle : 'sm:mx-2'} overflow-hidden`}>
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
          <p className="text-line-camp font-reg text-sm font-semibold xl:text-base">{product?.title}</p>
          <div className="flex">
            <Link href={`/product/${product?.slug}`}>
              <h4 className="font-semibold text-b3">${product?.isSale ? product?.salePrice : product?.regPrice}</h4>
            </Link>
            {product?.isSale ? (
              <div className="flex w-full items-center justify-end space-x-2">
                <strike className="text-[rgba(17,16,16,0.64)]">${product?.regPrice}</strike>
                <span className="rounded-xl bg-b4 px-2 py-1 text-xs font-semibold">{(100 - (product?.salePrice / product?.regPrice) * 100).toFixed(0)}%</span>
              </div>
            ) : null}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1">
              <h4 className="text-sm font-semibold text-b15">Condition</h4>
              <ToolTip color="text-b15" />
            </div>
            {product?.condtion == 'new' && (
              <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                <FourStar />
                New
              </div>
            )}
            {product?.condtion == 'certified' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-cyan px-3 py-1 text-xs font-semibold text-white">Certified Refurbished</div>}
            {product?.condtion == 'new-open-box' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-light-cyan px-3 py-1 text-xs font-semibold text-white">New / Open Box</div>}
            {product?.condtion == 'used-grade-a' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade B</div>}
            {product?.condtion == 'used-grade-c' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade C</div>}
            {product?.condtion == 'used-grade-d' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade D</div>}
          </div>
          <div className="flex items-center space-x-10">
            <div className="flex text-sm font-semibold text-b15">
              <h4>Discount</h4>&nbsp;%
            </div>
            <div className="grow rounded-lg bg-gray-100">
              <span className="flex h-2 w-20 rounded-lg bg-gradient-to-r from-b4 to-b7"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard2;
