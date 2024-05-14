'use client';
import React, { useEffect, useState } from 'react';
import CdSvg from '@/components/svgs/CdSvg';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import parse from 'html-react-parser';
import Link from 'next/link';

const TipsDetails = ({ slug }) => {
  const [tip, setTip] = useState({});

  const GetTip = async () => {};

  useEffect(() => {
    GetTip();
  }, [slug]);

  return (
    <div className="px-4 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20 xl:py-20 2xl:px-120px 2xl:py-120px">
      <div className="mx-auto w-full max-w-[960px]">
        <Link href="/helpful-appliances-tips" className="mb-10 flex items-center gap-2 text-sm font-semibold text-b3 lg:hidden">
          <AiOutlineArrowLeft />
          Back
        </Link>
        <div className="mb-8 inline-flex items-center justify-center rounded-2xl bg-b3 p-2 md:mb-10 maxmd:h-16 maxmd:w-16">
          <CdSvg />
        </div>
        <div className="flex w-full flex-col gap-10 md:gap-16 xl:gap-20">
          <h1 className="text-28px font-bold text-b18 sm:text-4xl lg:text-40px coxs:text-32px coxs:leading-[48px]">Tips for {tip.title}</h1>
          <div>{tip.content ? parse(tip.content) : null}</div>
        </div>
      </div>
    </div>
  );
};

export default TipsDetails;
