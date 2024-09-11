'use client';
import React,{useState} from 'react';
import BreadCrumb from '@/components/Checkout/BreadCrumb';
import ReviewDetail from '@/components/Checkout/Shipping/ReviewDetail';
import PaymentMethod from '@/components/Checkout/Payment/PaymentMethod';
import LeftArrowSvg from '@/components/svgs/LeftArrowSvg';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderInfo,setOrderLoader,setOrderId } from '@/app/GlobalRedux/slices/OrderSlice';
import * as Yup from 'yup'
import {CardNumberElement,CardExpiryElement,CardCvcElement,useElements,useStripe} from '@stripe/react-stripe-js'
import Stripe from 'stripe'
import { toast } from 'react-toastify';



const Payment = () => {
  const dispatch = useDispatch()
  const elements = useElements()
  const stripe = useStripe()
  const StripeMain = Stripe(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY)

  const [billingSwitch,setBillingSwitch] = useState('')

  const [email,setEmail] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [address,setAddress] = useState('')
  const [apartment,setApartment] = useState('')
  const [city,setCity] = useState('')
  const [country,setCountry] = useState('usa')
  const [province,setProvince] = useState('alberta')
  const [postalCode,setPostalCode] = useState('')
  const [phone,setPhone] = useState('')
  const [saveAddress,setSaveAddress] = useState(false)


  const order = useSelector((state)=>state.order.orderInfo)
  const orderId = useSelector((state)=>state.order.orderId)
  const detail = `${order.shippingAddress.address} ${order.shippingAddress.apartment}, ${order.shippingAddress.city} ${order.shippingAddress.province}, ${order.shippingAddress.country}`
  const shipping = useSelector((state)=>state.cart.shippingMethod)
  const cartItems = useSelector((state)=>state.cart.items)
  const cartSubTotal = useSelector((state)=>state.cart.cartSubTotal)
  const Coupon = useSelector((state)=>state.cart.coupon)
  const cartVat = useSelector((state)=>state.cart.cartVat)
  const cartGrandTotal = useSelector((state)=>state.cart.cartGrandTotal)

  const orderValidationSchema = Yup.object().shape({
    items: Yup.array().required('Cart items are missing!'),
    shippingAddress: Yup.object().required('Shipping Address is missing!'),
    billingAddress: Yup.object().required('Billing Address is missing!'),
    billingAddress: Yup.object().required('Billing Address is missing!'),
    subTotal: Yup.string().required('Sub Total is missing!'),
    coupons: Yup.array(),
    vat: Yup.string().required('Vat is missing!'),
    grandTotal: Yup.string().required('Grand Total is missing!'),
   });

  const billingValidationSchema = Yup.object().shape({
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

   const PreDataSave = async () => {
    const data = {
      items: cartItems,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      subTotal: cartSubTotal,
      vat: cartVat,
      shipping:shipping,
      grandTotal: cartGrandTotal,
      coupons: Coupon.status ? [Coupon] : []
    };
  
    try {
      await orderValidationSchema.validate(data, { abortEarly: false });
    } catch (error) {
      dispatch(setOrderLoader());
      if (error) {
        let errors = error.errors;
        errors.forEach((item) => {
          toast.error(item);
        });
        return false;  // Return false to indicate validation failure
      }
    }
  
    try {
      const response = await fetch('/api/front/order/pre-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
      if (result.success) {
        return result;
      }

      toast.error('Something went wrong!');
      return false;  // Return false if the response indicates failure

    } catch (error) {
      dispatch(setOrderLoader());
      toast.error('Something went wrong!');
      return false;  // Return false if there is an error in the fetch request
    }
  };
  

   const HandleStripe = async () => {
    if(!stripe && !elements){
      toast.error('Gateway not found!')
      dispatch(setOrderLoader())
      return false;
     }
 
     const getPaymentIntent = await StripeMain.paymentIntents.create({
      amount: cartGrandTotal*100,currency:'usd',description:"Neuappliance Parts Card Transaction",
      automatic_payment_methods:{enabled:false},
      payment_method_types:['card']
     });

     const CardNumber = elements.getElement(CardNumberElement)
     
     //Use the intant to make payment
     const paymentIntent =  await stripe.confirmCardPayment(getPaymentIntent.client_secret,{
      payment_method:{
        card: CardNumber,
        billing_details:{
         name: `${order.billingAddress.firstName} ${order.billingAddress.lastName}`,
         email:order.billingAddress.email,
         address:{line1:order.billingAddress.address,city:order.billingAddress.city,country:'us',postal_code:order.billingAddress.postalCode,state:order.billingAddress.state}
        },
       },
     });

     //api to change order status to Pending
     
     return paymentIntent

   }


  const PostOrder = async (data) => {
    try {
      const response = await fetch('/api/front/order/post-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
      if (result.success) {
        return result;
      }

      return false;  // Return false if the response indicates failure

    } catch (error) {
      dispatch(setOrderLoader());
      toast.error('Something went wrong!');
      return false;  // Return false if there is an error in the fetch request
    } 
  }


  const SubmitOrder = async () => {
   dispatch(setOrderLoader())

   if(billingSwitch === 'billing_address'){
    try{
      const billingAddr = { email:email,firstName:firstName,lastName:lastName,address:address,apartment:apartment,city:city,country:country,province:province,postalCode:postalCode,phone:phone,saveAddress:saveAddress}
      await billingValidationSchema.validate(billingAddr, { abortEarly: false }); 
      dispatch(setOrderInfo({...order,billingAddress:billingAddr}))
    }catch(error){
     dispatch(setOrderLoader())  
     if (error) {let errors = error.errors;
      errors.forEach((item)=>{toast.error(item);})
      return;
     }
    }
   }

   //Todo: pre payment order save in database with status 
   const isSaved = await PreDataSave();

   if(isSaved.success){
    dispatch(setOrderId(isSaved.order_id))
    const isPaid = await HandleStripe()
    if(isPaid?.error){
      toast.error(isPaid.error.message)
      await PostOrder({orderId:orderId,intent:{status:false},paymentStatus:'Declined'})
      dispatch(setOrderLoader())
      return
    }
    const Intent = isPaid.paymentIntent.client_secret;
    await PostOrder({orderId:isSaved.order_id,intent:{data:Intent,status:true},paymentStatus:'Completed'})
    dispatch(setOrderLoader())
    toast.success('Order placed successfully!')
   }

  }

  return (
    <>
      {/* Logo */}
      <Image width={200} height={200} quality={100} src="/neu-blue.webp" alt="Neu parts" />
      {/* Bread Crumbs Start */}
      <BreadCrumb />
      {/* Bread Crumbs End */}

      {/* Shipping */}

      <div className="flex flex-col gap-3 rounded-md border border-b31 p-3">
        <ReviewDetail title="Contact" detail={order.shippingAddress.email} textStyle="font-medium" />
        <hr />
        <ReviewDetail title="Ship to" detail={detail} textStyle="font-medium" />
        <hr />
        {shipping.method === 'Shipping' ?
        <ReviewDetail title="Method" detail={`Home Delivery · $${shipping.rate}`} subtitle="1 to 7 business days" textStyle="font-medium" />
        :  
        <ReviewDetail title="Method" detail="George Town Warehouse · Free" subtitle="10 AM To 6PM" textStyle="font-medium" />
      }
      </div>

      {/* Payment Method */}

      <PaymentMethod 
        billingSwitch={billingSwitch}
        setBillingSwitch={setBillingSwitch}
        email={email}
        setEmail={setEmail}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        address={address}
        setAddress={setAddress}
        apartment={apartment}
        setApartment={setApartment}
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
        province={province}
        setProvince={setProvince}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        phone={phone}
        setPhone={setPhone}
        saveAddress={saveAddress}
        setSaveAddress={setSaveAddress}
        CardNumber={CardNumberElement}
        CardExpiry={CardExpiryElement}
        CardCvc={CardCvcElement}
      />

      {/* Payment Step */}
      <div className="mt-5 flex w-full items-center justify-between">
        <Link href="/mycart/shipping" className="flex items-center gap-1">
          <LeftArrowSvg />
          <span className="text-sm font-medium text-b3">Return to shipping</span>
        </Link>
        <button onClick={SubmitOrder} className="rounded-lg bg-b3 px-6 py-3 text-xs text-white" type="button">
          Pay Now
        </button>
      </div>
    </>
  );
};

export default Payment;
