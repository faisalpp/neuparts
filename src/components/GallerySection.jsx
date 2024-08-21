'use client';
import React, { useState } from 'react';
import GallerySlider from '../components/GallerySlider';
import { BsArrowRightShort } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';

const GallerySection = ({data}) => {
  const [media, setMedia] = useState(data);
  const [img, setImg] = useState(data[0].url);

  return (
    <div className="bg-b3 ">
      <div className="maincontainer flex flex-col py-10 lg:py-12">
        <div className=" mt-5 lg:mt-10 xl:mt-10">
          {loading ? (
            <div className="flex h-52 w-full items-center justify-center bg-black/10 lg:h-[400px] xl:h-[565px]">
              <Image width={1000} height={1000} alt="" src="/loader-bg.gif" />
            </div>
          ) : (
            <Image width={1000} height={1000} alt="" src={img} className="h-52 w-full rounded-3xl lg:h-[400px] xl:h-[565px]" />
          )}
          <div>
            <GallerySlider page={page} setPage={setPage} totalPages={totalPages} media={media} setImg={setImg} img={img} />
          </div>
        </div>
        <div className="flex justify-center py-5">
          <Link href="/" className="flex w-fit items-center justify-center rounded-md border-[1px] border-white px-4 py-1 font-semibold text-white xl:py-2 maxmd:w-full">
            <span className="text-sm xl:text-[16px]">Shop Now</span>
            <BsArrowRightShort className="text-2xl xl:text-3xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
