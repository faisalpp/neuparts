import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { removeCoupon,removeTax,setShipping,applyCoupon,resetCartFinance, setSubTotal, setOnlySubTotal, setTax, setOnlyShipping, addCoupon, setOnlyTax } from '../../../store/adminCart';
import { IoIosCloseCircle } from "react-icons/io";
import Toast from '../../../utils/Toast';
import { setGrandTotal } from '../../../store/adminCart';

const OrderFinance = () => {

  const dispatch = useDispatch()
  const subTotal = useSelector((state)=>state.adminCart.subTotal);
  const tax = useSelector((state)=>state.adminCart.tax);
  const coupons = useSelector((state)=>state.adminCart.coupons);
  const grandTotal = useSelector((state)=>state.adminCart.grandTotal);
  const shipping = useSelector((state)=>state.adminCart.shipping);
  
  const HandleCouponDelete = (e,id) => {
    e.preventDefault()
    dispatch(removeCoupon(id))
  }

  const RemoveTax = () => {
    dispatch(removeTax())
  }

  const CART = useSelector((state)=>state?.admin?.cart?.products);
  const CalculateFinance = (e) => {
   e.preventDefault()

   let coupons_c = coupons;
   let shipping_c = shipping;
   let tax_c = tax;
   dispatch(resetCartFinance())
   let subTotal_n = 0;
   if(CART?.length > 0){
    for(let i=0;i<CART?.length;i++){
     let price = CART[i].isSale ? CART[i].salePrice : CART[i].regPrice
     let stotal = (price * CART[i].count)
     subTotal_n = subTotal_n + stotal
    }
   }else{
    return Toast('Cart is Empty!','error',1000)
   }
   const productTotal = subTotal_n;
  let coupon_p = 0;
  if(coupons_c.length > 0){
   for(let i=0;i<coupons_c.length;i++){
    //check coupon type if coupon is type percentage calculate percentage else if type is flat discount then just
    // normally minus the subtotal from coupon amount else the coupon is free then we can add isFreeShipping in coupon object.
    if(coupons_c[i].type === 'free-shipping'){
      dispatch(setShipping({...shipping_c,shipping:'Free'}))
      dispatch(applyCoupon(coupons_c[i]))
    }else if(coupons_c[i].type === 'percentage-discount'){
      const coupon_amount = ((coupons_c[i].amount / 100) * subTotal)
      dispatch(applyCoupon({type:'percentage-discount',amount:coupon_amount.toFixed(2),percentage:coupons_c[i].amount}))
      coupon_p += coupon_amount.toFixed(2);
    }else{
      dispatch(applyCoupon({type:'flat-rate',amount:coupons_c[i].amount}))
      coupon_p += coupons_c[i].amount;
    }
   }
  }

  // console.log(productTotal-coupon_p)
  const newSubTotal = productTotal-coupon_p;
  dispatch(setSubTotal(newSubTotal))

  let sh = 0;
  if(shipping_c.shipping !== 'Free'){
   sh = parseInt(shipping_c.shipping)
   console.log(sh)
   console.log(typeof(sh))
   dispatch(setShipping(shipping_c))
  }else{
    dispatch(setShipping(shipping_c))
  }

   const newGrandTotal = newSubTotal+tax_c + sh;
   dispatch(setTax(tax_c))
   dispatch(setGrandTotal(newGrandTotal))

  }

  return (
   <><tr className='border-b border-l border-r border-b6 text-xs' >
     <td className='px-2 py-3 font-semibold'>${subTotal}</td>
     <td className='flex flex-col items-center w-full justify-center mt-1 border-[1px] rounded-md  my-1' >
     {coupons.length > 0 ? coupons.map((coupon,indx)=><div className='flex items-center w-full text-[10px] justify-center border-b-[1px]' >
      <td key={indx} className='px-2 py-3 font-semibold capitalize'>{coupon.type}</td>|
      <td key={indx} className='px-2 py-3 font-semibold'>-${coupon.amount} <span onClick={e=>HandleCouponDelete(e,indx)} className='text-[8px] underline text-red-500 cursor-pointer' >Remove</span></td>
     </div>)
     :<td className='px-2 py-3 font-semibold'>$0</td>}
     </td>
     {/* <td className='px-2 py-3 font-semibold'>${coupons[0]?.amount}</td> */}
    <td className='px-2 py-3 font-semibold'>{shipping ? shipping.shipping:0}</td>
     <td className='px-2 py-3 font-semibold'><span className='flex items-center justify-center w-full' >${tax}{tax > 0 ?<span onClick={RemoveTax} ><IoIosCloseCircle className='text-red-500 text-sm cursor-pointer' /></span>:null}</span></td>
     <td className='px-2 py-3 font-semibold'>${grandTotal}</td>
     <td className='py-3 font-semibold' ><button onClick={CalculateFinance} className='bg-b6 text-white py-1 px-2 rounded-md' >Calculate</button></td>
   </tr>
   </>
  )
}

export default OrderFinance