'use client';
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import Image from 'next/image';

const ProductSlider = () => {
  // Corrected initialization of ImageSLider
  const imageSlider = ['/cooktops.webp', '/dish-water.webp', '/microwaves.webp', '/ranges.webp', '/cooktops.webp', '/dish-water.webp', '/microwaves.webp', '/ranges.webp'];

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    autoplaySpeed: 2000,
    slidesToShow: imageSlider.length < 10 ? imageSlider.length : 7,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: imageSlider.length < 8 ? imageSlider.length : 8,
        },
      },
    ],
  };

  const PrevButton = ({ onClick }) => (
    <button onClick={onClick} className="prev-button pointer-events-none absolute left-0 sm:-left-3 top-0 z-40 h-full block">
      <div className="carousel__prev group pointer-events-auto flex cursor-pointer rounded-full bg-b1/50 px-2 py-2 text-white hover:bg-cyan-500">
        <BsArrowLeftShort className="text-xl" />
      </div>
    </button>
  );

  const NextButton = ({ onClick }) => (
    <button onClick={onClick} className="next-button pointer-events-none absolute right-0 sm:-right-3 top-0 z-40 h-full block">
      <div className="carousel__next group pointer-events-auto flex cursor-pointer rounded-full bg-b1/50 px-2 py-2 text-white hover:bg-cyan-500">
        <BsArrowRightShort className="text-xl" />
      </div>
    </button>
  );

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <div className="maincontainer">
      <h2 className="mb-4 text-center text-2xl font-bold">Condition Photos</h2>
      <div className="slider-container">
        <div className="mx-auto w-full max-w-3xl">
          <Slider asNavFor={nav2} prevArrow={<PrevButton />} nextArrow={<NextButton />} ref={(slider) => (sliderRef1 = slider)}>
            {imageSlider.map((item, index) => (
              <div key={index} >
                <Image key={index} src={item} className="mx-auto w-[400px] h-[400px] md:h-[422px] py-10 md:w-[465px] object-contain" width={465} height={465} quality={100} alt="Product" />
                <div className="gap-3 rounded-2xl bg-b3/10 p-6">
                  <h3 className="font-bold">Condition Notes</h3>
                  <p className="text-sm text-[#9E9E9E] font-semibold mt-2 line-clamp-5">Lorem ipsum dolor sit amet consectetur. Facilisi adipiscing laoreet at amet ut lorem bibendum turpis. Massa est turpis nunc scelerisque. Eu in duis gravida consectetur ut mauris. Posuere sapien massa hac eu. Nullam in lectus neque tellus. Sodales massa posuere urna tempor nisi turpis est non adipiscing. Nibh proin tellus in nisl sed. Lectus.</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="conditionSlider mt-10">
          <Slider asNavFor={nav1} ref={(slider) => (sliderRef2 = slider)} {...settings} swipeToSlide={true} focusOnSelect={true}>
            {imageSlider.map((item, index) => (
              <div className="px-1" key={index}>
                <div className="sliderBox flex h-24 cursor-pointer justify-center rounded-xl border border-b16/10 p-3">
                  <Image src={item} key={index} className="h-full w-auto object-contain" width={600} height={600} quality={100} alt="Product" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
