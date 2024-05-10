import React from 'react';
import Link from 'next/link';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';

const PartnerCard = ({ image, title, description, imagestyle }) => {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:gap-20 2xl:flex">
      <div className={`repairImages ${imagestyle}`}>
        <img src={`appliance/` + image} className="h-auto 2xl:h-full" alt={title} />
      </div>
      <div className="order-2 lg:order-none">
        <div className="inline-flex justify-start">
          <div className="rounded-full border-[1.38569px] border-b3 px-4 py-2">
            <img src="neulogo.webp" alt="neulogo" className="h-[16.536px] w-[92.006px]" />
            <span className="block text-[5.09px] font-medium uppercase">RECOMMENDS</span>
          </div>
        </div>
        <h3 className="mb-4 mt-2 text-2xl font-extrabold text-b18 xl:text-3xl 2xl:text-[32px]">{title}</h3>
        <p className="mb-9 leading-8 text-b18">{description}</p>
        <div className="flex gap-2 maxsm:flex-col">
          <Link href="" className="flex items-center justify-center gap-1 rounded-lg bg-b3 px-4 py-3 text-xs font-medium text-white">
            <MdOutlineLocalPhone className="text-sm" />
            <span>(512) 363-5327</span>
          </Link>
          <Link href="" className="flex items-center justify-center gap-1 rounded-lg border border-b3 px-4 py-3 text-xs font-medium text-b3">
            <span>Learn More</span>
            <AiOutlineArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
