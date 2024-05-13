import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import ToolTip from '../../ToolTip';
import Image from 'next/image';

const LaundryWasherCard = ({ data }) => {
  const ID = '';

  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-lg text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="mt-2 flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  return (
    <div className="grid grid-cols-1 gap-5 rounded-xl border border-b14 px-5 py-10 sm:grid-cols-[150px_1fr] md:grid-cols-[240px_1fr] xl:grid-cols-[200px_1fr] xl:gap-0 xl:px-2">
      <div className="w-fit">
        <Image width={400} height={400} quality={100} src={data.media.find((item) => item.file === 'image')?.data} className="h-40 w-40 object-contain sm:h-full sm:w-full md:h-60 md:w-60 xl:w-48" alt="" />
      </div>
      <div className="space-y-4">
        <h3 className="line-clamp-2 text-lg font-semibold leading-6 md:text-xl xl:text-sm">{data.title}</h3>
        <div className="flex items-center gap-6">
          <span className="text-xl font-semibold text-b3">${data.isSale ? data.salePrice : data.regPrice}</span>
          {data.isSale ? (
            <div className="flex flex-wrap items-center gap-2">
              <strike className="text-b23">${data.regPrice}</strike>
              <span className="flex rounded-full bg-b4 px-2 py-1 text-xs font-semibold text-b16">-{(100 - (data.salePrice / data.regPrice) * 100).toFixed(0)}%</span>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <h4 className="w-max text-xs font-semibold text-b15 lg:text-sm">Cosmetic&nbsp;Rating</h4>
            <ToolTip color="text-b15/80" />
          </div>
          <div className="flex items-center">
            <StarIconPrinter numberOfTimes={data.rating} />
          </div>
        </div>
        <div className="hidden items-center lg:flex  xl:gap-x-10 2xl:gap-x-14">
          <div className="flex text-sm font-semibold text-b15">
            <h4>Discount</h4>&nbsp;%
          </div>
          <div className="w-full rounded-lg bg-gray-100">
            <span className="flex h-2 w-32 rounded-lg bg-gradient-to-r from-b4 to-b7"></span>
          </div>
        </div>
        <button
          onClick={() => {
            ID === data._id ? dispatch(resetWasher()) : dispatch(setWasher({ id: data._id, title: data.title, isSale: data.isSale, salePrice: data.salePrice, regPrice: data.regPrice, rating: data.rating, bulletDescription: data.bulletDescription, brand: data.brand, tags: data.tags, media: data.media.find((item) => item.file === 'image')?.data }));
          }}
          type="button"
          className={` ${ID === data._id ? 'border-2 border-b7 bg-white text-black' : 'bg-b7 text-white'} flex w-full items-center justify-center gap-1 rounded-lg px-4 py-3  text-center text-xs font-bold`}
        >
          Select Item
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default LaundryWasherCard;
