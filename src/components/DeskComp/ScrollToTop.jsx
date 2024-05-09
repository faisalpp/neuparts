'use client'
import React from 'react'
import { MdKeyboardDoubleArrowUp } from 'react-icons/md'

const ScrollToTop = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div onClick={() => scrollToTop()} className='fixed z-50 bottom-10 right-5 flex flex-col cursor-pointer rounded-md text-black items-center justify-center bg-b4 w-10 2xl:w-20 xl:w-20 lg:w-20 py-2' >
      <MdKeyboardDoubleArrowUp className='text-xl' />
      <h6 className='hidden 2xl:flex xl:flex lg:flex text-xs font-semibold px-1 text-center' >Back To Top</h6>
    </div>
  )
}

export default ScrollToTop