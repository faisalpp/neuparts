import React from 'react'
import { Link} from 'react-router-dom'
import {BsFillTrashFill} from 'react-icons/bs'
import {BsPencil} from 'react-icons/bs'

const ShippingRow = () => {
  return (
    <tr className="border-b border-l border-r border-b6 text-xs">
        <td className="whitespace-nowrap px-5 py-3 capitalize font-semibold">USA</td>
        <td className="whitespace-nowrap  px-5 py-4 text-b7 font-medium">73301,73302</td>
        <td className="px-5 py-4 text-black font-medium">Description Here</td>
        <td className="px-5 py-4 text-red-500 font-medium">Express Shipping, Free Pickup</td>
        <td className="flex items-center justify-center whitespace-nowrap space-x-1 px-5 py-4">
         <Link title="Edit Zone" to={"/admin/update-shipping-zone/123"} className='flex items-center justify-center bg-b3 text-white hover:bg-white hover:text-b3 border-2 border-white hover:border-b3 text-sm px-2 w-fit rounded-full cursor-pointer py-2' ><BsPencil className="text-base" /></Link>
         <Link title="Delete Zone" to={`/admin/delete-section`} className='flex items-center justify-center bg-red-500/30 text-red-500 hover:bg-white hover:text-red-500 border-2 border-white hover:border-red-500 text-sm px-2 w-fit rounded-full cursor-pointer py-2' ><BsFillTrashFill className="text-base" /></Link>
        </td>
      </tr>
  )
}

export default ShippingRow