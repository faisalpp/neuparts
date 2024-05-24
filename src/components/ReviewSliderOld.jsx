import React, { useState, useEffect } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import ReviewCard from './ReviewCard';

const ReviewSlider = ({ color, icon }) => {
  useEffect(() => {
    let box = document.getElementById('id');
    setBox(box);
  }, []);

  const [Box, setBox] = useState();
  const btnprev = () => {
    let width = Box.clientWidth;
    Box.scrollLeft = Box.scrollLeft - width;
  };
  const btnnext = () => {
    let width = Box.clientWidth;
    Box.scrollLeft = Box.scrollLeft + width;
  };

  return (
    <>
      <div className="relative">
        <button onClick={btnprev} className="absolute -right-3 top-0 z-40 h-full">
          <div className="group hidden cursor-pointer rounded-full bg-b1/50 px-2 py-2 text-white hover:bg-cyan-500 lg:flex">
            <BsArrowRightShort className="text-xl" />
          </div>
        </button>
        <button onClick={btnnext} className="absolute -left-6 top-0 z-40 h-full">
          <div className="group hidden cursor-pointer rounded-full bg-b1/50 px-2 py-2 text-white hover:bg-cyan-500 lg:flex">
            <BsArrowLeftShort className="text-xl" />
          </div>
        </button>
        <div id="id" className="flex space-x-5 overflow-x-scroll scroll-smooth lg:overflow-x-hidden">
          <ReviewCard color={color} icon={icon} />
          <ReviewCard color={color} icon={icon} />
          <ReviewCard color={color} icon={icon} />
          <ReviewCard color={color} icon={icon} />
          <ReviewCard color={color} icon={icon} />
        </div>
      </div>
    </>
  );
};

export default ReviewSlider;
