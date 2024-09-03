'use client'
import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import Link from 'next/link';
import moment from 'moment'
import { BiLoaderAlt } from "react-icons/bi";
import Image from 'next/image';
import Popup from '@/components/AdminDashboard/Popup';

const Page = ({params}) => {

  const [order,setOrder] = useState({})
  const [user,setUser] = useState({})
  const [loader,setLoader] = useState(true)

  const GetOrder = async () => {
   const res = await fetch(`/api/admin/order/single?id=${params.id}`,{method:'GET'})
   const data = await res.json()
  
   if(data.success){
    setOrder(data.order)
    setUser(data.user)
    setLoader(false)
   }

  }

  useEffect(()=>{
   GetOrder()
  },[])

  const orderStatus = ['Pending','On Hold','Cancelled','Completed'];
  const paymentStatus = ['Pending','Declined','Completed'];

  const [addressPopup,setAddressPopup] = useState(false)
  const [addressData,setAddressData] = useState({});

  const SaveAddress = async (type) => {
   if(type === 'shipping'){
    setAddressData({first_name:order.shipping_address.first_name,last_name:order.shipping_address.last_name})
   }
  }


  return (
    <>
    {/* Address Popup */}
    <Popup state={addressPopup} setState={setAddressPopup}>
        <form onSubmit={SaveAddress} className="mx-10 flex w-full flex-col py-5">
          <h1 className="text-center text-xl font-semibold">Create Review </h1>

          <div className="flex flex-col gap-3 py-10">
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                First Name
              </label>
              {/* <input name="name" value={formData.name} onChange={HandleChange} type="text" placeholder="John Doe" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" /> */}
            </div>
            <button className="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

    <div className='relative flex items-center justify-center w-full bg-white h-auto' >
     {/* Loader */}
     {loader ? 
     <div className='absolute top-0 flex items-center justify-center mt-10 w-11/12 bg-white/70 rounded-md h-full' >
      <BiLoaderAlt className='text-5xl animate-spin' />
     </div>
     :null}
     <div className='flex flex-col border-2 border-gray-300 mx-10 mt-10 px-5 py-5 w-full bg-white rounded-md h-full' >

      <div className='flex h-fit items-center gap-2 w-full' >
        <span className='text-red-500 font-bold text-xl' >Order #</span>
        <span className='font-bold text-xl' >{order.order_no}</span>
      </div>

      <div className='flex w-full mt-10' >
       <div className='border-2 w-4/12 rounded-l px-5 py-5' >
        <span className='font-bold text-md' >General Information</span>
        <div className='flex flex-col mt-2 text-sm' >
         <div className='flex items-center gap-2' ><span className='font-semibold' >Date</span><span className='border-2 px-2 py-1 rounded-md' >{moment(order.createdAt).format('YYYY-MM-DD HH:mm')}</span></div>
         
         <div className='flex gap-2 mt-2' >
         <div className='flex flex-col w-6/12' >
         <span className='font-semibold' >Order Status</span>
         <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value={order.order_status}>{order.order_status}</option>
          {orderStatus.filter((item)=> item != order.order_status).map((item,i)=>(
           <option key={i} value={item} >{item}</option> 
          ))}
         </select>
         </div>

         <div className='flex flex-col w-6/12' >
         <span className='font-semibold' >Payment Status</span>
         <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
         <option value={order.payment_status}>{order.payment_status}</option>
          {paymentStatus.filter((item)=> item != order.payment_status).map((item,i)=>(
           <option key={i} value={item} >{item}</option> 
          ))}
         </select>
         </div>
         </div>

         <div className='flex flex-col mt-2' >
         <div className='flex items-center' ><span className='font-bold text-sm' >Customer</span><div className='flex items-center gap-2 ml-auto' ><span className='text-blue-400 cursor-pointer underline' >Profile</span><span className='text-blue-400 cursor-pointer underline' >View other orders</span></div></div>
         <div className='border-2 px-3 py-2 rounded-lg bg-gray-50' >
          <span>{user.firstName} {user.lastName}, {user.email}</span>
         </div>
         </div>

        </div>
       </div>

       <div className='border-2 w-4/12 rounded-r px-5 py-5' >
        <div className='flex items-center' ><span className='font-bold text-sm' >Billing Address</span><FaEdit className='ml-auto cursor-pointer text-xl text-gray-500' /></div>
        <div className='flex flex-col text-sm text-gray-600 mt-2 gap-1' >
         <span>{loader ? 'N/A' : order.shipping_address.first_name} {loader ? 'N/A' : order.shipping_address.last_name}</span>
         <p>{loader ? 'N/A' : order.shipping_address.address}</p>
         <span>{loader ? 'N/A' : order.shipping_address.city}</span>
         <span>{loader ? 'N/A' : order.shipping_address.province}, {loader ? 'N/A' : order.shipping_address.country}</span>
         <span>{loader ? 'N/A' : order.shipping_address.postal_code}</span>
         <div className='flex gap-5' >
          <div className='flex flex-col mt-2' ><span className='font-bold text-black' >Email</span><Link href={loader ? 'N/A' : `mailto:${order.shipping_address.email}`} className='text-blue-400 cursor-pointer underline' >{loader ? 'N/A' : order.shipping_address.email}</Link></div>
          <div className='flex flex-col mt-2' ><span className='font-bold text-black' >Phone</span><Link href={loader ? 'N/A' : `tel:${order.shipping_address.phone}`} className='text-blue-400 cursor-pointer underline' >{loader ? 'N/A' : order.shipping_address.phone}</Link></div>
         </div>
        </div>
       </div>

       <div className='border-2 w-4/12 rounded-r px-5 py-5 ' >
       <div className='flex items-center' ><span className='font-bold text-sm' >Shipping Address</span><FaEdit className='ml-auto cursor-pointer text-xl text-gray-500' /></div>
       <div className='flex flex-col text-sm text-gray-600 mt-2 gap-1' >
         <span>{loader ? 'N/A' : order.billing_address.first_name} {loader ? 'N/A' : order.billing_address.last_name}</span>
         <p>{loader ? 'N/A' : order.billing_address.address}</p>
         <span>{loader ? 'N/A' : order.billing_address.city}</span>
         <span>{loader ? 'N/A' : order.billing_address.province}, {loader ? 'N/A' : order.billing_address.country}</span>
         <span>{loader ? 'N/A' : order.billing_address.postal_code}</span>
         <div className='flex gap-5' >
          <div className='flex flex-col mt-2' ><span className='font-bold text-black' >Email</span><Link href={loader ? 'N/A' : `mailto:${order.billing_address.email}`} className='text-blue-400 cursor-pointer underline' >{loader ? 'N/A' : order.shipping_address.email}</Link></div>
          <div className='flex flex-col mt-2' ><span className='font-bold text-black' >Phone</span><Link href={loader ? 'N/A' : `tel:${order.billing_address.phone}`} className='text-blue-400 cursor-pointer underline' >{loader ? 'N/A' : order.shipping_address.phone}</Link></div>
         </div>
        </div>
       </div>
      
      </div>

      {/* Order Items */}
      <div className='flex flex-col gap-5 border-2 mt-5 px-2 py-5 rounded-md' >
       
       {/* Items with category */}
       {!loader && order.items.length > 0 ? order.items.map((item,i)=>(
       <div key={i} className='flex flex-col gap-3 border-2 rounded-md px-2 py-2' >
        <div className='flex items-center gap-5' >
         {item.cat_image ? <div className='px-2 py-1 bg-gray-50 border-2 border-gray-300 rounded-md w-fit' ><Image src={item.cat_image} height={100} width={100} className='w-10 h-10' /></div> :
         <div className='px-2 py-1 bg-gray-50 border-2 border-gray-300 rounded-md w-fit' ><CiImageOn className='text-4xl' /></div>}
         <div><span className='text-sm text-gray-400' >Lorem Ipsum Doller Smit</span></div>
        </div>
        {/* Items Header */}
        <div className='flex bg-gray-100 rounded-md py-1' >
          <span className='flex justify-start ml-5 w-10/12' >Item</span>
          <div className='flex justify-center gap-8 w-2/12 mr-5' >
           <span>Cost</span>
           <span>Qty</span>
           <span>Total</span>
          </div>
        </div>
        {/* Items */}
        <div className='flex flex-col gap-2 mx-5' >
        {item.items.length > 0 ? item.items.map((it,i)=> (
          <div key={i} className='flex gap-5' >
          {it.thumbnail ? <div className='px-2 py-1 bg-gray-50 border-2 border-gray-300 rounded-md w-fit' ><Image src={it.thumbnail} height={100} width={100} className='w-10 h-10' /></div> :
         <div className='px-2 py-1 bg-gray-50 border-2 border-gray-300 rounded-md w-fit' ><CiImageOn className='text-4xl' /></div>}
          <div><Link href='/' className='text-sm underline text-gray-400' >{it.title}</Link></div>
          <div className='flex items-center gap-5 ml-auto mr-3' ><span>${it.is_sale ? it.sale_price : it.regular_price}</span><span>x 1</span><span>$200</span></div>
         </div>
        )) : null}  
         
        </div>

       </div> 
       ))
       :
       null
       }
       {/* Order Calculation */}
       <div className='flex justify-end gap-5 border-b-2 border-t-2 px-2 py-2' >
        <div className='flex flex-col gap-2' >
         <span className='text-black font-bold' >Items Subtotal</span>
         <span>Shipping</span>
         <span>Vat</span>
         <span className='text-black font-bold' >Order Total</span>
        </div>
        <div className='flex flex-col gap-2' >
         <span className='text-black font-bold' >${order.sub_total}</span>
         <span>${order.shipping?.rate}</span>
         <span>${order.vat}</span>
         <span className='text-black font-bold' >${order.grand_total}</span>
        </div>
        <div>

        </div>
       </div>

      </div>
     
     </div>
      
    </div>
    </>
  )
}

export default Page