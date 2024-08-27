'use client';
import React, { useState } from 'react';
import RadioSvg from '@/components/svgs/RadioSvg';
import { FaLock } from 'react-icons/fa';
import CustomInput from '@/components/Reusable/CustomInput';
import Image from 'next/image';
import { RiQuestionFill } from 'react-icons/ri';
import CustomSelect from '@/components/Reusable/CustomSelect';
import { Checkbox, Radio, Typography } from '@material-tailwind/react';

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

  const [email,setEmail] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [address,setAddress] = useState('')
  const [appartment,setAppartment] = useState('')
  const [city,setCity] = useState('')
  const [country,setCountry] = useState('usa')
  const [province,setProvince] = useState('alberta')
  const [postalCode,setPostalCode] = useState('')
  const [phone,setPhone] = useState('')
  const [saveAddress,setSaveAddress] = useState(false)

  const Countrys = [{name:'US',value:'US'}];
  const Provinces = [{name:'Alberta',value:'Alberta'}];

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

      <div className='rounded-md border border-b31 px-3 py-3 mt-3' >
      <div className="space-y-14px">
        <h3 className="text-lg font-medium text-b16">Billing address</h3>
        <div className="grid grid-cols-2 gap-3">
          <CustomInput state={firstName} setState={setFirstName} colorStyle="border-b31 placeholder:text-b25" placeholder="First name (optional)" />
          <CustomInput state={lastName} setState={setLastName} colorStyle="border-b31 placeholder:text-b25" placeholder="Last name" />
          <div className="col-span-2 space-y-3">
            <CustomInput state={address} setState={setAddress} colorStyle="border-b31 placeholder:text-b25" placeholder="Address" />
            <CustomInput state={appartment} setState={setAppartment} colorStyle="border-b31 placeholder:text-b25" placeholder="Apartment, suite, etc. (optional)" />
            <CustomInput state={city} setState={setCity} colorStyle="border-b31 placeholder:text-b25" placeholder="City" />
            <div className="grid grid-cols-2 gap-14px md:grid-cols-3">
              <CustomSelect setState={setCountry} id="country_region" label="Country / region" Options={Countrys} />
              <CustomSelect setState={setProvince} id="province" label="Province" Options={Provinces} />
              <div className="relative col-span-2 md:col-span-1 [&>*]:h-full">
                <CustomInput state={postalCode} setState={setPostalCode} colorStyle="border-b31 placeholder:text-b25  md:h-full" placeholder="Postal Code" type="number" />
              </div>
            </div>
            <div className="relative">
              <CustomInput state={phone} setState={setPhone} colorStyle="border-b31 placeholder:text-b25" placeholder="Phone" />
              <div className="absolute right-3 top-2">
                <RiQuestionFill className="text-2xl text-b3" />
              </div>
            </div>
            <div className="[&>*]:text-sm [&>*]:text-b16">
              <Checkbox onChange={e=>handleCheckbox(e)} name="saveAddress" id="save-information" label="Save this information for next time" className="border-b31 checked:bg-black" ripple={false} />
            </div>
          </div>
        </div>
      </div>
      </div>


    </div>
  );
};

export default PaymentMethod;
