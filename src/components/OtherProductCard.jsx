import React from 'react';
import { IoBagCheckOutline } from 'react-icons/io5';
import ToolTip from './ToolTip';
import Image from 'next/image';
import Link from 'next/link';
import FourStar from './svgs/FourStar';

const OtherProductCard = ({ slug, product }) => {
  return (
    <>
      <div className="px-1">
        <Link href={`/product/${product?.slug}`} className={`flex w-full flex-col rounded-xl bg-white px-1 py-4 ${product.quantity ? '' : 'grayscale'} ${slug === product?.slug ? 'border-b3' : 'border-gray-300'} border-gray-300} border-2 hover:border-2 hover:border-b3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <h6 className="w-max text-[10px] font-semibold text-gray-500">Condition</h6>
              <ToolTip color="text-b34/30" />
            </div>
            <div>
              {product.quantity ? (
                <span className={`flex w-fit items-center rounded-xl bg-b10 px-3 py-1 text-[8px] text-white`}>
                  <IoBagCheckOutline className="mr-1 text-[10px]" />
                  In&nbsp;Stock
                </span>
              ) : (
                <span className={`flex w-fit items-center rounded-xl bg-b34 px-3 py-1 text-[8px] text-white`}>
                  <IoBagCheckOutline className="mr-1 text-[10px] maxmd:hidden" />
                  <span className="maxmd:hidden">Out&nbsp;of&nbsp;Stock</span>
                  <span className="md:hidden">Sold&nbsp;Out</span>
                </span>
              )}
            </div>
          </div>
          {/* Conditions */}
          <div className="mt-0.5">
            {product.condition == 'new' && (
              <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                <FourStar />
                New
              </div>
            )}
            {product.condition == 'certified' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-cyan px-3 py-1 text-xs font-semibold text-white">Certified Refurbished</div>}
            {product.condition == 'used' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-c-orange px-3 py-1 text-xs font-semibold text-white">Used • Grade A</div>}
            {product.condition == 'new-open-box' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-light-cyan px-3 py-1 text-xs font-semibold text-white">New / Open Box</div>}
          </div>
          {/* End */}
          <div className="relative my-3 flex w-full items-center justify-center">
            <Image width={400} height={400} quality={100} src="/popular-parts.webp" className="h-[135px] w-28 object-contain" alt="product" />
          </div>
          <div className="flex flex-col space-y-3 px-2">
            <div className="flex items-center">
              <h6 className="text-sm font-semibold text-b3">$236</h6>
              {product?.isSale ? (
                <div className="flex w-full justify-end text-xs text-gray-500">
                  <strike>${product?.regPrice}</strike>
                </div>
              ) : null}
            </div>
            <div className="flex items-center">
              <h6 className="text-xs font-semibold text-gray-500">Discount&nbsp;%</h6>
              <div className="flex w-full -translate-y-3 justify-end">
                <span className={`rounded-2xl bg-b4 px-2 py-0.5 text-[9px] font-semibold md:py-1 lg:px-3 lg:text-[8px]`}>-20%</span>
              </div>
            </div>
            <div className="w-full rounded-lg bg-gray-100 maxmd:!mt-1">
              <span className={`flex h-2 w-10 rounded-lg bg-gradient-to-r from-b4 to-b7`}></span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default OtherProductCard;
