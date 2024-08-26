'use client';
import React, { useEffect, useState } from 'react';
import { RiQuestionFill } from 'react-icons/ri';
import LeftArrowSvg from '@/components/svgs/LeftArrowSvg';
import CustomInput from '@/components/Reusable/CustomInput';
import { Checkbox, Radio, Typography } from '@material-tailwind/react';
import BreadCrumb from '@/components/Checkout/BreadCrumb';
import CustomSelect from '@/components/Reusable/CustomSelect';
import Image from 'next/image';
import RadioSvg from '@/components/svgs/RadioSvg';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setOrderInfo } from '@/app/GlobalRedux/slices/OrderSlice';
import {calcShipping,setShippingStatus} from '@/app/GlobalRedux/slices/CartSlice'
import { useRouter } from 'next/navigation';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { BiLoaderAlt } from "react-icons/bi";

const Information = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [zipLoader,setZipLoader] = useState(false)

  const [email,setEmail] = useState('')
  const [keepUpdates,setKeepUpdates] = useState(false)
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
  const [shippingMethod,setShippingMethod] = useState({method:'Pickup',rate:'Free'})

  const Countrys = [{name:'US',value:'US'}];
  const Provinces = [{name:'Alberta',value:'Alberta'}];

   
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    if(name === 'keepUpdates'){
        setKeepUpdates(checked)
    }
    if(name === 'saveAddress'){
        setSaveAddress(checked)
    }
   }

   const GetShippingFare = async () => {
     setZipLoader(true)
     fetch(`/api/check-zipcode/shipping?zip=${postalCode}`)
     .then((res)=>res.json())
     .then((data)=>{
      setZipLoader(false)
      dispatch(calcShipping({method:'Shipping',rate:data.data.location.rate}))
     })
     .catch((error)=>{
      setZipLoader(false)
      dispatch(setShippingStatus())
      toast.error('Zip Code not applicable for shipping!')
     })
    }

   const handleOptionChange = async (event) => {
    if(event.target.id === 'Shipping'){
      setShippingMethod({method:'Shipping',rate:'Free'});
    }else{
      setShippingMethod({method:'Pickup',rate:'Free'});
    }
   };

   useEffect(() => {
    if(postalCode.length >= 5 && shippingMethod.method === 'Shipping'){
      GetShippingFare()
    }
   }, [postalCode])
   

   const orderValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is Required!'),
    firstName: Yup.string().nullable(),
    lastName: Yup.string().required('Last Name is Required!'),
    address: Yup.string().required('Address is Required!'),
    appartment: Yup.string().nullable(),
    city: Yup.string().required('City is Required!'),
    country: Yup.string().required('Country is Required!'),
    province: Yup.string().required('Province is Required!'),
    postalCode: Yup.string().required('Postal Code is Required!'),
    phone: Yup.string().required('Phone is Required!'),
   });

   const Submit = async () => {
    try{
      const obj = { email:email, keepUpdates:keepUpdates,firstName:firstName,lastName:lastName,address:address,appartment:appartment,city:city,country:country,province:province,postalCode:postalCode,phone:phone,saveAddress:saveAddress,shippingMethod:shippingMethod}
      await orderValidationSchema.validate(obj, { abortEarly: false }); 
      dispatch(setOrderInfo(obj))
      router.push('/mycart/shipping')
   }catch(error){ 
      if (error) {
          let errors = error.errors;
          errors.forEach((item)=>{
            toast.error(item);      
          })
        }
   }
   }


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
        <CustomInput state={email} setState={setEmail} colorStyle="border-b31 placeholder:text-b25" placeholder="Email" type="email" />
        <Checkbox onChange={e=>handleCheckbox(e)} name="keepUpdates" id="keep-me-update" label="Keep me up to date on news and exclusive offers" className="border-b31 checked:bg-black" ripple={false} />
      </div>
      <div className="my-8 space-y-14px">
        <h3 className="text-sm font-medium text-b16">Delivery method</h3>
        <div className="mt-14px rounded-md border border-b31 [&>*:last-child]:border-0 [&>*]:border-b [&>*]:border-b31">
        <DeliveryRadio name="delivery_method" id="Shipping" icon="shipment.png" title="Ship" checked={shippingMethod.method === 'Shipping'} onChange={handleOptionChange}/>
        <DeliveryRadio name="delivery_method" id="Pickup" icon="pick-up.png" title="Pickup" checked={shippingMethod.method === 'Pickup'} onChange={handleOptionChange} />
          </div>
      </div>
      {/* Shipping */}
      <div className="space-y-14px">
        <h3 className="text-lg font-medium text-b16">Shipping address</h3>
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
                {zipLoader ? <BiLoaderAlt className='absolute right-5 animate-spin text-red-500 z-10 ' /> : null }
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
      {/* Next Step */}
      <div className='flex justify-between items-center w-full mt-5'>
       <Link href={'/mycart'} className='flex gap-1 items-center'><LeftArrowSvg />
        <span className='text-sm font-medium text-b3'>Return to Cart</span>
       </Link>
       <button type='button' onClick={Submit} className='flex items-center py-3 px-6 text-xs rounded-lg bg-b3 text-white'>Continue to Shipping</button>
      </div>
    </>
  );
};

export default Information;

const DeliveryRadio = ({ id, title, labelImage, checked, name, customStyle, icon, onChange }) => {
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
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};