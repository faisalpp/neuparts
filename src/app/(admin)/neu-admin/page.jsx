"use client"
import React from 'react'
import { FaBoxes } from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import BarChart from '@/components/AdminDashboard/charts/BarChart'
import PieChart from '@/components/AdminDashboard/charts/PieChart'

const page = () => {
  return (
    <div className='flex flex-col mx-10 my-10 gap-10' >
     <div className='grid grid-cols-4 gap-10 w-full' >
      <div className='flex flex-col gap-2 items-center justify-center bg-white border-2 h-40 rounded-lg shadow-lg' >
       <span className='bg-b3/20 px-3 py-3 rounded' ><FaBoxes className='text-2xl text-b3' /></span>
       <span className='text-xs font-semibold text-gray-400' >Orders</span>
       <span className='font-bold text-2xl' >$28K</span>
      </div>
      <div className='flex flex-col gap-2 items-center justify-center bg-white border-2 h-40 rounded-lg shadow-lg' >
       <span className='bg-b4/20 px-3 py-3 rounded' ><GiWashingMachine className='text-2xl text-b4' /></span>
       <span className='text-xs font-semibold text-gray-400' >Products</span>
       <span className='font-bold text-2xl' >2000</span>
      </div>
      <div className='flex flex-col gap-2 items-center justify-center bg-white border-2 h-40 rounded-lg shadow-lg' >
       <span className='bg-b10/20 px-3 py-3 rounded' ><FaUsers className='text-2xl text-b10' /></span>
       <span className='text-xs font-semibold text-gray-400' >Users</span>
       <span className='font-bold text-2xl' >28</span>
      </div>
      <div className='flex flex-col gap-2 items-center justify-center bg-white border-2 h-40 rounded-lg shadow-lg' >
       <span className='bg-darkpurple/20 px-3 py-3 rounded' ><FaBoxes className='text-2xl text-darkpurple' /></span>
       <span className='text-xs font-semibold text-gray-400' >Orders</span>
       <span className='font-bold text-2xl' >$28K</span>
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

     {/* Customer and order highlights */}
     <div className='grid grid-cols-12 gap-10 w-full' >
      <div className='col-start-1 col-end-6 rounded-lg bg-white border-2 shadow-lg h-72' >
       Latest Customers
      </div>
      <div className='col-start-6 col-end-13 rounded-lg bg-white border-2 shadow-lg h-72' >
        New Orders
      </div>
     </div>

    </div>
  )
}

export default page