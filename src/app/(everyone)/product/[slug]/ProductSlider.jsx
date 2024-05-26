import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import Image from 'next/image';

const ProductSlider = () => {
  const ImageSLider = useState(['/cooktops.webp', '/cooktops.webp', '/cooktops.webp', '/cooktops.webp', '/cooktops.webp', '/cooktops.webp', '/cooktops.webp', '/cooktops.webp']);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    autoplaySpeed: 2000,
    slidesToShow: ImageSLider.length < 10 ? ImageSLider.length : 7,
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
          slidesToShow: ImageSLider.length < 8 ? ImageSLider.length : 8,
        },
      },
    ],
  };

  const PrevButton = ({ onClick }) => (
    <button onClick={onClick} className="prev-button pointer-events-none absolute -left-3 top-0 z-40 hidden h-full sm:block">
      <div className="carousel__prev group pointer-events-auto flex cursor-pointer rounded-full bg-b1/50 px-2 py-2 text-white hover:bg-cyan-500">
        <BsArrowLeftShort className="text-xl" />
      </div>
    </button>
  );

  const NextButton = ({ onClick }) => (
    <button onClick={onClick} className="next-button pointer-events-none absolute -right-3 top-0 z-40 hidden h-full sm:block">
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
    <div>
      <h2 className="mb-4 text-center text-2xl font-bold">Condition Photos</h2>
      <div className="slider-container">
        <div className="mx-auto w-full max-w-2xl">
          <Slider asNavFor={nav2} prevArrow={<PrevButton />} nextArrow={<NextButton />} ref={(slider) => (sliderRef1 = slider)}>
            {ImageSLider.map((item, index) => (
              <Image key={index} src={item} className="h-[422px] w-[465px] object-contain" width={600} height={600} quality={100} alt="Product" />
            ))}
          </Slider>
        </div>
        <Slider ref={(slider) => (sliderRef2 = slider)} {...settings} swipeToSlide={true} focusOnSelect={true}>
          {ImageSLider.map((item, index) => (
            <Image src={item} key={index} className="h-16 w-16 object-contain" width={600} height={600} quality={100} alt="Product" />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
