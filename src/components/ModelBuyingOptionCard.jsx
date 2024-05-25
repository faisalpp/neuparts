import React from 'react';
import { AiFillStar, AiOutlineCheckCircle, AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';

const ModelBuyingOptionCard = ({ slug, image, bestValue, cosmaticcondition, rating, price, modelNo, itemId, slugg }) => {
  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-2xl text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  const img = image?.find((item) => item.file === 'image');
  return (
    <>
      <div className={`flex w-full flex-col items-center space-y-5 px-6 pb-4 pt-12 ${slug === slugg ? 'bg-b3/10' : null} border  border-b8`}>
        <div className="flex w-full justify-center text-white">{bestValue}</div>
        <div className="flex w-full justify-center bg-white py-8">
          <Image width={400} height={400} quality={100} src={img?.data} className="h-auto w-52" alt="p1" />
        </div>
        <div className="flex flex-col items-center justify-center gap-7 pt-8 text-center">
          <div className="flex items-center">
            <StarIconPrinter numberOfTimes={rating} />
          </div>
          <h5 className="text-sm font-semibold text-[#111010] xl:text-base">${price}</h5>
          <h5 className="text-sm font-normal text-[#111010] xl:text-base">{modelNo}</h5>
          <h5 className="text-sm font-bold text-[#111010] xl:text-base"> #{itemId}</h5>
          <h5 className="text-sm font-normal text-[#111010] xl:text-base"> {cosmaticcondition}</h5>
          <h5 className="flex items-center text-sm font-normal text-[#111010] xl:text-base">
            <AiOutlineCheckCircle className="mr-1 text-b12" /> 100%
          </h5>
          <h5 className="flex items-center text-sm font-normal text-[#111010] xl:text-base">
            <AiOutlineCheckCircle className="mr-1 text-b12" /> Passed
          </h5>
          <h5 className="flex items-center text-sm font-normal text-[#111010] xl:text-base"> 1 Year Warranty</h5>
          <h5 className="flex items-center text-sm font-normal text-[#111010] xl:text-base">Open Box / Scratch & Dent</h5>
          {slug === slugg ? (
            <div className="w-[250px] cursor-not-allowed rounded-md border border-b7 bg-white py-2 font-semibold text-b7">Selected</div>
          ) : (
            <Link href={`/product/${slugg}`} className="flex w-[250px] items-center justify-center gap-1 rounded-md border border-b7 bg-b7 py-2 font-semibold text-white">
              View Appliance <AiOutlineArrowRight />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ModelBuyingOptionCard;
