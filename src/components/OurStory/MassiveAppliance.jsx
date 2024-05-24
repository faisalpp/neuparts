'use client';
import React, { useState } from 'react';
import CosmaticSlider from '../CosmaticSlider';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';

const MassiveAppliance = ({ sliderstyle, title, customstyle }) => {
  const [relatedProducts, setRelatedProducts] = useState([
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
      condtion: 'new',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
      condtion: 'new-open-box',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
      condtion: 'used-grade-a',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
      condtion: 'used-grade-c',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
      condtion: 'new',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
      condtion: 'new-open-box',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
      condtion: 'used-grade-a',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
      condtion: 'used-grade-c',
    },
  ]);

  return (
    <>
      {relatedProducts?.length > 0 ? (
        <div className="bg-b3/10">
          <div className={'maincontainer py-10 lg:py-16 xl:py-20 2xl:py-120px ' + customstyle}>
            <h2 className="mb-5 text-center text-2xl font-bold lg:mb-10 xl:mb-[60px] xl:text-32px">{title}</h2>

            <CosmaticSlider products={relatedProducts} sliderstyle={sliderstyle} />

            <div className="mt-10 flex justify-center lg:mt-14 xl:mt-[60px]">
              <Link href="" className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-b3 px-4 py-3 text-sm font-medium text-b3 duration-300 hover:gap-2 3xl:text-base maxsm:w-full">
                <span>View More</span>
                <AiOutlineArrowRight className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MassiveAppliance;
