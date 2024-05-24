import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { AiOutlineLoading } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';

const GetScoop = ({ ScoopCards, loading }) => {
  return (
    <div className="relative">
      <div className="maincontainer py-12 lg:py-16 xl:py-20 2xl:py-120px">
        <Image width={1000} height={1000} quality={100} src="/insidescoop.webp" alt="insidescoop" className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full" />
        <h2 className="mb-10 text-center text-2xl font-bold text-white lg:mb-16 xl:mb-20 xl:text-3xl 2xl:text-32px">Get the Inside Scoop</h2>
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <AiOutlineLoading className="animate-spin text-5xl text-white" />
          </div>
        ) : ScoopCards.length > 0 ? (
          <div className="mx-auto flex w-full flex-wrap justify-center gap-x-4 gap-y-6">
            {ScoopCards.map((scoopcard, index) => (
              <Link key={index} href={`/helpful-appliances-tips/blog/${scoopcard.slug}`} className="h-full w-full max-w-[435px]">
                <div className="flex h-full w-full items-center rounded-[19.021px] border border-white/50 bg-white/20 p-5 text-white sm:p-7 xl:p-10">
                  <div className="flex h-[39px] min-w-[39px] items-center justify-center rounded-lg bg-white p-2 sm:h-[56px] sm:min-w-[56px]">
                    <Image width={200} height={200} quality={100} src={scoopcard.thumbnail} alt="" className="h-full w-full object-contain" />
                  </div>
                  <div className="ml-4 flex w-full flex-col gap-2">
                    <h3 className="text-base font-bold coxs:text-lg">{scoopcard.title}</h3>
                    <span className="text-sm">{scoopcard.count} tips</span>
                  </div>
                  <div className="ml-2 sm:ml-4">
                    <FiChevronRight className="h-6 w-6" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GetScoop;

const ScoopCards = [
  {
    image: 'refrigrator.webp',
    title: 'Refrigerators & Freezers',
    tips: 8,
  },
  {
    image: 'dryers.webp',
    title: 'Dryers',
    tips: 8,
  },
  {
    image: 'gasstoves.webp',
    title: 'Gas Stoves',
    tips: 8,
  },
  {
    image: 'refrigrator.webp',
    title: 'Refrigerators & Freezers',
    tips: 8,
  },
  {
    image: 'p1.webp',
    title: 'Washing Machines',
    tips: 8,
  },
  {
    image: 'dryers.webp',
    title: 'Dryers',
    tips: 8,
  },
];
