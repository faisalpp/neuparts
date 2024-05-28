'use client';
import React from 'react';
import OtherProductCard from '@/components/OtherProductCard';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import Link from 'next/link';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const BuyingOtherOptions = ({ slug, otherProducts, modelNo }) => {
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300,
    margin: 10,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 375,
        settings: {
          dots: true,
          slidesToShow: 1.05,
        },
      },
      {
        breakpoint: 767,
        settings: {
          dots: true,
          slidesToShow: 2.05,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1439,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const PrevButton = ({ onClick }) => (
    <button onClick={onClick} className="prev-button pointer-events-none absolute -left-3 top-0 z-40 block h-full">
      <div className="group pointer-events-auto flex cursor-pointer rounded-full bg-black/50 px-2 py-2 text-white hover:bg-b3">
        <BsArrowLeftShort className="text-xl" />
      </div>
    </button>
  );

  const NextButton = ({ onClick }) => (
    <button onClick={onClick} className="next-button pointer-events-none absolute -right-3 top-0 z-40 block h-full">
      <div className="group pointer-events-auto flex cursor-pointer rounded-full bg-black/50 px-2 py-2 text-white hover:bg-b3">
        <BsArrowRightShort className="text-xl" />
      </div>
    </button>
  );
  return (
    <div className=" rounded-lg py-5">
      <div className="mb-3 flex items-center justify-between">
        <h6 className="font-bold">Product Buying Options</h6>
        <Link href={`/products/buying-options/?modelNo=${modelNo}`} className="flex items-center text-sm font-bold text-b3 hover:underline">
          View All <BsArrowRightShort />
        </Link>
      </div>
      <div className="reviewslider-wrapper slider-container mt-4">
        {otherProducts.length > 0 ? (
          <Slider {...settings} prevArrow={<PrevButton />} nextArrow={<NextButton />} className="relative maxmd:mb-10">
            {otherProducts.map((product, index) => (
              <OtherProductCard key={index} slug={slug} product={product} />
            ))}
          </Slider>
        ) : (
          <div className="flex w-full items-center justify-center">
            <Image width={400} height={400} quality={100} alt="Loader" src="/loader-bg.gif" className="h-10 w-10 " />
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyingOtherOptions;
