'use client';
import React from 'react';
import CustomInput from '@/components/Reusable/CustomInput';
import CartCard from '@/components/Checkout/CartCard';
import { HiOutlineTruck } from 'react-icons/hi';

const Cart = () => {
  return (
    <>
      <div className="bg-gradient h-full w-full max-w-full px-4 py-14 sm:px-11">
        <div className="mr-auto flex w-full max-w-[418px] flex-col gap-5 3xl:max-w-xl">
          <div className="flex w-full flex-col gap-6 rounded-lg bg-white px-4 py-4 sm:px-6">
            <CartCard />
            <CartCard />
            <CartCard />
          </div>
          <hr />
          <div className="flex w-full items-center gap-14px">
            <CustomInput colorStyle="border-b31 placeholder:text-b25" placeholder="Discount code" />
            <button type="buttton" className="rounded-lg bg-b3 p-3 px-4 text-sm font-medium text-white">
              Apply
            </button>
          </div>
          <hr />
          <div className="flex flex-col gap-3 [&>*]:text-sm">
            <div className="flex justify-between">
              <span className="text-b32">Subtotal</span>
              <span className="font-medium text-b16">$120.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-b32">Shipping</span>
              <span className="font-medium text-b25">*Calculated at next step</span>
            </div>
            <div className="flex justify-between">
              <span className="text-b32">Taxes</span>
              <span className="font-medium text-b16">$5.00</span>
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <span className="font-medium text-b16">Total</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-b16">USD</span>
              <span className="text-2xl font-semibold tracking-032 text-b3">$125.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
