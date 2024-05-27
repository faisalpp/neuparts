'use client';
import React, { useEffect, useState } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { BsCart3 } from 'react-icons/bs';
import Checkout from '@/components/Cart/Checkout';
import Loader2 from '@/components/Loader/Loader2';
import Image from 'next/image';
import CartCard from './CartCard';

const MyCart = () => {
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([
    { image: '/popular-parts.webp', isSale: true, title: 'Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for long text', quantity: 1, regPrice: 279.0, count: 1, salePrice: 279.0, condition: 'new' },
    { image: '/popular-parts.webp', isSale: true, title: 'Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for long text', quantity: 1, regPrice: 279.0, count: 1, salePrice: 279.0, condition: 'certified' },
    { image: '/popular-parts.webp', isSale: true, title: 'Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for long text', quantity: 1, regPrice: 279.0, count: 1, salePrice: 279.0, condition: 'used' },
  ]);
  const cartId = '';
  const cartCount = '';
  const total = '';

  return (
    <>
      {loading ? (
        <Loader2 />
      ) : (
        <>
          {/* Bread Crumbs Start */}
          <div className="maincontainer pb-10 pt-10">
            <div className="flex items-center">
              <h5 className="text-xs text-b3">Home</h5>
              <RiArrowDropRightLine className="text-xl text-b19" />
              <h5 className="text-xs text-[#5E5E5E]">Cart</h5>
            </div>
            <h1 className="mt-4 text-32px font-bold text-b18 lg:text-40px">My Cart</h1>
          </div>
          {products?.length > 0 ? (
            <div className="maincontainer pb-10 lg:pb-16 xl:pb-20">
              <div className="grid grid-cols-1 gap-10 2xl:grid-cols-[1fr_440px] coxxl:grid-cols-[1fr_360px]">
                <div className="order-2 space-y-14 rounded-2xl border border-b1/10 p-8 coxxl:order-none">
                  {/* Cart Card */}

                  {/* First */}
                  {[1, 2].map((item, index) => (
                    <div key={index}>
                      <div className="mb-6 flex items-center gap-3 rounded-xl border border-b8 bg-b3/10 p-4">
                        <div className="w-[74px] rounded bg-white p-1.5">
                          <Image width={200} height={200} quality={100} className="h-auto w-[68px]" src="/oven.webp" alt="calendar_month" />
                        </div>
                        <h3 className="text-sm font-semibold text-b1">GE 1.7 cu. ft. Over the Range Microwave with Convenience Cooking Controls</h3>
                      </div>
                      <div className="grid w-full grid-cols-1 gap-12">{products?.map((item, pindex) => Array.from({ length: item.count }).map((_, index) => <CartCard indx={`${pindex}-${index}-delivery`} key={`${pindex}-${index}-delivery`} cartId={cartId} item={item} type="delivery" />))}</div>
                    </div>
                  ))}

                  {/* End Cart */}
                  <hr className="my-6 border-[hsla(0,0%,0%,0)]" />
                  <div className="flex w-full items-center justify-between">
                    <span className="text-base font-semibold text-black sm:text-xl">Subtotal (4 Items):</span>
                    <div className="text-2xl font-semibold sm:text-32px">$$2,279.00</div>
                  </div>
                </div>
                <div>
                  <Checkout cartCount={cartCount} total={total} />
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-24 mt-10 flex h-full w-full flex-col items-center justify-center space-y-5 px-2">
              <Image src="/bag.webp" alt="bag" className="h-100px w-100px object-contain" width={400} height={400} quality={100} />
              <h1 className="text-xl font-bold">Your Cart is Empty</h1>
              <h2 className="text-center">Lorem Ipsum Doller Sit Amet, Consecture Audipicsing Elit</h2>
              <button type="button" className="xy-center button-hover w-2/12 rounded-lg py-3 text-sm font-medium text-white">
                <BsCart3 className="mr-2" /> Start Shopping
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyCart;
