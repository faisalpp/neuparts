'use client';
import React, { useState } from 'react';
import { RiQuestionFill } from 'react-icons/ri';
import CustomInput from '@/components/Reusable/CustomInput';
import { Checkbox, Radio, Typography } from '@material-tailwind/react';
import UpdateButton from '@/components/Checkout/UpdateButton';
import BreadCrumb from '@/components/Checkout/BreadCrumb';
import CustomSelect from '@/components/Reusable/CustomSelect';
import Image from 'next/image';
import RadioSvg from '@/components/svgs/RadioSvg';

const Information = () => {
  const [country, setCountry] = useState('canada');
  const [province, setProvince] = useState('alberta');
  const Countrys = [
    { name: 'Canada', value: 'canada' },
    { name: 'China', value: 'china' },
    { name: 'Japan', value: 'japan' },
    { name: 'Pakistan', value: 'pakistan' },
  ];
  const Provinces = [
    { name: 'Alberta', value: 'alberta' },
    { name: 'Alberta', value: 'alberta' },
    { name: 'Alberta', value: 'alberta' },
    { name: 'Alberta', value: 'alberta' },
  ];
  return (
    <>
      {/* Logo */}
      <Image width={200} height={200} quality={100} src="/neu-blue.webp" alt="Neu parts" />
      {/* Bread Crumbs Start */}
      <BreadCrumb />
      {/* Bread Crumbs End */}

      <fieldset className="rounded-md border border-b31 px-5 pb-5 pt-2">
        <legend className="mx-auto px-3 text-sm font-medium text-b16">Express checkout</legend>
        <div className="grid grid-cols-3 gap-2">
          <button className="flex justify-center rounded bg-[#5A31F4] p-3 text-white">
            <Image width={200} height={200} quality={100} src="/payment/shoppay.webp" alt="shoppay" className="h-[23px] object-contain" />
          </button>
          <button className="flex justify-center rounded bg-[#113984] p-3 text-white">
            <Image width={200} height={200} quality={100} src="/payment/paypal.webp" alt="shoppay" className="h-[23px] object-contain" />
          </button>
          <button className="flex justify-center rounded bg-black p-3 text-white">
            <Image width={200} height={200} quality={100} src="/payment/pay.webp" alt="shoppay" className="h-[23px] object-contain" />
          </button>
        </div>
      </fieldset>
      {/* Bread Crumbs End */}
      <div className="text_between_line my-8">OR</div>
      {/* Conatct Information */}
      <div className="space-y-14px [&>*>*]:text-sm [&>*>*]:!text-b16">
        <h3 className="text-sm font-medium text-b16">Contact information</h3>
        <CustomInput colorStyle="border-b31 placeholder:text-b25" placeholder="Email" type="email" />
        <Checkbox id="keep-me-update" label="Keep me up to date on news and exclusive offers" className="border-b31 checked:bg-black" ripple={false} />
      </div>
      <div className="my-8 space-y-14px">
        <h3 className="text-sm font-medium text-b16">Delivery method</h3>
        <div className="mt-14px rounded-md border border-b31 [&>*:last-child]:border-0 [&>*]:border-b [&>*]:border-b31">
          <DeliveryRadio name="delivery_method" id="ship" icon="shipment.png" title="Ship" checked={true} />
          <DeliveryRadio name="delivery_method" id="pickup" icon="pick-up.png" title="Pick up" />
        </div>
      </div>
      {/* Shipping */}
      <div className="space-y-14px">
        <h3 className="text-lg font-medium text-b16">Shipping address</h3>
        <div className="grid grid-cols-2 gap-3">
          <CustomInput colorStyle="border-b31 placeholder:text-b25" placeholder="First name (optional)" />
          <CustomInput colorStyle="border-b31 placeholder:text-b25" placeholder="Last name" />
          <div className="col-span-2 space-y-3">
            <CustomInput colorStyle="border-b31 placeholder:text-b25" placeholder="Address" />
            <CustomInput colorStyle="border-b31 placeholder:text-b25" placeholder="Apartment, suite, etc. (optional)" />
            <CustomInput colorStyle="border-b31 placeholder:text-b25" placeholder="City" />
            <div className="grid grid-cols-2 gap-14px md:grid-cols-3">
              <CustomSelect setState={setCountry} id="country_region" label="Country / region" Options={Countrys} />
              <CustomSelect setState={setProvince} id="province" label="Province" Options={Provinces} />
              <div className="col-span-2 md:col-span-1 [&>*]:h-full">
                <CustomInput colorStyle="border-b31 placeholder:text-b25  md:h-full" placeholder="Postal Code" type="number" />
              </div>
            </div>
            <div className="relative">
              <CustomInput colorStyle="border-b31 placeholder:text-b25" placeholder="Phone" />
              <div className="absolute right-3 top-2">
                <RiQuestionFill className="text-2xl text-b3" />
              </div>
            </div>
            <div className="[&>*]:text-sm [&>*]:text-b16">
              <Checkbox id="save-information" label="Save this information for next time" className="border-b31 checked:bg-black" ripple={false} />
            </div>
          </div>
        </div>
      </div>
      {/* Next Step */}
      <UpdateButton prevTitle="Cart" nextTitle="Shipping" prevLink="/mycart" nextLink="/mycart/shipping" />
    </>
  );
};

export default Information;

const DeliveryRadio = ({ id, title, labelImage, checked, name, customStyle, icon }) => {
  return (
    <div className="flex w-full justify-between gap-3 p-4 [&>div>label]:!py-0">
      <Radio
        id={id}
        icon={<RadioSvg className="h-[18px] w-[18px]" />}
        className="h-[18px] w-[18px] border border-[#D9D9D9] bg-white !p-0"
        ripple={false}
        name={name}
        label={
          <div className="flex items-center gap-2">
            <Image src={'/svgs/' + icon} className="h-5 w-4 object-contain" width={200} height={200} alt="visa" />
            <Typography className="flex items-center gap-1 text-sm font-medium tracking-032 text-b16">
              {labelImage ? <img src={'/payment/' + labelImage} className="h-[23px] object-contain" alt={title} /> : null}
              <span className={customStyle}>{title}</span>
            </Typography>
          </div>
        }
        defaultChecked={checked}
      />
    </div>
  );
};
