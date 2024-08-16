'use client';
import React from 'react';
import { Radio, Typography } from '@material-tailwind/react';
import RadioSvg from '@/components/svgs/RadioSvg';
import { FaLock } from 'react-icons/fa';
import CustomInput from '@/components/Reusable/CustomInput';
import Image from 'next/image';

const PaymentRadio = ({ id, title, labelImage, checked, name, customStyle, icon }) => {
  return (
    <div className="flex w-full justify-between gap-3 p-4 [&>div>label]:!py-0">
      <Radio
        id={id}
        icon={<RadioSvg className="h-[18px] w-[18px]" />}
        className="h-[18px] w-[18px] border border-[#D9D9D9] bg-white !p-0"
        ripple={false}
        name={name}
        label={
          <div>
            <Typography className="flex items-center gap-1 text-sm font-medium tracking-032 text-b16">
              {labelImage ? <img src={'/payment/' + labelImage} className="h-[23px] object-contain" alt={title} /> : null}
              <span className={customStyle}>{title}</span>
            </Typography>
          </div>
        }
        defaultChecked={checked}
      />
      {icon && <Image src="/payment/credit_card.png" className="h-auto object-contain" width={200} height={200} alt="visa" />}
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div>
      {/* Payment */}
      <div className="mt-8 space-y-14px">
        <h3 className="text-lg font-medium text-b16">Payment</h3>
        <p className="flex items-center gap-1 text-sm font-medium text-b32">
          <FaLock className="text-xs text-b3" /> All transactions are secure and encrypted.
        </p>
        <div className="rounded-md border border-b31 [&>*:last-child]:border-0 [&>*]:border-b [&>*]:border-b31">
          <PaymentRadio customStyle="font-medium" name="payment_method" id="credit_card" title="Credit card" checked={true} icon={true} />
          <div className="grid grid-cols-1 gap-14px bg-[#F9F9F9] p-4">
            <CustomInput colorStyle="border-b31 placeholder:text-b25 placeholder:text-sm !text-sm" placeholder="Card number" icon="lock.webp" />
            <CustomInput colorStyle="border-b31 placeholder:text-b25 placeholder:text-sm !text-sm" placeholder="Name on card" />
            <div className="grid grid-cols-2 gap-14px">
              <CustomInput colorStyle="border-b31 placeholder:text-b25 placeholder:text-sm !text-sm" placeholder="Expiration date (MM / YY)" />
              <CustomInput colorStyle="border-b31 placeholder:text-b25 placeholder:text-sm !text-sm" placeholder="Security code" icon="question-fill.webp" />
            </div>
          </div>
        </div>
      </div>
      {/* Billing Address */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-b16">Billing address</h3>
        <p className="flex items-center gap-1 text-sm text-b32">Select the address that matches your card of payment method.</p>
        <div className="mt-14px rounded-md border border-b31 [&>*:last-child]:border-0 [&>*]:border-b [&>*]:border-b31">
          <PaymentRadio name="billing_address" id="shipping_address" title="Same as shipping address" checked={true} />
          <PaymentRadio name="billing_address" id="billing_address" title="Use a different billing address" />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
