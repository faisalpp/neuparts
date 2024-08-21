import React from 'react';
import { IoBagCheckOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import FourStar from './svgs/FourStar';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const OtherProductCard = ({ slug, product, condition, handleCondition }) => {
  return (
    <>
      <div className="px-1">
        <div className={`border-gray-300} flex w-full cursor-pointer flex-col rounded-xl border-2 bg-white px-1 py-4 hover:border-2 hover:border-b3 ${product.stock ? '' : 'grayscale'} ${slug === product?.slug ? 'border-b3' : 'border-gray-300'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <h6 className="w-max text-[10px] font-semibold text-gray-500">Condition</h6>
              <QuestionMarkCircleIcon onClick={() => handleCondition(product.condition)} strokeWidth={2} className={`h-5 w-5 cursor-pointer text-b16/50 hover:text-b3`} />
            </div>
            <div>
              {product.stock ? (
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
          <Link href={`/product/${product?.slug}`}>
            {/* Conditions */}
            <div className="mt-0.5">
              <div className={`inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-white ` + condition(product.condition).class}>
                {product.condition == 'new' && <FourStar />}
                {condition(product.condition).title}
              </div>
            </div>
            {/* End */}
            <div className="relative my-3 flex w-full items-center justify-center">
              <Image width={400} height={400} quality={100} src={product.thumbnail} className="h-[135px] w-28 object-contain" alt="product" />
            </div>
            <div className="flex flex-col space-y-3 px-2">
              <div className="flex items-center">
                <h6 className="text-sm font-semibold text-b3">$236</h6>
                {product.is_sale ? (
                  <div className="flex w-full justify-end text-xs text-gray-500">
                    <strike>${product?.sale_price}</strike>
                  </div>
                ) : null}
              </div>
              {product.is_sale ? (
                <>
                  <div className="flex items-center">
                    <h6 className="text-xs font-semibold text-gray-500">Discount&nbsp;%</h6>
                    <div className="flex w-full -translate-y-3 justify-end">
                      <span className="rounded-2xl bg-b4 px-2 py-0.5 text-[9px] font-semibold md:py-1 lg:px-3 lg:text-[8px]">{(((product.regular_price - product.sale_price) / product.regular_price) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full rounded-lg bg-gray-100 maxmd:!mt-1">
                    <span className="flex h-2 rounded-lg bg-gradient-to-r from-b4 to-b7" style={{ width: `${(((product.regular_price - product.sale_price) / product.regular_price) * 100).toFixed(1)}%` }}></span>
                  </div>
                </>
              ) : null}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OtherProductCard;
