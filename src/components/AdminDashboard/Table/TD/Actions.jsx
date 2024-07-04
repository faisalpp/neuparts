"use client"

import React from 'react'

const Actions = ({handleDelete,id,data,setFormData,setUpdatePopup}) => {

 const HandleEdit = () => {
   const {name,bio,avatar,role} = data;
   setFormData({id:id,name:name,bio:bio,avatar:avatar,role:role})
   setUpdatePopup(true)
 }

  return (
    <td className="px-6 py-5 font-medium">
      <span className="cursor-pointer text-red-700 hover:underline" onClick={()=>handleDelete(id)} >Delete</span>&nbsp;&nbsp;&nbsp;
      <span onClick={()=>HandleEdit()} className="text-blue-500 cursor-pointer hover:underline">Edit</span>
    </td>
  )
}

export default Actions