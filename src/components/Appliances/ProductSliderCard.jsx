import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import ProductSlider from '../ProductSlider';
import Image from 'next/image';

const ProductSliderCard = ({ title, product, customStyle }) => {
  const products = [
    {
      image: 'refrigrator.webp',
    },
    {
      image: 'refrigrator.webp',
    },
    {
      image: 'refrigrator.webp',
    },
    {
      image: 'refrigrator.webp',
    },
    {
      image: 'refrigrator.webp',
    },
    {
      image: 'refrigrator.webp',
    },
    {
      image: 'refrigrator.webp',
    },
  ];
  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-xl text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="mt-2 flex items-center">{starIcons}</div>; // Render the array of star icons
  };
  return (
    <div className={customStyle}>
      <div className="relative flex h-auto w-full flex-col rounded-md bg-white p-4 shadow-md sm:p-6 md:p-8 lg:p-6 maxmd:mx-auto maxmd:max-w-[330px]">
        {product.rating === '3' ? (
          <div className="absolute left-2 top-0 ml-2 flex h-9 w-fit items-center justify-center gap-x-2 rounded-b-2xl bg-b9 px-3 text-white">
            <Image width={200} height={200} src="/svgs/monetization_on.webp" className="h-6 w-6 object-contain p-[1px]" alt="monetization_on" />
            <span className="text-xs font-bold 2xl:text-base">Best Value</span>
          </div>
        ) : null}
        {product.rating === '4' ? (
          <div className="absolute left-2 top-0  ml-2 flex h-9 w-fit items-center justify-center gap-x-2 rounded-b-2xl bg-b3 px-3 text-white">
            <Image width={200} height={200} src="/svgs/local_fire_department.webp" className="h-6 w-6 object-contain p-[1px]" alt="local_fire_department" /> <span className="text-xs font-bold 2xl:text-base">Most Popular</span>
          </div>
        ) : null}
        {product.rating === '5' ? (
          <div className="absolute left-2 top-0  ml-2 flex h-9 w-fit items-center justify-center gap-x-2 rounded-b-2xl bg-b7 px-3 text-white">
            <Image width={200} height={200} src="/svgs/star_rate_half.webp" className="h-6 w-6 object-contain p-[1px]" alt="star_rate_half" />
            <span className="text-xs font-bold 2xl:text-base">Premium Condition</span>
          </div>
        ) : null}
        <div className="mt-6 flex w-full flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-x-1 text-center text-base text-[#242424] 2xl:text-[22px]">
            <h4 className="font-bold">{title}:</h4>
            <span className="font-medium">{product.rating} star</span>
          </div>
          <div className="mb-4 flex gap-x-3">
            <StarIconPrinter numberOfTimes={product.rating} />
          </div>
          {product.rating === '3' ? <h4 className="text-center text-base font-semibold text-b3">Moderate Cosmetic Damage</h4> : null}
          {product.rating === '4' ? <h4 className="text-center text-base font-semibold text-b3">Minor Cosmetic Damage</h4> : null}
          {product.rating === '5' ? <h4 className="text-center text-base font-semibold text-b3">very Minor To No Cosmetic Damage</h4> : null}
          <div className="relative w-full pt-5">
            <ProductSlider image={product.image} />
          </div>

          <div className="mt-10 flex w-full flex-col gap-y-3">
            <div className="flex items-center justify-between gap-x-3">
              <span className="text-xs font-semibold text-b15 sm:text-sm md:text-base">Cosmetic Damage</span>
              {product.rating === '3' ? <span className="text-xs text-[rgba(17,16,16,0.64)] sm:text-sm md:text-base">Moderate</span> : null}
              {product.rating === '4' ? <span className="text-xs text-[rgba(17,16,16,0.64)] sm:text-sm md:text-base">Minor</span> : null}
              {product.rating === '5' ? <span className="text-xs text-[rgba(17,16,16,0.64)] sm:text-sm md:text-base">Very Minor-None</span> : null}
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-b15 sm:text-sm md:text-base">Discount</span>
              <div className="flex items-center gap-x-4">
                <div className="flex gap-x-1">
                  {product.rating === '3' ? (
                    <>
                      <span className="mt-2 flex w-2 bg-b7"></span>
                      <span className="mt-1 flex w-2 bg-b4"></span>
                      <span className="flex h-5 w-2 bg-b4"></span>
                    </>
                  ) : null}
                  {product.rating === '4' ? (
                    <>
                      <span className="mt-2 flex w-2 bg-b4"></span>
                      <span className="mt-1 flex w-2 bg-b7"></span>
                      <span className="flex h-5 w-2 bg-b4"></span>
                    </>
                  ) : null}
                  {product.rating === '5' ? (
                    <>
                      <span className="mt-2 flex w-2 bg-b4"></span>
                      <span className="mt-1 flex w-2 bg-b4"></span>
                      <span className="flex h-5 w-2 bg-b7"></span>
                    </>
                  ) : null}
                </div>
                {product.rating === '3' ? <span className="text-xs font-semibold md:text-sm">Massive</span> : null}
                {product.rating === '4' ? <span className="text-xs font-semibold md:text-sm">Huge</span> : null}
                {product.rating === '5' ? <span className="text-xs font-semibold md:text-sm">Greate</span> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSliderCard;
