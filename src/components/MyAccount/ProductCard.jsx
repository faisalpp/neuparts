'use client';
import React, { useState } from 'react';
import { AiFillStar, AiOutlineLoading } from 'react-icons/ai';
import { VscLoading } from 'react-icons/vsc';
import ToolTip from '@/components/ToolTip';
import { IoCloseSharp } from 'react-icons/io5';
import Image from 'next/image';

const ProductCard = ({ data, reload }) => {
  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-lg text-b7" /> // Render the star icon component for each iteration
    ));
    return <div className="flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  const [favLoad, setFavLoad] = useState(false);
  const product = JSON.parse(data.product);
  const userId = '';
  const removeFavorite = async (e) => {
    e.preventDefault();
    // if (!userId) {
    //   Toast('Login Required!', 'error', 1000);
    // } else {
    //   setFavLoad(true);
    //   const res = await RemoveFromFavorite({ pid: data.pid, userId: userId });
    //   if (res.status === 200) {
    //     setFavLoad(false);
    //     reload();
    //     Toast(res.data.msg, 'success', 1000);
    //   } else {
    //     setFavLoad(false);
    //     Toast(res.data.message, 'error', 1000);
    //   }
    // }
  };

  return (
    <>
      <div className={`relative flex flex-col overflow-hidden rounded-2xl border border-b14 bg-white maxmd:mx-auto maxmd:max-w-[267px]`}>
        <span className="absolute right-0 top-0 z-20 mr-1 mt-2 rounded-2xl bg-b4 px-4 py-2 text-xs font-bold">{(100 - (product.salePrice / product.regPrice) * 100).toFixed(0)}% Off</span>
        <div className="flex w-full justify-center px-3 pt-10 lg:px-5 xl:px-5">
          <Image width={400} height={400} src="/p1.webp" className=" xl:w-54 h-auto w-[160px] lg:w-52" alt="refrigrator" />
        </div>
        {/* Remove Item */}
        <button type="button" onClick={(e) => removeFavorite(e)} className="absolute left-4 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-b3 md:h-8 md:w-8">
          {favLoad ? <VscLoading className="animate-spin text-xl text-white" /> : <IoCloseSharp className="text-lg text-white md:text-xl" />}
        </button>

        <div className="mx-5 my-5 flex flex-col gap-y-3 xl:mx-[37.41px]">
          <p className="text-line-camp font-reg text-sm font-semibold !leading-5 xl:text-base">{product.title}</p>
          <div className="flex">
            <span className="font-semibold text-b3">${product.isSale ? product.salePrice : product.regPrice}</span>
            {product.isSale ? (
              <div className="flex w-full items-center justify-end space-x-2">
                <strike className="text-[rgba(17,16,16,0.64)] maxmd:text-sm">${product.regPrice}</strike>
                <span className="rounded-xl bg-b4 px-2 py-1 text-[10px] font-semibold md:text-xs">- {(100 - (product.salePrice / product.regPrice) * 100).toFixed(0)}%</span>
              </div>
            ) : null}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1">
              <h4 className="text-xs font-semibold text-b15 md:text-sm">Cosmetic Rating</h4>
              <ToolTip color="text-b3" />
            </div>
            <div className="flex items-center">
              <StarIconPrinter numberOfTimes={product.rating} />{' '}
            </div>
          </div>
          <div className="flex items-center space-x-10">
            <div className="flex text-xs font-semibold text-b15 md:text-sm">
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

export default ProductCard;
