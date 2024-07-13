'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import ReviewExCard from './ReviewExCard';
import Image from 'next/image';

const ReviewEXSlider = ({ clientreviews, icon, dots }) => {
  const settings = {
    dots: dots,
    infinite: false,
    arrows: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          dots: true,
          slidesToShow: 1.08,
        },
      },
      {
        breakpoint: 1439,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const PrevButton = ({ onClick }) => (
    <button onClick={onClick} className="prev-button pointer-events-none absolute -left-3 top-0 z-40 hidden h-full sm:block">
      <div className="group pointer-events-auto flex cursor-pointer rounded-full bg-b1/50 px-2 py-2 text-white hover:bg-cyan-500">
        <BsArrowLeftShort className="text-xl" />
      </div>
    </button>
  );

  const NextButton = ({ onClick }) => (
    <button onClick={onClick} className="next-button pointer-events-none absolute -right-3 top-0 z-40 hidden h-full sm:block">
      <div className="group pointer-events-auto flex cursor-pointer rounded-full bg-b1/50 px-2 py-2 text-white hover:bg-cyan-500">
        <BsArrowRightShort className="text-xl" />
      </div>
    </button>
  );
  return (
    <div className="reviewslider-wrapper">
      {clientreviews.length > 0 ? (
        <Slider {...settings} prevArrow={<PrevButton />} nextArrow={<NextButton />} className="relative maxmd:mb-10">
          {clientreviews.map((clientreview, index) => (
            <div key={index}>
              <ReviewExCard description={clientreview.review} author={clientreview.name} review={clientreview.rating} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex w-full items-center justify-center">
          <Image width={400} height={400} quality={100} alt="Loader" src="/loader-bg.gif" className="h-10 w-10 " />
        </div>
      )}
    </div>
  );
};

export default ReviewEXSlider;
