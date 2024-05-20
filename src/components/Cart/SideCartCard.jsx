import React, { useState } from 'react';
import ToolTip from '../ToolTip';
import FourStar from '@/components/svgs/FourStar';
import { AiFillStar } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';

const SideCartCard = (props) => {
  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-sm text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="mt-2 flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  const [price, setPrice] = useState(props.item.isSale ? props.item.salePrice : props.item.regPrice);

  return (
    <div className="mt-3 flex w-full justify-start gap-3 border-b border-[#F2F2F2] py-5">
      <Image width={400} height={400} quality={100} src={props.item.image} className="h-auot w-28 object-contain" alt={props.item.title} />
      <div className="flex w-full flex-col justify-center gap-2">
        <div className="flex w-full justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold">{props.item.title}</h3>
          <button type="button" onClick={(e) => props.RemoveFromCart(e, props.indx, props.item.pid, price)} className="grid h-6 w-6 place-items-center rounded-full bg-b8">
            {props.delState === props.indx ? <RiDeleteBin6Line className="animate-bounce text-sm text-red-500" /> : <RiDeleteBin6Line className="text-sm text-b3" />}
          </button>
        </div>
        <div className="space-y-2">
          <span className="text-xs font-medium">Qty: 1</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-b25">Condition</span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <ToolTip dimension="w-4 h-4" color="text-b25" />
              </span>
              {props.item.condition == 'new' && (
                <div className="bg-dark-blue inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-white">
                  <FourStar />
                  New
                </div>
              )}
              {props.item.condition == 'certified' && <div className="bg-dark-cyan inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-white">Certified Refurbished</div>}
              {props.item.condition == 'used' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-c-orange px-3 py-1 text-xs font-semibold text-white">Used • Grade D</div>}
              {/* <StarIconPrinter numberOfTimes={props.item.rating} /> */}
            </div>
          </div>
          <div className="space-x-1">
            <strike className="text-xs text-b25">${props.item.regPrice}</strike>
            <span className="text-sm font-semibold text-b3">${props.item.salePrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCartCard;
