import React from 'react';
import Image from 'next/image';

const PayTermCard = ({ image, title, description }) => {
  return (
    <div className="rounded-3xl bg-b3/10 p-7 xl:px-10 xl:py-14">
      <div className="mx-auto flex h-[88px] w-[88px] items-center justify-center rounded-full bg-b3">
        <Image width={200} height={200} src={`/svgs/` + image} className="h-10 w-10" alt="timer" />
      </div>
      <h3 className="mb-4 mt-6 text-center text-xl font-bold leading-6 text-b3">{title}</h3>
      <p className="text-center leading-6 text-b18">{description}</p>
    </div>
  );
};

export default PayTermCard;
