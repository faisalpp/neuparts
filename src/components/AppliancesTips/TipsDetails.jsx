'use client';
import React, { useEffect, useState } from 'react';
import CdSvg from '@/components/svgs/CdSvg';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';

const TipsDetails = ({ slug, postslug }) => {
  const [tip, setTip] = useState({});
  const [loading, setLoading] = useState(true);

  const GetTip = async () => {
    const res = await fetch(`/api/front/blog/?category=${slug}&slug=${postslug}`);
    const data = await res.json();
    if (data.success) {
      setTip(data.post);
    }
    setLoading(false);
  };

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
        {loading ? (
          <div className="flex  w-full items-center justify-center">
            <Image width={200} height={200} quality={100} className="h-auto w-auto" alt="Loader" src="/loader2.gif" unoptimized />
          </div>
        ) : (
          <>
            <div className="mb-8 inline-flex items-center justify-center rounded-2xl bg-b3 p-2 md:mb-10 maxmd:h-16 maxmd:w-16">
              <CdSvg />
            </div>
            <div className="flex w-full flex-col gap-10 md:gap-16 xl:gap-20">
              <h1 className="text-28px font-bold text-b18 sm:text-4xl lg:text-40px coxs:text-32px coxs:leading-[48px]">{tip?.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: tip?.content }}></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TipsDetails;
