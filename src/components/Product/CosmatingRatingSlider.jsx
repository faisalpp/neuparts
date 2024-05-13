import React from 'react';
import { AiOutlineDollar, AiFillStar, AiOutlineCheckCircle } from 'react-icons/ai';
import ProductSlider from '../ProductSlider';
import Image from 'next/image';

const CosmatingRatingSlider = ({ title, dicount, type, stars, discount, codmetics }) => {
  const products = [
    {
      image: '/p1.webp',
    },
    {
      image: '/p1.webp',
    },
    {
      image: '/p1.webp',
    },
    {
      image: '/p1.webp',
    },
    {
      image: '/p1.webp',
    },
    {
      image: '/p1.webp',
    },
    {
      image: '/p1.webp',
    },
  ];
  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-lg text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="mt-2 flex items-center">{starIcons}</div>; // Render the array of star icons
  };
  return (
    <div className="relative flex h-auto w-full flex-col rounded-2xl border border-b14 bg-white p-4 sm:p-6 md:p-8 lg:p-6 maxmd:mx-auto maxmd:max-w-[330px]">
      {type === 1 ? (
        <div className="absolute left-2 top-0 ml-2 flex h-6 w-fit items-center justify-center gap-x-2 rounded-b-2xl bg-b9 px-3 text-white">
          <AiOutlineDollar />
          <span className="text-xs">Best Value</span>
        </div>
      ) : null}
      {type === 2 ? (
        <div className="absolute left-2 top-0  ml-2 flex h-7 w-fit items-center justify-center gap-x-2 rounded-b-2xl bg-b3 px-3 text-white">
          <Image width={400} height={400} quality={100} className="h-auto w-full" src="/svgs/local_fire_department.webp" alt="" /> <span className="text-xs">Most Popular</span>
        </div>
      ) : null}
      {type === 3 ? (
        <div className="absolute left-2 top-0  ml-2 flex h-7 w-fit items-center justify-center gap-x-2 rounded-b-2xl bg-b7 px-3 text-white">
          <Image width={400} height={400} quality={100} className="h-auto w-full" src="/svgs/star_rate_half.webp" alt="star_rate_half" /> <span className="text-xs">Premium Condition</span>
        </div>
      ) : null}
      <div className="mt-4 flex w-full flex-col items-center justify-center pb-4">
        <div className="flex items-center justify-center gap-x-1 text-center text-sm sm:text-base xl:text-[22px]">
          <h4 className="font-bold">{title}:</h4>
          <span className="font-semibold">{stars} Stars</span>
        </div>
        <div className="flex gap-x-3">
          <StarIconPrinter numberOfTimes={stars} />
        </div>
        {type === 1 ? <h4 className="mt-3 text-sm font-semibold text-b9 xl:text-base">Moderate Cosmetic Damage</h4> : null}
        {type === 2 ? <h4 className="mt-3 text-sm font-semibold text-b9 xl:text-base">Minor Cosmetic Damage</h4> : null}
        {type === 3 ? <h4 className="mt-3 text-sm font-semibold text-b9 xl:text-base">very Minor To No Cosmetic Damage</h4> : null}
        <div className="mt-2 flex items-center gap-x-1 rounded-full bg-b10 px-2 py-1 text-white">
          <AiOutlineCheckCircle className="text-lg" />
          <span className="text-xs xl:text-base">100% Functional</span>
        </div>
        <div className="relative w-full pt-5">
          <ProductSlider products={products} />
        </div>

        <div className="mt-10 flex w-full flex-col gap-y-3">
          <div className="flex items-center gap-4 sm:gap-x-10 md:gap-x-14 lg:gap-x-20">
            <span className="text-[16px] font-semibold">Discount</span>
            <div className="flex items-center gap-x-4 rounded-full border border-[#FF9B3E] bg-[#FFFAF5] px-5 py-3">
              <div className="flex gap-x-1">
                {discount === 1 ? (
                  <>
                    <span className="mt-2 flex w-2 bg-b7"></span>
                    <span className="mt-1 flex w-2 bg-b4"></span>
                    <span className="flex h-5 w-2 bg-b4"></span>
                  </>
                ) : null}
                {discount === 2 ? (
                  <>
                    <span className="mt-2 flex w-2 bg-b4"></span>
                    <span className="mt-1 flex w-2 bg-b7"></span>
                    <span className="flex h-5 w-2 bg-b4"></span>
                  </>
                ) : null}
                {discount === 3 ? (
                  <>
                    <span className="mt-2 flex w-2 bg-b4"></span>
                    <span className="mt-1 flex w-2 bg-b4"></span>
                    <span className="flex h-5 w-2 bg-b7"></span>
                  </>
                ) : null}
              </div>
              <span className="text-xs font-semibold md:text-sm">{dicount}</span>
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-[16px] font-semibold">Cosmetic Damage</span>
            <span className="md:text- flex grow items-center justify-center rounded-full border border-[#22A6AB] bg-[#F2FFFF] px-3 py-2 text-center text-xs text-[rgba(17,16,16,0.64)]">{codmetics}</span>
          </div>
          <div className="flex gap-x-5">
            <div className="flex flex-col gap-y-2 text-sm">
              <div className="flex text-sm">
                <span>Class</span>
              </div>
              <div className="flex text-sm">
                <span>Mechanical Test</span>
              </div>
              <div className="flex text-sm">
                <span>Inspection</span>
              </div>
              <div className="flex text-sm">
                <span>Warranty</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 text-sm">
              <div className="flex items-center gap-x-1 text-sm">
                <span>Open Box / Scratch & Dent</span>
              </div>
              <div className="flex items-center gap-x-1 text-sm">
                <AiOutlineCheckCircle className="text-b6" />
                <h4>100%</h4>
              </div>
              <div className="flex items-center gap-x-1 text-sm">
                <AiOutlineCheckCircle className="text-b6" />
                <h4>Passed</h4>
              </div>
              <div className="flex items-center gap-x-1 text-sm">
                <Image width={400} height={400} quality={100} src="/nueshield.webp" className="h-4 w-4" alt="nueshield" />
                <span>1 Year Warranty</span>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-3xl border border-[rgba(34,166,171,0.50)] bg-[rgba(34,166,171,0.10)] p-4">If you are shopping for bargains you are in the right place! 3-star rated appliances get you an open box appliance that works perfectly, with moderate cosmetic damage like scratches or dents at the largest discounted price we offer. Customers purchasing 3 star appliances capitalize on our deepest discounts in exchange for larger cosmetic blemishes while still obtaining a 100% functional appliance.</div>
        </div>
      </div>
    </div>
  );
};

export default CosmatingRatingSlider;
