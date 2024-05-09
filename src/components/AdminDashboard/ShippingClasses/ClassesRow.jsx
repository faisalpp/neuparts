import React from 'react'
import {BsPencil,BsFillTrashFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

const ClassesRow = () => {
  return (
    <tr className="border-b border-l border-r border-b6 text-xs">
        <td className="whitespace-nowrap px-5 py-3 capitalize font-semibold">Discount Products</td>
        <td className="whitespace-nowrap  px-5 py-4 text-b7 font-medium">Description Here</td>
        <td className="px-5 py-4 text-black font-medium">0</td>
        <td className="flex items-center justify-center whitespace-nowrap space-x-1 px-5 py-4">
         <button title="Edite Class" type="button" className='flex items-center justify-center bg-b3 text-white hover:bg-white hover:text-b3 border-2 border-white hover:border-b3 text-sm px-2 w-fit rounded-full cursor-pointer py-2' ><BsPencil className="text-base" /></button>
         <NavLink title="Delete Class" to={`/admin/delete-shipping-class`} className='flex items-center justify-center bg-red-500/30 text-red-500 hover:bg-white hover:text-red-500 border-2 border-white hover:border-red-500 text-sm px-2 w-fit rounded-full cursor-pointer py-2' ><BsFillTrashFill className="text-base" /></NavLink>
        </td>
      </tr>
  )
}

export default ClassesRow