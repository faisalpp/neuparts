'use client';
import React, { useState } from 'react';
import ProductCard2 from '@/components/ProductCard2';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import Image from 'next/image';

const MoreParts = () => {
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1.05,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const PrevButton = ({ onClick }) => (
    <button onClick={onClick} className="prev-button pointer-events-none absolute -left-3 top-0 z-30 block h-full">
      <div className="group pointer-events-auto flex cursor-pointer rounded-full bg-black/50 px-2 py-2 text-white hover:bg-cyan-500">
        <BsArrowLeftShort className="text-xl" />
      </div>
    </button>
  );

  const NextButton = ({ onClick }) => (
    <button onClick={onClick} className="next-button pointer-events-none absolute -right-3 top-0 z-30 block h-full">
      <div className="group pointer-events-auto flex cursor-pointer rounded-full bg-black/50 px-2 py-2 text-white hover:bg-cyan-500">
        <BsArrowRightShort className="text-xl" />
      </div>
    </button>
  );

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
  ]);
  return (
    <div className="bg-b3/5" id="testimonials-view">
      <div className="maincontainer flex flex-col justify-center py-10 lg:py-16 xl:py-20 2xl:py-120px">
        <h2 className="text-center text-2xl font-bold md:mb-4 lg:text-3xl xl:text-4xl">More Parts for Your Model</h2>
        <div className="mt-10">
          {pupolarParts.length > 0 ? (
            <Slider {...settings} prevArrow={<PrevButton />} nextArrow={<NextButton />} className="relative maxmd:mb-10">
              {pupolarParts.map((item, index) => (
                <ProductCard2 key={index} product={item} />
              ))}
            </Slider>
          ) : (
            <div className="flex w-full items-center justify-center">
              <Image width={400} height={400} quality={100} alt="Loader" src="/loader-bg.gif" className="h-10 w-10 " />
            </div>
          )}
        </div>
        <div className="mt-10 flex justify-center md:mt-16">
          <Link href="/applianceTypes" className="flex w-full items-center justify-center rounded-md border border-b3 px-4 py-3 font-semibold text-b3 md:w-fit">
            <span className="text-xs md:text-sm xl:text-base">View More</span>
            <BsArrowRightShort className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MoreParts;
