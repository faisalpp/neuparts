import React,{useState} from 'react'
import { Radio, Typography } from "@material-tailwind/react";
import RadioSvg from '../../../svgs/RadioSvg';
import { FaLock } from 'react-icons/fa';
import CustomInput from '../../Reusable/CustomInput';
import TextInput from '../../TextInput/TextInput';
import CreditCard from './CreditCard';
import {SiAmericanexpress} from 'react-icons/si'
import {FaCcMastercard} from 'react-icons/fa'


const PaymentRadio = ({ id, title, labelImage, checked, name, customStyle,change}) => {
    return (
        <div className='flex justify-between w-full gap-3 p-4'>
            <Radio id={id} onChange={(e)=>change(e)} icon={<RadioSvg className="w-[18px] h-[18px]" />} className='border border-[#D9D9D9] bg-white p-0 w-[18px] h-[18px]' ripple={false} name={name} label={
                <div>
                    <Typography className="font-medium tracking-032 flex items-center gap-1 text-sm text-b16">
                        {
                            labelImage ?
                                <img src={'/payment/' + labelImage} className='h-[23px] object-contain' alt={title} />
                                : null
                        }
                        <span className={customStyle}>
                            {title}
                        </span>
                    </Typography>
                </div>
            } checked={checked} />
        </div>
    )
}

const PaymentRadio2 = ({ id, title,labelImage, checked, name, customStyle,change}) => {
    return (
        <div className='flex justify-between w-full gap-3 p-4'>
            <Radio id={id} onChange={(e)=>change(e)} icon={<RadioSvg className="w-[18px] h-[18px]" />} className='border border-[#D9D9D9] bg-white p-0 w-[18px] h-[18px]' ripple={false} name={name} label={
                <div>
                    <Typography className="font-medium tracking-032 flex items-center gap-1 text-sm text-b16">
                        {
                            labelImage?.length > 0 ?
                                labelImage.map((img)=><img src={'/payment/' + img} className='h-[23px] object-contain' alt={title} />)
                                : null
                        }
                        <span className={customStyle}>
                            {title}
                        </span>
                    </Typography>
                </div>
            } checked={checked===name?true:false} />
        </div>
    )
}

const PaymentMethod = ({CardNumber,CardExpiry,CardCvc,handleCardPayment,payment,setPayment,setBilling,billing}) => {

    const [sameAddress,setSameAddress] = useState(true)

    const handleBilling = (e) => {
      const value = e.target;
      if(value.name === 'shipping_address'){
         setSameAddress(value.checked)
         setBilling(false)
      }
      if(value.name === 'billing_address'){
          setBilling(value.checked)
          setSameAddress(false)
      }
    }

    const handlePaymentMod = (e) => {
      setPayment(e.target.name)
    }

    return (
        <div>
            {/* Payment */}
            <div className='space-y-14px mt-8'>
                <h3 className='text-lg font-medium text-b16'>Payment</h3>
                <p className='flex gap-1 items-center text-sm text-b32 font-medium'>
                    <FaLock className='text-b3 text-xs' /> All transactions are secure and encrypted.
                </p>
                <div className='[&>*]:border-b [&>*]:border-b31 [&>*:last-child]:border-0 border border-b31 rounded-md'>
                    <PaymentRadio2 customStyle="font-medium" change={handlePaymentMod} name="card" id="credit_card" checked={payment} labelImage={['visa.png','master.png','express.png']} />                    
                    {/* <CreditCard/> */}
                    <form onSubmit={handleCardPayment} className='p-4 bg-[#F9F9F9] grid grid-cols-1 gap-14px'>
                    
                    <div className='relative flex justify-center items-center h-10 bg-[#F9F9F9]' >
                    <div className={`bg-white text-sm outline-none border-[1px] border-b31 w-full px-4 h-10 rounded-lg`} >
                      <CardNumber className='py-3' />
                      <div className='absolute right-4 top-0 h-full flex items-center' ><img className='w-[18px] h-[18px]' src="/svgs/lock.webp" /></div>
                    </div>
                    </div>
                    <div className='grid grid-cols-2 gap-14px'>
                     <div className='relative flex justify-center items-center h-10 bg-[#F9F9F9]' >
                     <div className={`bg-white text-sm outline-none border-[1px] border-b31 w-full px-4 h-10 rounded-lg`} >
                       <CardExpiry className='py-3' />
                     </div>
                     </div>
                     <div className='relative flex justify-center items-center h-10 bg-[#F9F9F9]' >
                     <div className={`bg-white text-sm outline-none border-[1px] border-b31 w-full px-4 h-10 rounded-lg`} >
                       <CardCvc className='py-3' />
                     </div>
                     </div>
                    </div>
                    </form>
                    <PaymentRadio2 name="paypal" change={handlePaymentMod} checked={payment} labelImage={["pay_paypal.webp"]} id="paypal" />
                    <PaymentRadio2 name="affirm" change={handlePaymentMod} checked={payment} id="affirm" labelImage={["affirm.webp"]} />
                </div>
            </div>

            {/* Billing Address */}
            <div className='mt-8'>
                <h3 className='text-lg font-medium text-b16'>Billing address</h3>
                <p className='flex gap-1 items-center text-sm text-b32'>
                    Select the address that matches your card of payment method.
                </p>
                <div className='mt-14px [&>*]:border-b [&>*]:border-b31 [&>*:last-child]:border-0 border border-b31 rounded-md'>
                    <PaymentRadio checked={sameAddress} change={handleBilling} name="shipping_address" id="shipping_address" title="Same as shipping address"  />
                    <PaymentRadio checked={billing} change={handleBilling}  name="billing_address" id="billing_address" title="Use a different billing address" />
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod