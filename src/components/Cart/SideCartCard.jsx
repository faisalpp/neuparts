import React, { useState } from 'react';
import ToolTip from '../ToolTip';
import FourStar from '@/components/svgs/FourStar';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {deleteFromCart} from '@/app/GlobalRedux/slices/CartSlice'

const SideCartCard = (props) => {
  const [delLoading,setDelLoading] = useState(false)
  const dispatch = useDispatch()
  const cartId = useSelector((state)=>state.cart.cartId)

  const DeleteFromCart = async () => {
   setDelLoading(true) 
   const res = await dispatch(deleteFromCart({catId:props.catId,productId:props.item.id,cartId:cartId,quantity:props.item.quantity}))
   if(res.payload.success){
    setDelLoading(false) 
   }
  }

  const [thumbnail,setThumbnail] = useState(props.item?.thumbnail ? props.item?.thumbnail : '/no-image.webp')

  return (
    <div className="relative mt-3 flex w-full justify-start gap-3 border-b border-b1/10 py-5 maxlg:flex-col">
      <Image width={400} height={400} quality={100} onErrorCapture={()=>setThumbnail('/no-image.webp')} src={thumbnail} className="h-auto w-28 object-contain maxlg:mx-auto" alt={props.item.title} />
      <div className="flex w-full flex-col justify-center gap-2">
        <div className="flex w-full justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold">{props.item.title}</h3>
          <button type="button" onClick={()=>DeleteFromCart()} className="grid h-7 w-7 px-2 place-items-center rounded-full bg-b3/10 maxlg:absolute maxlg:right-0 maxlg:top-0">
            {delLoading ? <RiDeleteBin6Line className="animate-pulse text-sm text-red-500" /> : <RiDeleteBin6Line className="text-sm text-b3" />}
          </button>
        </div>
        <div className="space-y-2">
          <span className="text-xs font-medium">Qty: {props.item.quantity}</span>
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
          {props.item.condition == 'certified-refurbished' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-cyan px-2 py-1 text-[8px] font-semibold text-white xs:px-3 xs:text-xs">Certified Refurbished</div>}
          {props.item.condition == 'like-new-open-box' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-light-cyan px-2 py-1 text-[8px] font-semibold text-white xs:px-3 xs:text-xs">Like New / Open Box</div>}
          {props.item.condition == 'used-part-a-condition-grade' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-2 py-1 text-[8px] font-semibold text-white xs:px-3 xs:text-xs">Used • Grade B</div>}
          {props.item.condition == 'used-part-b-condition-grade' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-2 py-1 text-[8px] font-semibold text-white xs:px-3 xs:text-xs">Used • Grade B</div>}
          {props.item.condition == 'used-part-c-condition-grade' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-2 py-1 text-[8px] font-semibold text-white xs:px-3 xs:text-xs">Used • Grade C</div>}
          {props.item.condition == 'used-part-d-condition-grade' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-2 py-1 text-[8px] font-semibold text-white xs:px-3 xs:text-xs">Used • Grade D</div>}
            </div>
          </div>
          <div className="space-x-1">
           <span className="text-sm font-semibold text-b3">${props.item.is_sale ? props.item.sale_price : props.item.regular_price}</span>
           {props.item.is_sale ? <strike className="text-xs text-b25">${props.item.regular_price}</strike>:null} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCartCard;
