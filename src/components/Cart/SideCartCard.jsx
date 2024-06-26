import React, { useState } from 'react';
import ToolTip from '../ToolTip';
import FourStar from '@/components/svgs/FourStar';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';

const SideCartCard = (props) => {
  const [price, setPrice] = useState(props.item.isSale ? props.item.salePrice : props.item.regPrice);

  return (
    <div className="relative mt-3 flex w-full justify-start gap-3 border-b border-b1/10 py-5 maxlg:flex-col">
      <Image width={400} height={400} quality={100} src={props.item.image} className="h-auto w-28 object-contain maxlg:mx-auto" alt={props.item.title} />
      <div className="flex w-full flex-col justify-center gap-2">
        <div className="flex w-full justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold">{props.item.title}</h3>
          <button type="button" onClick={(e) => props.RemoveFromCart(e, props.indx, props.item.pid, price)} className="grid h-6 w-6 place-items-center rounded-full bg-b3/10 maxlg:absolute maxlg:right-0 maxlg:top-0">
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
                <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                  <FourStar />
                  New
                </div>
              )}
              {props.item.condition == 'certified' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-cyan px-3 py-1 text-xs font-semibold text-white">Certified Refurbished</div>}
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
