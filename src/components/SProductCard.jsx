import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SProductCard = ({ link, title, image }) => {
  return (
    <Link href={link}>
      <div className="maxmd:mx-auto maxmd:max-w-[330px]">
        <div className="flex flex-col items-center justify-center rounded-xl border-[1px] border-gray-200 bg-white p-3 md:p-10">
          <Image width={500} height={500} quality={100} src={image} alt={title} className="h-[150px] w-auto object-contain md:h-56" />
        </div>
        <h4 className=" mt-2 text-sm font-bold md:text-lg xl:text-xl">{title}</h4>
      </div>
    </Link>
  );
};

export default SProductCard;
