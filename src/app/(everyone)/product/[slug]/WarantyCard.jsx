'use client';
import React from 'react';
import Image from 'next/image';

const WarantyCard = ({ icon, title, description }) => {
  return (
    <div className={`flex flex-col gap-4 rounded-[20px] bg-white p-5 shadow-[0px_0px_100px_rgba(0,0,0,0.07)] md:p-10 2xl:p-16`}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF8FE]">
        <Image width={100} height={100} quality={100} src={`/svgs/` + icon} className="h-10 w-10" alt="" />
      </div>
      <h3 className="text-xl font-bold text-b18 md:text-lg">{title}</h3>
      <p className="leading-6">{description}</p>
    </div>
  );
};

export default WarantyCard;
