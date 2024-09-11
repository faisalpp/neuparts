'use client';
import React from 'react';
import UpdateButton from '@/components/Checkout/UpdateButton';
import BreadCrumb from '@/components/Checkout/BreadCrumb';
import ReviewDetail from '@/components/Checkout/Shipping/ReviewDetail';
import ShippingMethod from '@/components/Checkout/Shipping/ShippingMethod';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const Shipping = () => {

  const order = useSelector((state)=>state.order.orderInfo)
 
  const detail = `${order.shippingAddress.address} ${order.shippingAddress.apartment}, ${order.shippingAddress.city} ${order.shippingAddress.province}, ${order.shippingAddress.country}`

  return (
    <>
      {/* Logo */}
      <Image width={200} height={200} quality={100} src="/neu-blue.webp" alt="Neu parts" />
      {/* Bread Crumbs Start */}
      <BreadCrumb />
      {/* Bread Crumbs End */}

      {/* Shipping */}

      <div className="flex flex-col gap-3 rounded-md border border-b31 p-3">
        <ReviewDetail title="Contact" detail={order.shippingAddress.email} />
        <hr />
        <ReviewDetail title="Ship to" detail={detail} />
      </div>

      {/* Shipping Method */}
      <ShippingMethod />

      {/* Next Step */}
      <UpdateButton prevTitle="information" nextTitle="payment" prevLink="/mycart/information" nextLink="/mycart/payment" />
    </>
  );
};

export default Shipping;
