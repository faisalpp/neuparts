'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

const GallerySlider = ({ page, setPage, totalPages, media, setImg, img }) => {
  useEffect(() => {
    let box = document.getElementById('id6');
    setBox(box);
  }, []);

  const [Box, setBox] = useState();
  const btnprev = () => {
    page > 1 ? setPage(page - 1) : setPage(1);
    let width = Box.clientWidth;
    Box.scrollLeft = Box.scrollLeft - width;
  };
  const btnnext = () => {
    page < totalPages && setPage(page + 1);
    let width = Box.clientWidth;
    Box.scrollLeft = Box.scrollLeft + width;
  };
  const handleImage = (image) => {
    setImg(image);
  };

  return (
    <>
      <div className="relative my-8 md:mx-5">
        <button onClick={btnprev} className="absolute -right-5 top-0 z-40 h-full">
          <div className="group hidden cursor-pointer rounded-full bg-black/50 px-2 py-2 text-white hover:bg-cyan-500 lg:flex">
            <BsArrowRightShort className="text-xl" />
          </div>
        </button>
        <button onClick={btnnext} className="absolute -left-5 top-0 z-40 h-full">
          <div className="group hidden cursor-pointer rounded-full bg-black/50 px-2 py-2 text-white hover:bg-cyan-500 lg:flex">
            <BsArrowLeftShort className="text-xl" />
          </div>
        </button>
        <div id="id6" className="flex space-x-4 overflow-x-scroll scroll-smooth lg:space-x-3 lg:overflow-x-hidden xl:space-x-[9px]">
          {media.length > 0 ? media.map((item, index) => <Image width={400} height={400} quality={100} alt="" key={index} onClick={() => handleImage(item.image)} src={item.image} className={`h-32 w-36 cursor-pointer rounded-2xl lg:h-[100px] lg:w-[130px] xl:h-[142px] xl:w-[171px] ${img == item.image ? 'rounded-xl border-2 border-white' : 'border-none'}  `} />) : null}
        </div>
      </div>
    </>
  );
};

export default GallerySlider;
