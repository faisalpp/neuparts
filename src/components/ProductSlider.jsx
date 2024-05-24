'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import Image from 'next/image';

const ProductSlider = ({ image, products }) => {
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  const PrevButton = ({ onClick }) => (
    <button onClick={onClick} className="pointer-events-none absolute bottom-0 left-10 top-0 z-40 flex items-center lg:left-5 xl:left-10">
      <div className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-b1/50 text-white hover:bg-cyan-400">
        <BsArrowLeftShort className="text-2xl" />
      </div>
    </button>
  );

  const NextButton = ({ onClick }) => (
    <button onClick={onClick} className="pointer-events-none absolute bottom-0 right-10 top-0 z-40 flex items-center lg:right-5 xl:right-10">
      <div className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-b1/50 text-white hover:bg-cyan-400">
        <BsArrowRightShort className="text-2xl" />
      </div>
    </button>
  );
  return (
    <>
      {products ? (
        <Slider {...settings} prevArrow={<PrevButton />} nextArrow={<NextButton />} className="relative">
          {products.map((product, index) => (
            <div key={index}>
              <div className="flex w-full justify-center">
                <Image width={1000} height={1000} quality={100} src={product.image} className="mx-auto h-full w-40 lg:w-44 xl:w-1/2" alt="refrigrator" />
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <Slider {...settings} prevArrow={<PrevButton />} nextArrow={<NextButton />} className="relative">
          <div className="flex w-full justify-center">
            <Image width={1000} height={1000} quality={100} src={image} className="mx-auto h-full w-40 lg:w-44 xl:w-1/2" alt="refrigrator" />
          </div>
          <div className="flex w-full justify-center">
            <Image width={1000} height={1000} quality={100} src={image} className="mx-auto h-full w-40 lg:w-44 xl:w-1/2" alt="refrigrator" />
          </div>
          <div className="flex w-full justify-center">
            <Image width={1000} height={1000} quality={100} src={image} className="mx-auto h-full w-40 lg:w-44 xl:w-1/2" alt="refrigrator" />
          </div>
        </Slider>
      )}
    </>
  );
};

export default ProductSlider;
