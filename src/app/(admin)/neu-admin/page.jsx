import React from 'react'
import { FaBoxes } from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import BarChart from '@/components/AdminDashboard/charts/BarChart'
import PieChart from '@/components/AdminDashboard/charts/PieChart'
import { FaCartPlus } from "react-icons/fa6";
import Product from '@/models/product'
import User from '@/models/user'
import Cart from '@/models/cart'
import Order from '@/models/order'

const page = async () => {

  const products = await Product.countDocuments({is_variant:true});
  const users = await User.countDocuments();
  const carts = await Cart.countDocuments();
  const orders = await Order.countDocuments();

  return (
    <div className='flex flex-col mx-10 my-10 gap-10' >
     <div className='grid grid-cols-4 gap-10 w-full' >
      <div className='flex flex-col gap-2 items-center justify-center bg-white border-2 h-40 rounded-lg shadow-lg' >
       <span className='bg-b3/20 px-3 py-3 rounded' ><FaBoxes className='text-2xl text-b3' /></span>
       <span className='text-xs font-semibold text-gray-400' >Orders</span>
       <span className='font-bold text-2xl' >{orders}</span>
      </div>
      <div className='flex flex-col gap-2 items-center justify-center bg-white border-2 h-40 rounded-lg shadow-lg' >
       <span className='bg-b4/20 px-3 py-3 rounded' ><GiWashingMachine className='text-2xl text-b4' /></span>
       <span className='text-xs font-semibold text-gray-400' >Products</span>
       <span className='font-bold text-2xl' >{products}</span>
      </div>
      <div className='flex flex-col gap-2 items-center justify-center bg-white border-2 h-40 rounded-lg shadow-lg' >
       <span className='bg-b10/20 px-3 py-3 rounded' ><FaUsers className='text-2xl text-b10' /></span>
       <span className='text-xs font-semibold text-gray-400' >Customers</span>
       <span className='font-bold text-2xl' >{users}</span>
      </div>
      <div className='flex flex-col gap-2 items-center justify-center bg-white border-2 h-40 rounded-lg shadow-lg' >
       <span className='bg-darkpurple/20 px-3 py-3 rounded' ><FaCartPlus className='text-2xl text-darkpurple' /></span>
       <span className='text-xs font-semibold text-gray-400' >Active Carts</span>
       <span className='font-bold text-2xl' >{carts}</span>
      </div>
     </div>
     {/* bar and pie chart */}
     <div className='grid grid-cols-12 gap-10 w-full' >
      <div className='col-start-1 col-end-9 py-3 rounded-lg shadow-lg bg-white border-2 h-80' >
       <BarChart/>
      </div>
      <div className='col-start-9 col-end-13 rounded-lg bg-white border-2 shadow-lg h-72' >
        <PieChart/>
      </div>
     </div>

    </div>
  )
}

export default page