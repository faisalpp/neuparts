'use client';

import React from 'react';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div onClick={() => scrollToTop()} className="fixed bottom-10 right-5 z-50 flex w-10 cursor-pointer flex-col items-center justify-center rounded-md bg-b4 py-2 text-black lg:w-20 xl:w-20 2xl:w-20">
      <MdKeyboardDoubleArrowUp className="text-xl" />
      <h6 className="hidden px-1 text-center text-xs font-semibold lg:flex xl:flex 2xl:flex">Back To Top</h6>
    </div>
  );
};

export default ScrollToTop;
