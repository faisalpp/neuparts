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
import { useDispatch, useSelector } from 'react-redux';
import { setOrderInfo } from '@/app/GlobalRedux/slices/OrderSlice';
import {calcShipping} from '@/app/GlobalRedux/slices/CartSlice'
import { useRouter } from 'next/navigation';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { BiLoaderAlt } from "react-icons/bi";
import {ExpressCheckoutElement,useElements,useStripe} from '@stripe/react-stripe-js'
import Stripe from 'stripe'

const Information = ({PRIVATE_KEY}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const orderInfo = useSelector((state)=>state.order.orderInfo)
  const ShippingMethod = useSelector((state)=>state.cart.shippingMethod)

  const [zipLoader,setZipLoader] = useState(false)

  const [email,setEmail] = useState(orderInfo?.shippingAddress?.email ? orderInfo?.shippingAddress?.email : '')
  const [keepUpdates,setKeepUpdates] = useState(orderInfo?.shippingAddress?.keepUpdates ? true : false)
  const [firstName,setFirstName] = useState(orderInfo?.shippingAddress?.firstName ? orderInfo?.shippingAddress?.firstName : '')
  const [lastName,setLastName] = useState(orderInfo?.shippingAddress?.lastName ? orderInfo?.shippingAddress?.lastName : '')
  const [address,setAddress] = useState(orderInfo?.shippingAddress?.address ? orderInfo?.shippingAddress?.address : '')
  const [apartment,setApartment] = useState(orderInfo?.shippingAddress?.apartment ? orderInfo?.shippingAddress?.apartment : '')
  const [city,setCity] = useState(orderInfo?.shippingAddress?.city ? orderInfo?.shippingAddress?.city : '')
  const [country,setCountry] = useState(orderInfo?.shippingAddress?.country ? orderInfo?.shippingAddress?.country : 'usa')
  const [province,setProvince] = useState(orderInfo?.shippingAddress?.province ? orderInfo?.shippingAddress?.province : 'alberta')
  const [postalCode,setPostalCode] = useState(orderInfo?.shippingAddress?.postalCode ? orderInfo?.shippingAddress?.postalCode : '')
  const [phone,setPhone] = useState(orderInfo?.shippingAddress?.phone ? orderInfo?.shippingAddress?.phone : '')
  const [saveAddress,setSaveAddress] = useState(orderInfo?.shippingAddress?.saveAddress ? true : false)
  const [shippingMethod,setShippingMethod] = useState(ShippingMethod?.method === 'Shipping' ? 'Shipping' : 'Pickup')

  const Countrys = [{name:'US',value:'US'}];
  const Provinces = [{name:'Alberta',value:'Alberta'}];

  useEffect(()=>{
    dispatch(calcShipping({method:shippingMethod,rate:'Free'}))
  },[])

   
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
     setShippingMethod('Shipping')
     fetch(`/api/check-zipcode/shipping?zip=${postalCode}`)
     .then((res)=>res.json())
     .then((data)=>{
      setZipLoader(false)
      setShippingMethod('Shipping')
      dispatch(calcShipping({method:'Shipping',rate:data.data.location.rate}))
     })
     .catch((error)=>{
      setZipLoader(false)
      dispatch(calcShipping({method:'Shipping',rate:'N/A'}))
      toast.error('Zip Code not applicable for shipping!')
     })
    }

   const handleOptionChange = (event) => {
    if(event.target.id === 'Shipping'){
     if(postalCode.length >= 5){
       GetShippingFare()
     }else{
      toast.error('Postal Code must have exactly 5 digits!')
     }
    }else{
      dispatch(calcShipping({method:event.target.id,rate:'Free'}))
      setShippingMethod(event.target.id);
    }
   };

   useEffect(() => {
    if(postalCode.length >= 5 && shippingMethod === 'Shipping'){
      GetShippingFare()
    }
   }, [postalCode])
   

   const orderValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is Required!'),
    firstName: Yup.string().nullable(),
    lastName: Yup.string().required('Last Name is Required!'),
    address: Yup.string().required('Address is Required!'),
    apartment: Yup.string().nullable(),
    city: Yup.string().required('City is Required!'),
    country: Yup.string().required('Country is Required!'),
    province: Yup.string().required('Province is Required!'),
    postalCode: Yup.string().required('Postal Code is Required!'),
    phone: Yup.string().required('Phone is Required!'),
   });

   const Submit = async () => {
    try{
      const shippingAddr = { email:email, keepUpdates:keepUpdates,firstName:firstName,lastName:lastName,address:address,apartment:apartment,city:city,country:country,province:province,postalCode:postalCode,phone:phone,saveAddress:saveAddress,shippingMethod:shippingMethod}
      const billingAddr = { email:email,firstName:firstName,lastName:lastName,address:address,apartment:apartment,city:city,country:country,province:province,postalCode:postalCode,phone:phone,saveAddress:false}
      await orderValidationSchema.validate(shippingAddr, { abortEarly: false }); 
      dispatch(setOrderInfo({shippingAddress:shippingAddr,billingAddress:billingAddr}))
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

  //  const elements = useElements()
   const stripe = useStripe()
  //  const StripeMain = Stripe(PRIVATE_KEY)

   const [isExpressAvailable,setExpressAvailable] = useState(false)

   useEffect(() => {
    if (!stripe) return; // Make sure Stripe is loaded

    const paymentRequest = stripe.paymentRequest({
      country: 'US', // Replace with your country
      currency: 'usd', // Replace with your currency
      total: {
        label: 'Total',
        amount: 5000, // Replace with the total amount in smallest unit (e.g., 5000 = $50.00)
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Check if the device supports express checkout methods
    paymentRequest.canMakePayment().then((result) => {
      if (result) {
        setExpressAvailable(true); // Express checkout is available on this device
      } else {
        setExpressAvailable(false); // Express checkout is not available
      }
    });
  }, [stripe]);

  return (
    <>
      {/* Logo */}
      <Image width={200} height={200} quality={100} src="/neu-blue.webp" alt="Neu parts" />
      {/* Bread Crumbs Start */}
      <BreadCrumb />
      {/* Bread Crumbs End */}
      {isExpressAvailable ?  <><ExpressCheckoutElement  /><div className="text_between_line my-8">OR</div></> : null}
      {/* <fieldset className="rounded-md border border-b31 px-5 pb-5 pt-2">
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
      </fieldset> */}
      {/* Bread Crumbs End */}
      
      {/* Conatct Information */}
      <div className="space-y-14px [&>*>*]:text-sm [&>*>*]:!text-b16">
        <h3 className="text-sm font-medium text-b16">Contact information</h3>
        <CustomInput state={email} setState={setEmail} colorStyle="border-b31 placeholder:text-b25" placeholder="Email" type="email" />
        <Checkbox checked={keepUpdates} onChange={e=>handleCheckbox(e)} name="keepUpdates" id="keep-me-update" label="Keep me up to date on news and exclusive offers" className="border-b31 checked:bg-black" ripple={false} />
      </div>
      <div className="my-8 space-y-14px">
        <h3 className="text-sm font-medium text-b16">Delivery method</h3>
        <div className="mt-14px rounded-md border border-b31 [&>*:last-child]:border-0 [&>*]:border-b [&>*]:border-b31">
        <DeliveryRadio name="delivery_method" id="Shipping" icon="shipment.png" title="Ship" checked={shippingMethod === 'Shipping'} onChange={handleOptionChange}/>
        <DeliveryRadio name="delivery_method" id="Pickup" icon="pick-up.png" title="Pickup" checked={shippingMethod === 'Pickup'} onChange={handleOptionChange} />
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
            <CustomInput state={apartment} setState={setApartment} colorStyle="border-b31 placeholder:text-b25" placeholder="Apartment, suite, etc. (optional)" />
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
              <Checkbox checked={saveAddress} onChange={e=>handleCheckbox(e)} name="saveAddress" id="save-information" label="Save this information for next time" className="border-b31 checked:bg-black" ripple={false} />
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