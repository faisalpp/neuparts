import React, { useState } from 'react';
import StockSvg from '../../svgs/StockSvg';
import ToolTip from '../ToolTip';
import { AiFillStar } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ChangeCartItemType, RemoveFromCart } from '../../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const CartCard = ({ order, type, indx, changeType }) => {
  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-lg text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="mt-2 flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  const dispatch = useDispatch();
  const cartId = useSelector((state) => state.cart.cartId);

  const total = useSelector((state) => state.cart.total);
  const cartCount = useSelector((state) => state.cart.cartCount);

  const [delLoading, setDelLoading] = useState(false);

  const RemoveCartItemData = async (e, index, cId, pId, oId, typ, pPrice, cCount, cTotal) => {
    e.preventDefault();

    setDelLoading({ index: index, type: typ });
    const data = { cartId: cId, pId, type: typ, price: pPrice, count: cCount, total: cTotal, objId: oId };
    const res = await dispatch(RemoveFromCart(data));
    if (res.payload.status === 200) {
      setDelLoading({ index: '', type: '' });
      Toast(res.payload.msg, 'success', 1000);
    } else {
      setDelLoading({ index: '', type: '' });
      Toast(res.payload.message, 'error', 1000);
    }
  };

  const PRICE = order.salePrice ? order.salePrice : order.regPrice;

  return (
    <div className="relative grid grid-cols-1 gap-5 rounded-2xl border border-[0px_10px_60px_0px_rgba(0,0,0,0.10)] p-4 shadow-[0px_10px_60px_0px_rgba(0,0,0,0.10)] sm:p-6 md:grid-cols-[160px_1fr] 3xl:gap-10">
      <div>
        <img src="/cart/mycart.webp" className="h-40 w-40" alt="" />
      </div>
      <div className="flex items-start gap-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-b18 sm:text-base md:text-lg md:leading-6 lg:text-xl">{order.title}</h3>
          <div className="flex  items-center gap-2 maxmd:justify-between">
            <div className="inline-flex items-center gap-2 rounded-full bg-b13 px-4 py-[10px] text-white">
              <StockSvg />
              <span className=" text-[12.408px] font-semibold sm:text-sm">In Stock</span>
            </div>
            <span className="text-[12.408px] font-medium text-[rgba(0,0,0,0.64)]">Only 2 left</span>
          </div>
          <div className="flex justify-between gap-2 lg:items-center maxlg:flex-col">
            <div className="flex items-center gap-4 maxsm:flex-wrap">
              <span className="text-xl font-semibold text-b3">${order.salePrice ? order.salePrice : order.regPrice}</span>
              {order.isSale ? (
                <span className="text-lg text-b25">
                  <strike>${order.regPrice}</strike>
                </span>
              ) : null}
              {order.isSale ? <span className="flex items-center whitespace-nowrap rounded-full bg-b4 px-3 py-2 text-sm font-semibold">- {(100 - (order.salePrice / order.regPrice) * 100).toFixed(0)}%</span> : null}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-[rgba(36,36,36,0.50)]">Cosmetic Rating</span>
                <span>
                  <ToolTip color="text-b3" />
                </span>
              </div>
              <div className="inline-flex items-center">
                <StarIconPrinter numberOfTimes={order.rating} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          {delLoading.index === indx && delLoading.type === type ? (
            <button type="button" className="right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-b3/10 p-2 maxcosm:absolute">
              <RiDeleteBin6Line className="text-base text-red-500" />
            </button>
          ) : (
            <button type="button" onClick={(e) => RemoveCartItemData(e, indx, cartId, order.pid, order._id, type, PRICE, cartCount, total)} className="right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-b3/10 p-2 maxcosm:absolute">
              <RiDeleteBin6Line className="text-base text-b3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
