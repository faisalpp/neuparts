'use client';
import React from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import ProductCard2 from './ProductCard2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CosmaticSlider = ({ products, sliderstyle }) => {
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
        breakpoint: 767,
        settings: {
          slidesToShow: 1.08,
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
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const PrevButton = ({ onClick }) => (
    <button onClick={onClick} className="prev-button pointer-events-none absolute -left-3 top-0 z-40 hidden h-full sm:block md:-left-8">
      <div className="group pointer-events-auto flex cursor-pointer rounded-full bg-black/50 px-2 py-2 text-white hover:bg-black">
        <BsArrowLeftShort className="text-xl" />
      </div>
    </button>
  );

  const NextButton = ({ onClick }) => (
    <button onClick={onClick} className="next-button pointer-events-none absolute -right-3 top-0 z-40 hidden h-full sm:block md:-right-8">
      <div className="group pointer-events-auto flex cursor-pointer rounded-full bg-black/50 px-2 py-2 text-white hover:bg-black">
        <BsArrowRightShort className="text-xl" />
      </div>
    </button>
  );

  return (
    <>
      <div className="mt-8">
        <Slider {...settings} prevArrow={<PrevButton />} nextArrow={<NextButton />} className="relative maxmd:pb-5">
          {products?.map((item, indx) => (
            <ProductCard2 key={indx} product={item} sliderstyle={sliderstyle} />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default CosmaticSlider;
