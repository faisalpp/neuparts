import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiFillStar } from 'react-icons/ai';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

const ReviewSlider2 = ({ color, clientreviews, icon }) => {
  const settings = {
    dots: false,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1.12,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1670,
        settings: {
          slidesToShow: 3,
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

  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-sm text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="mt-2 flex items-center">{starIcons}</div>; // Render the array of star icons
  };
  const StarIconPrinter2 = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-sm text-gray-300" /> // Render the star icon component for each iteration
    ));

    return <div className="mt-2 flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  return (
    <div>
      {clientreviews.length > 0 ? (
        <Slider {...settings} prevArrow={<PrevButton />} nextArrow={<NextButton />} className="relative">
          {clientreviews.map((clientreview, index) => (
            <div key={index} className="maxsm:px-2">
              <div style={{ backgroundColor: color }} className="flex flex-col rounded-xl px-5 py-3 shadow-sm sm:mx-2 xl:h-[170px]">
                <div className="mt-2 flex">
                  <StarIconPrinter numberOfTimes={clientreview.rating} />
                  <StarIconPrinter2 numberOfTimes={5 - clientreview.rating} />
                </div>
                <p className="mt-1 text-sm font-semibold">{clientreview.text}</p>
                <a href="" className="mt-2 text-sm text-b6">
                  Read More
                </a>
                <div className="flex items-center">
                  <h5 className="mt-2 w-10/12 text-sm">{clientreview.user.name}</h5>
                  <img src={icon} className="mt-4 h-5 w-10" alt="Icon" />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex w-full items-center justify-center">
          <img src="/loader-bg.gif" className="h-10 w-10 " />
        </div>
      )}
    </div>
  );
};

export default ReviewSlider2;
