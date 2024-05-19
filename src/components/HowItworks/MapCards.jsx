import React from 'react';
import Image from 'next/image';

const MapCards = ({ icon, title, description, white }) => {
  return (
    <div className={`rounded-[24px_24px_0px_24px] shadow-[0px_0px_100px_rgba(0,0,0,0.07)] ${white ? 'bg-white' : 'bg-b21'} flex flex-col gap-4 px-5 py-10 md:p-10`}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EBF8FE]">
        <Image width={100} height={100} quality={100} src={`/svgs/` + icon} className="h-8 w-8" alt="" />
      </div>
      <h3 className="text-lg font-bold text-b18">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default MapCards;
