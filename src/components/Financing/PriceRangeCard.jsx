import React from 'react';
import TickSvg from '@/components/svgs/TickSvg';

const PriceRangeCard = ({ title, items }) => {
  return (
    <div className="rounded-3xl bg-white p-7 sm:p-10">
      <h3 className="mb-6 text-xl font-bold text-b3">{title}</h3>
      <ul className="m-0 flex flex-col gap-4">
        {items.map((item, index) => (
          <li className="flex items-center gap-3" key={index}>
            <div className="h-6 w-6">
              <TickSvg />
            </div>
            <p
              className="text-left leading-6 text-b18 maxmd:text-sm"
              dangerouslySetInnerHTML={{
                __html: item.replace(/\n/g, '<br/>'),
              }}
            ></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceRangeCard;
