'use client';
import React from 'react';
import { Radio, Typography } from '@material-tailwind/react';
import RadioSvg from '@/components/svgs/RadioSvg';
import { useSelector } from 'react-redux';

const ShippingRadio = ({ id, title, subtitle, price, checked }) => {
  return (
    <div className="flex w-full justify-between gap-3 px-2 py-4">
      <Radio
        id={id}
        icon={<RadioSvg className="h-[18px] w-[18px]" />}
        className="h-[18px] w-[18px] border border-[#D9D9D9] bg-white p-0"
        ripple={false}
        name="shipping-method"
        label={
          <div>
            <Typography className="text-sm font-medium tracking-032 text-b16">{title}</Typography>
            <Typography className="text-xs tracking-032 text-b25">{subtitle}</Typography>
          </div>
        }
        defaultChecked={checked}
      />
      <div className="text-sm font-medium text-b16">{price}</div>
    </div>
  );
};

const ShippingMethod = () => {
  
  const shipping = useSelector((state)=>state.cart.shippingMethod)

  return (
    <div className="mt-8 space-y-14px">
      <h3 className="text-lg font-medium text-b16">Shipping method</h3>
      {shipping.method === 'Shipping' ? 
      <div className="rounded-md border border-b31 [&>*:last-child]:border-0 [&>*]:border-b [&>*]:border-b31">
        <ShippingRadio id="expedited" title="Home Delivery" subtitle="1 to 7 business days" price={`$${shipping.rate}`} checked={true} />
      </div>
      :
      <div className="rounded-md border border-b31 [&>*:last-child]:border-0 [&>*]:border-b [&>*]:border-b31">
        <ShippingRadio id="free" title="George Town Warehouse" subtitle="10 AM To 6PM" price="Free" checked={true} />
      </div>
      }
    </div>
  );
};

export default ShippingMethod;
