"use client"

import Link from 'next/link'
import React from 'react'

const Actions = ({handleDelete,id,data,handleEdit,isEditLink,editLink}) => {

  return (
    <td className="px-6 py-5 font-medium">
      <span className="cursor-pointer text-red-700 hover:underline" onClick={()=>handleDelete(id)} >Delete</span>&nbsp;&nbsp;&nbsp;
      {isEditLink ? 
      <Link href={editLink} ><span className="text-blue-500 cursor-pointer hover:underline">Edit</span></Link>
      :
      <span onClick={()=>handleEdit(data)} className="text-blue-500 cursor-pointer hover:underline">Edit</span>
      }
    </td>
  )
}

export default Actions