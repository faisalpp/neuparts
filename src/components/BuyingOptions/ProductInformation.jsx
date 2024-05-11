import React from 'react';
import InformationCard from './InformationCard';
import InformationCardDisabled from './InformationCardDisabled';
import Image from 'next/image';

const ProductInformation = ({ image, title, modelNo, bullets, threeStarProduct, fourStarProduct, fiveStarProduct, threeStarCount, fourStarCount, fiveStarCount }) => {
  return (
    <div className="grid grid-cols-1 gap-14 lg:grid-cols-[560px_auto]">
      <div className="rounded-2xl border border-b14 py-[77px]">
        <Image width={500} height={500} quality={100} src={image} alt="p1" className="mx-auto h-[378px] w-[378px] object-contain" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-b18">{title}</h2>
        <div className="my-8 flex items-center gap-7">
          <h3 className="text-sm font-semibold text-black">Model Number</h3>
          <span className="text-b16">{modelNo}</span>
        </div>
        <ul className="mb-5 ml-6 list-disc leading-8">
          {bullets?.length
            ? bullets.slice(0, 4).map((bullet, indx) => (
                <li key={indx} className="text-black">
                  {bullet}
                </li>
              ))
            : null}
        </ul>
        <div className="flex w-full flex-col gap-[10px]">
          {threeStarProduct ? <InformationCard item={threeStarProduct} count={threeStarCount} /> : <InformationCardDisabled rating={3} />}
          {fourStarProduct ? <InformationCard item={fourStarProduct} count={fourStarCount} /> : <InformationCardDisabled rating={4} />}
          {fiveStarProduct ? <InformationCard item={fiveStarProduct} count={fiveStarCount} /> : <InformationCardDisabled rating={5} />}
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
