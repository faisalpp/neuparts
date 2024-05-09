import React, { useState } from 'react'
import Popup from '../Popup'
import TextInput from '../../TextInput/TextInput'
import { setCoupon,applyCoupon,setShipping,setSubTotal } from '../../../store/adminCart'
import { useDispatch, useSelector } from 'react-redux'
import Toast from '../../../utils/Toast'
import { CheckCoupon } from '../../../api/admin/order'

const Coupon = ({state,setState}) => {

  const dispatch = useDispatch()
  const coupons = useSelector((state)=>state.adminCart.coupons)
  const [flat,setFlat] = useState(0)
  const [couponCode,setCouponCode] = useState('')
  const SHIPPING = useSelector((state)=>state.adminCart.shipping)
  const SUB_TOTAL = useSelector((state)=>state.adminCart.subTotal)
  const CART_PRODUCTS = useSelector((state)=>state?.admin?.cart?.products);

  const ApplyCouponFlatRate = () => {
    if(flat === 0){
      Toast('Flat Rate Required!','error',1000)
    }else{
      const obj = {type:'flat',amount:parseInt(flat)}
      dispatch(applyCoupon(obj))
      setState(false)
      setFlat(0)
      Toast('Flat Rate Applied!','info',1000)
    }
  }
  
  const ApplyCouponCode = async () => {
    if(!couponCode){
     return Toast('Coupon Code Required!','error',1000)
    }
    const res = await CheckCoupon({code:couponCode})
    console.log(res)
    if(res.status === 200){
    const getCoupon = res.data.coupon;
    
    // 1.1. Check Coupon Count (Max Count)
    const findDup = coupons.filter((item)=> item.code === getCoupon.code)
    if(findDup?.length >= getCoupon.maxCount ){
      return Toast(`Coupon is Valid For ${getCoupon.maxCount} Times Only!`,'error',1000)
    }
    // 1.2. Check Individual Use Only
    if(getCoupon.singleUse && coupons?.length > 0){
      return Toast('Coupon is Valid For Single Use Only!','error',1000)
    }
    // 2. check minimum and maximum amount spend on cart subTotal if no min and max continue to
    //  next step else check for min and max and if success then continue else show error
    if(getCoupon.min.isMin){
      if(SUB_TOTAL < getCoupon.min.amount){
        return Toast(`Coupon Required Minimum $${getCoupon.min.amount} in Cart SubTotal!`,'error',1000)
      }
    }
    if(getCoupon.max.isMax){
      if(SUB_TOTAL > getCoupon.max.amount){
        return Toast(`Coupon Required Maximum $${getCoupon.max.amount} in Cart SubTotal!`,'error',1000)
      }
    }
    // 3. then check if excSale is true then check cart sale products if sale products present then show
    // Error else continue to next step 
    if(getCoupon.excSale){
      for(let i=0;i<CART_PRODUCTS.length;i++){
        if(CART_PRODUCTS.isSale){
          return Toast('Coupon is Not Valid for Sale Products!','error',1000)
        }
      }
    }
    // 4. check coupon type if coupon is type percentage calculate percentage else if type is flat discount then just
    // normally minus the subtotal from coupon amount else the coupon is free then we can add isFreeShipping in coupon object.
    if(getCoupon.type === 'free-shipping'){
      dispatch(setShipping({...SHIPPING,shipping:'Free'}))
      dispatch(applyCoupon({type:'free-shipping',code:couponCode,amount:getCoupon.amount}))
      setCouponCode('')
      setState(false)
      return Toast('Coupon Applied!','success',1000)
    }

    if(getCoupon.type === 'percentage-discount'){
      const coupon_amount = ((getCoupon.amount / 100) * SUB_TOTAL)
      dispatch(applyCoupon({type:'percentage',code:couponCode,amount:coupon_amount.toFixed(2),percentage:getCoupon.amount}))
    }else{
      dispatch(applyCoupon({type:'flat-rate',code:couponCode,amount:getCoupon.amount}))
    }
    setCouponCode('')
    setState(false)
    }else{
     Toast(res.data.message,'error',1000)
    }
  }



  return (
    <Popup state={state} setState={setState} zindex="z-[99]" >
    <div className='w-full' >
     <h3 className='text-center font-semibold' >Add Coupen</h3>
     <div className='flex mt-3' >
      <div className='flex flex-col space-y-2 items-center w-1/2' >
       <TextInput width="full" name="postalCode" title="Coupon Code" iscompulsory="false" type="text" value={couponCode} onChange={(e) =>setCouponCode(e.target.value)} placeholder="Coupon Code" />
       <button onClick={ApplyCouponCode} className='text-xs bg-b6 px-3 py-1 rounded-lg text-white' >Apply</button>
      </div>
      <div className='flex items-center text-sm px-2 font-semibold ' >
        <h3>Or</h3>
      </div>
      <div className='flex flex-col space-y-2 items-center w-1/2' >
       <TextInput width="full" name="postalCode" title="Flat Rate" iscompulsory="false" type="text" value={flat} onChange={(e) =>setFlat(e.target.value)} placeholder="Flat Rate" />
       <button onClick={ApplyCouponFlatRate} className='text-xs bg-b6 px-3 py-1 rounded-lg text-white' >Apply</button>
      </div>
     </div>
    </div> 
   </Popup>
  )
}

export default Coupon