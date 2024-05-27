import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';

const Checkout = (props) => {
  const orderInfo = '';

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-b1/10 px-5 py-10 md:p-10">
      <h2 className="text-xl font-bold text-b16">Order Summary</h2>
      <div className="flex justify-between text-b1">
        <span>6 Items</span>
        <span>$2,279.00</span>
      </div>
      <div className="flex justify-between text-b1">
        <span>Delivery Fee</span>
        <span>-</span>
      </div>
      <hr className="border-[rgba(0,0,0,0.08)]" />
      <div className="flex justify-between text-b1">
        <span>Order Total</span>
        <span className="text-2xl">-</span>
      </div>
      <Link href="/mycart/information" className="button-hover flex justify-center gap-2 rounded-lg px-4 py-3 text-xs font-semibold text-white">
        <span>Proceed to Checkout</span>
        <AiOutlineArrowRight className="text-base" />
      </Link>
    </div>
  );
};

export default Checkout;
