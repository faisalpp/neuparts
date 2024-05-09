import React from 'react'
import { Link } from 'react-router-dom'
import {BsFillArrowLeftSquareFill,BsFillArrowRightSquareFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import Toast from '../../../utils/Toast'
import {DecrementCart,IncrementCart} from '../../../store/adminSlice'
import {incSubTotal,decSubTotal} from '../../../store/adminCart'

const ProductRow = ({item}) => {

 const dispatch = useDispatch()
 const cartId = useSelector((state)=>state?.admin?.cart?._id)

 const DecQty = async (e, id,quantity,pPrice) => {
   e.preventDefault();
   const res = await dispatch(DecrementCart({cartId:cartId,productId:id,count:quantity}))
  if(res.payload.status === 200){
    dispatch(decSubTotal(pPrice))
   Toast('Product Quantity Decremented!','success',1000)
  }else if(res.payload.status === 500){
    Toast(res.payload.data.message,'error',1000)
   } else{
     Toast('Internal Server Error!','error',1000)
  }
 };

 const IncQty = async (e,id,pPrice) => {
    e.preventDefault()
   const res = await dispatch(IncrementCart({cartId:cartId,productId:id}))
   if(res.payload.status === 200){
    dispatch(incSubTotal(pPrice))
    Toast('Product Quantity Incremented!','success',1000)
   }else if(res.payload.status === 500){
     Toast(res.payload.data.message,'error',1000)
    } else{
      Toast('Internal Server Error!','error',1000)
   }
}
const productPrice = item.isSale ? item.salePrice : item.regPrice;
 const productTotal = productPrice * item.count;
 return (
   <tr className="border-b border-l border-r border-b6 text-xs font-semibold">
   <td className="whitespace-nowrap flex justify-center px-5 py-3"><img src={item.image} className='w-10' /></td>
   <td className="whitespace-nowrap px-5 py-3"><Link to={`/product/${item.title.toLowerCase().replace(/\s/g,'-')}`} className='underline text-b6' >{item.title}</Link></td>
   <td className="whitespace-nowrap px-5 py-3 text-b7 ">${productPrice}</td>
   <td className="whitespace-nowrap px-5 py-3">x</td>
   <td className="whitespace-nowrap px-1 py-3"><div className='flex justify-between w-14 items-center border-[1px] border-b6 rounded-md ml-5' ><BsFillArrowLeftSquareFill onClick={e=>DecQty(e,item.pid,item.count,productPrice)} className='text-b6 text-lg cursor-pointer' /> <span>{item.count}</span> <BsFillArrowRightSquareFill onClick={e=>IncQty(e,item.pid,productPrice)} className='cursor-pointer text-lg text-b6' /></div></td>
   <td className="whitespace-nowrap px-5 py-3 text-red-500">${productTotal}</td>
 </tr>
 )
}

export default ProductRow