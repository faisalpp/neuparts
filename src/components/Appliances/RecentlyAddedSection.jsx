'use client';
import React, { useState } from 'react';
import CosmaticSlider from '../CosmaticSlider';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';

const RecentlyAddedSection = ({ category, title, active, buttonname }) => {
  const [query, setQuery] = useState('');
  const [recentProducts, setRecentProducts] = useState([
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
  ]);

  return (
    <>
      {recentProducts?.length > 0 ? (
        <div className="maincontainer py-10 lg:py-16 xl:py-20">
          <h2 className="text-center text-xl font-bold lg:text-2xl xl:text-32px">{title}</h2>

          <CosmaticSlider products={recentProducts} />

          <div className="mt-10 flex justify-center lg:mt-14">
            <Link href="/products/?rating=3" className={`inline-flex items-center gap-1  whitespace-nowrap rounded-lg border border-b3 px-4 py-3 text-sm font-semibold duration-300 hover:gap-2 3xl:text-base ${active ? 'bg-b3 text-white hover:bg-transparent hover:text-b3' : 'text-b3 hover:bg-b3 hover:text-white'}`}>
              <span>{buttonname}</span>
              <AiOutlineArrowRight className="text-base" />
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RecentlyAddedSection;
