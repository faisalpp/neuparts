'use client';
import React, { useState } from 'react';
import ProductCard2 from '@/components/ProductCard2';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';

const PupularParts = () => {
  const [pupolarParts, setPupolarParts] = useState([
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
    {
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
  ]);
  return (
    <div className="maincontainer flex flex-col justify-center py-10 lg:py-16 xl:py-20 2xl:py-120px">
      <h2 className="mb-4 text-center text-2xl font-bold lg:text-3xl xl:text-4xl">Popular Parts</h2>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {pupolarParts.map((item, index) => (
          <ProductCard2 key={index} product={item} />
        ))}
      </div>
      <div className="mt-16 flex justify-center">
        <Link href="/applianceTypes" className="flex w-fit items-center rounded-md border-[1px] border-b3 px-4 py-3 font-semibold text-b3">
          <span className="lg:text-sm xl:text-[16px]">View All Parts</span>
          <BsArrowRightShort className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default PupularParts;
