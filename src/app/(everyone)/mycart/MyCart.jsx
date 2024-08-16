'use client';
import React, { useState } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { BsCart3 } from 'react-icons/bs';
import Checkout from '@/components/Cart/Checkout';
import Loader2 from '@/components/Loader/Loader2';
import Image from 'next/image';
import CartCard from './CartCard';
import { useSelector } from 'react-redux';

const MyCart = () => {
  const CartItems = useSelector((state)=>state.cart.items)
  const cartCount = useSelector((state)=>state.cart.cartCount)
  const cartId = useSelector((state)=>state.cart.cartId)
  const subTotal = useSelector((state)=>state.cart.cartSubTotal)

  const [loading, setLoading] = useState(false);

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
          {CartItems.length > 0 ? (
            <div className="maincontainer pb-10 lg:pb-16 xl:pb-20">
              <div className="grid grid-cols-1 gap-10 2xl:grid-cols-[1fr_440px] coxxl:grid-cols-[1fr_360px]">
                <div className="order-2 space-y-14 rounded-2xl border border-b1/10 p-5 md:p-8 coxxl:order-none">
                  {/* Cart Card */}

                  {/* First */}
                  {CartItems.map((cat, index) => (
                    <div key={index}>
                      <div className="mb-6 flex items-center gap-3 rounded-xl border border-b8 bg-b3/10 p-4">
                        <div className="w-[74px] rounded bg-white p-1.5">
                          <Image width={200} height={200} quality={100} className="h-auto w-[68px]" src={cat.cat_image} alt="calendar_month" />
                        </div>
                        <h3 className="text-sm font-semibold text-b1">{cat.cat_title}</h3>
                      </div>
                      <div className="grid w-full grid-cols-1 gap-10 lg:gap-12">{cat.items.map((item, pindex) => <CartCard indx={`${pindex}-item`} key={`${pindex}-item`} catId={cat.cat_id} cartId={cartId} item={item} />)}</div>
                    </div>
                  ))}

                  {/* End Cart */}
                  <hr className="border-[hsla(0,0%,0%,0)] md:my-6 maxmd:!my-4" />
                  <div className="flex w-full flex-wrap items-center justify-between gap-2 maxmd:!mt-0">
                    <span className="text-base font-semibold text-black sm:text-xl">Subtotal ({cartCount} Items):</span>
                    <div className="text-2xl font-semibold sm:text-32px">${subTotal}</div>
                  </div>
                </div>
                <div>
                  <Checkout cartCount={cartCount} total={subTotal} />
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
