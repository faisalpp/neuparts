import React from 'react';
import { AiFillStar, AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoBagCheckOutline } from 'react-icons/io5';
import ToolTip from './ToolTip';
import { Link, useParams } from 'react-router-dom';

const OtherProductCard = ({ rating, disabled, disabledImg, product }) => {
  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar className="text-base" /> // Render the star icon component for each iteration
    ));

    return starIcons; // Render the array of star icons
  };

  const firstImg = product?.media?.find((item) => item.file === 'image');
  const { slug } = useParams();

  return (
    <>
      {product ? (
        <div className={`flex w-full flex-col rounded-lg bg-white px-1 py-4 ${slug === product?.slug ? 'border-b6 shadow-[0px_4px_30px_rgba(0,0,0,0.25)]' : 'border-gray-300'} border-gray-300} border-2 hover:border-2 hover:border-b3 hover:shadow-[0px_4px_30px_rgba(0,0,0,0.25)]`}>
          <Link href={`/product/${product?.slug}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                <h6 className="w-max text-[10px] font-semibold text-gray-500">Cosmetic&nbsp;Rating</h6>
                {disabled === 'true' ? <ToolTip color="text-b34/30" /> : <ToolTip />}
              </div>
              <div>
                <span className={`flex w-fit items-center rounded-xl bg-b10 px-3 py-1 text-[8px] text-white`}>
                  <IoBagCheckOutline className="mr-1 text-[10px]" />
                  In&nbsp;Stock
                </span>
              </div>
            </div>
            <div className="flex w-fit items-center rounded-xl bg-white px-2 py-1 text-xs text-b7">
              <StarIconPrinter numberOfTimes={product?.rating} />
            </div>
            <div className="relative my-3 flex w-full items-center justify-center">
              <img src={firstImg?.data} className="h-[135px] w-28" alt="product" />
            </div>
            <div className="flex flex-col space-y-3 px-2">
              <div className="flex items-center">
                <h6 className="text-sm font-semibold text-b3">${product?.isSale ? product?.salePrice : product?.regPrice}</h6>
                {product?.isSale ? (
                  <div className="flex w-full justify-end text-xs text-gray-500">
                    <strike>${product?.regPrice}</strike>
                  </div>
                ) : null}
              </div>
              <div className="flex items-center">
                <h6 className="text-xs font-semibold text-gray-500">Discount&nbsp;%</h6>
                <div className="flex w-full justify-end">
                  <span className={`${disabled === 'true' ? 'bg-b34/30' : 'bg-b4'} rounded-2xl px-1 py-1 text-[9px] font-semibold lg:px-3 lg:text-[8px]`}>-{(100 - (product?.salePrice / product?.regPrice) * 100).toFixed(0)}%</span>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div className="w-10/12 rounded-lg bg-gray-100">
                  <span className={`flex rounded-lg bg-gradient-to-r ${disabled === 'true' ? 'from-b34/30 to-b34/10' : 'from-b4 to-b7'} h-2 w-10`}></span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className={`border-gray-300} flex w-full cursor-pointer flex-col rounded-lg border-2 bg-white px-1 py-4 hover:border-2 hover:border-b3 hover:shadow-[0px_4px_30px_rgba(0,0,0,0.25)]`}>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                <h6 className="w-max text-[10px] font-semibold text-gray-500">Cosmetic&nbsp;Rating</h6>
                {disabled === 'true' ? <ToolTip color="text-b34/30" /> : <ToolTip />}
              </div>
              <div>
                <span className={`flex w-fit items-center ${disabled === 'true' ? 'bg-b34' : 'bg-b10'} rounded-xl px-3 py-1 text-[8px] text-white`}>Out&nbsp;of&nbsp;Stock</span>
              </div>
            </div>
            <div className={`flex items-center ${disabled === 'true' ? 'text-b34/30' : 'text-b7'} w-fit rounded-xl bg-white px-2 py-1 text-xs ${rating === 5 ? 'bg-gray-300' : ''}`}>
              <StarIconPrinter numberOfTimes={rating} />
            </div>
            <div className="relative my-3 flex w-full items-center justify-center">
              {disabled === 'true' ? <div className="absolute z-20 flex h-full w-28 bg-white/50"></div> : null}
              <img src={disabledImg?.data} className="h-[135px] w-28" alt="product" />
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <h6 className={`text-sm font-semibold ${disabled === 'true' ? 'text-b34' : 'text-b3'} `}>$279.00</h6>
                <div className="flex w-full justify-end text-xs text-gray-500">
                  <strike>$379.00</strike>
                </div>
              </div>
              <div className="flex items-center">
                <h6 className="text-xs font-semibold text-gray-500">Discount&nbsp;%</h6>
                <div className="flex w-full justify-end">
                  <span className={`${disabled === 'true' ? 'bg-b34/30' : 'bg-b4'} rounded-2xl px-1 py-1 text-[9px] font-semibold lg:px-3 lg:text-[8px]`}>-27%</span>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div className="w-10/12 rounded-lg bg-gray-100">
                  <span className={`flex rounded-lg bg-gradient-to-r ${disabled === 'true' ? 'from-b34/30 to-b34/10' : 'from-b4 to-b7'} h-2 w-10`}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OtherProductCard;
