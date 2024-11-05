'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';

const ImageWNull = (thumb,title) => {

  const [thumbnail,setThumbnail] = useState(thumb ? thumb : '/no-image.webp')

  return (
    <Image src={thumbnail} onErrorCapture={()=>setThumbnail('/no-image.webp')} className="h-52 w-full object-contain px-4" alt={title} width={600} height={600} quality={100} />
  )
}

const ModelCategories = ({ data,modelNo }) => {
  return (
    <div className="pb-10 md:pb-20">
      <h2 className="mb-10 text-2xl font-semibold text-b1">
        Model <span className="text-dark-red">{modelNo}</span> Appliance Part Categories
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data.partTypes.map((item, index) => (
          <div key={index} className="rounded-lg border border-b1/10 px-6 pb-6 duration-200 hover:scale-105">
            <ImageWNull thumb={item?.thumbnail ? item.thumbnail : false} title={item.title} />
            <h3 className="mt-6 font-semibold text-b1">{item.title}</h3>
          </div>
        ))}
      </div>
      <Link href="/categories" className="button-hover mt-14 flex w-fit items-center justify-center rounded-lg border-[1px] px-4 py-3 font-semibold text-white maxmd:w-full">
        <span className="lg:text-sm xl:text-[16px]">View More Part Categories</span>
        <BsArrowRightShort className="text-2xl" />
      </Link>
    </div>
  );
};

export default ModelCategories;
