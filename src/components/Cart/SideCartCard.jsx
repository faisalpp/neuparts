import React, { useState } from 'react';
import ToolTip from '../ToolTip';
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
    <div className="mt-3 flex w-full justify-start gap-3">
      <Image width={400} height={400} quality={100} src={props.item.image} className="h-16 w-16" alt="" />
      <div className="flex w-full flex-col justify-center gap-2">
        <p className="line-clamp-2 text-sm font-semibold">{props.item.title}</p>
        <div className="flex items-center space-x-5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-black/50">
                Cosmetic <br /> Rating
              </span>
            </div>
            <div className="flex items-center">
              <span>
                <ToolTip dimension="w-4 h-4" color="text-b3" />
              </span>
              <StarIconPrinter numberOfTimes={props.item.rating} />
            </div>
          </div>
          <div className="space-x-1">
            <strike className="text-xs text-b25">${props.item.regPrice}</strike>
            <span className="text-sm font-semibold text-b3">${props.item.salePrice}</span>
          </div>
        </div>
      </div>
      <div>
        <button type="button" onClick={(e) => props.RemoveFromCart(e, props.indx, props.item.pid, price)}>
          {props.delState === props.indx ? <RiDeleteBin6Line className="animate-bounce text-xl text-red-500" /> : <RiDeleteBin6Line className="text-xl text-b3" />}
        </button>
      </div>
    </div>
  );
};

export default SideCartCard;
