'use client';
import React from 'react';
import BreadCrumb from '@/components/Checkout/BreadCrumb';
import ReviewDetail from '@/components/Checkout/Shipping/ReviewDetail';
import PaymentMethod from '@/components/Checkout/Payment/PaymentMethod';
import LeftArrowSvg from '@/components/svgs/LeftArrowSvg';
import Link from 'next/link';
import Image from 'next/image';

const Payment = () => {
  return (
    <>
      {/* Logo */}
      <Image width={200} height={200} quality={100} src="/neu-blue.webp" alt="Neu parts" />
      {/* Bread Crumbs Start */}
      <BreadCrumb />
      {/* Bread Crumbs End */}

      {/* Shipping */}

      <div className="flex flex-col gap-3 rounded-md border border-b31 p-3">
        <ReviewDetail title="Contact" detail="name@example.com" textStyle="font-medium" />
        <hr />
        <ReviewDetail title="Ship to" detail="151 O’Connor St Ground floor, Ottawa ON K2P 2L8, Canada" textStyle="font-medium" />
        <hr />
        <ReviewDetail title="Method" detail="Canada Post Expedited Parcel · $10.00" subtitle="1 to 7 business days" textStyle="font-medium" />
      </div>

      {/* Payment Method */}

      <PaymentMethod />

      {/* Payment Step */}
      <div className="mt-5 flex w-full items-center justify-between">
        <Link href="/mycart/shipping" className="flex items-center gap-1">
          <LeftArrowSvg />
          <span className="text-sm font-medium text-b3">Return to shipping</span>
        </Link>
        <Link href="" className="rounded-lg bg-b3 px-6 py-3 text-xs text-white" type="button">
          Pay Now
        </Link>
      </div>
    </>
  );
};

export default Payment;
