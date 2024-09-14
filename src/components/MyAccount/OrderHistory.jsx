'use client'
import React, { useEffect, useState } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import { IoIosArrowForward } from "react-icons/io";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import moment from 'moment'
import { BiLoaderAlt } from "react-icons/bi";


const OrderHistory = () => {

  const [loading,setLoading] = useState(false)
  const [orders,setOrders] = useState([])
  const UserId = useSelector((state)=>state.auth.id)

  const GetOrderHistory = async () => {
    setLoading(true)
    fetch(`/api/user/profile/orders/?userId=${UserId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    if (data.success) {
      setOrders(data.orders)
    }
    setLoading(false) 
   }).catch((error)=>{
     toast.error('Something went wrong!')
   })
  }

  useEffect(()=>{
    GetOrderHistory()
  },[])

  return (
    <>
      <MyAccount>
       {loading ? 
        <div className='flex justify-center items-center w-full h-full' ><BiLoaderAlt className='text-2xl animate-spin' /></div> : 
        orders.length > 0 ? 
        <OrderHistoryData orders={orders} /> : 
        <div>No data?</div>}
      </MyAccount>
    </>
  );
};

export default OrderHistory;

const OrderHistoryData = ({orders}) => {

  const [drp,setDrp] = useState(false)

  const ItemWithCat = ({data,Key}) => {

    const [itemDrp,setItemDrp] = useState(false)

    return (
     <div key={Key} className={`flex flex-col gap-5 ${itemDrp ? 'h-auto overflow-none' : 'h-20 overflow-hidden'}`} >  
      <div onClick={()=>setItemDrp(!itemDrp)} className='flex items-center justify-between cursor-pointer' >
       <div className='flex items-center gap-3' >
        <div className='border-2 rounded-md px-1 py-1' ><Image src={data.cat_image} width={100} height={100} className='w-14 h-14' /></div>
        <span className='text-sm' >{data.cat_title}</span>
       </div>
       <div className='flex gap-5' >
         <span className='text-sm' >{data.items.length} Items</span>
         <IoIosArrowForward className={itemDrp ? 'rotate-90' : ''} />
       </div>
      </div>
      {/* Inner Items */}
      <div className='flex flex-col gap-3 px-3' >
      <div className='flex items-center py-2 rounded-sm justify-between text-sm bg-gray-200' >
        <div className='flex gap-20 ml-3' >
          <span >Image</span>
          <span>Title</span>
        </div>
        <div className='flex gap-5 mr-3' >
          <span>Price</span>
          <span>Qty</span>
          <span>Total</span>
        </div>
      </div>
      {data.items.map((item,i)=>(
       <div key={i} className='flex justify-between' >
       <div className='flex items-center gap-3' >
        <div className='border-2 rounded-md px-1 py-1' ><Image src={item.thumbnail} width={100} height={100} className='w-14 h-14' /></div>
        <span className='text-sm' >{item.title}</span>
       </div>
       <div className='flex items-center gap-5 mr-3' >
         <span className='text-sm' >${item.is_sale ? item.sale_price : item.regular_price}</span>
         <span className='text-sm' >x {item.quantity}</span>
         <span className='text-sm font-bold' >${item.is_sale ? item.sale_price : item.regular_price * item.quantity}</span>
       </div>
       </div>
       ))}
      </div>

     </div>
    )
  }

  return <>
   <div>
   {orders.map((order,i)=>
   <div key={i} className={`flex flex-col gap-8 ${drp ? 'h-auto overflow-none' : 'h-20 overflow-hidden'} border-b-2 border-gray-200`} >
    <div onClick={()=>setDrp(!drp)} className='flex justify-between cursor-pointer' >
     <div className='flex flex-col gap-3' >
      <span className='font-bold text-sm' >Order # <span className='text-red-500' >{order.order_no}</span></span>
      <span className='text-xs' >{moment(order.createdAt).format('MMM D, YYYY')} at {moment(order.createdAt).format('HH:MM A')} • 4 Items</span>
     </div>
     <div className='flex items-center gap-5' >
      <div className='flex flex-col gap-3' >
       <span className='text-b3 text-sm font-bold' >${order.grand_total}</span>
       <span className='text-xs' >{order.order_status}</span>
      </div>
       <IoIosArrowForward className={drp ? 'rotate-90' : ''} />
     </div>
    </div>

    {/* Order Items */}
     <div className='flex flex-col gap-3 mb-1 mx-3' >
      {/* Order Category Item */}
     {order.items.map((item,i)=>(
       <ItemWithCat Key={i} data={item} />
      ))}
     </div>

     <div className='flex flex-col items-end border-t-2' >
      <div className='flex gap-5 w-3/12 text-sm my-3' >
       <div className='flex flex-col gap-2' >
        <span className='font-bold' >Subtotal</span>
        <span className='font-bold' >Shipping</span>
        <span className='font-bold' >Vat</span>
        <span className='font-bold text-lg' >Grand Total</span>
       </div>
       <div className='flex flex-col gap-2' >
        <span className='font-bold' >${order.sub_total}</span>
        <span className='font-bold' >$0</span>
        <span className='font-bold' >${order.vat}</span>
        <span className='font-bold text-lg' >${order.grand_total}</span>
       </div>
      </div>
     </div>
    
   </div>
    )}
   </div>
  </>;
};

export { OrderHistoryData };
