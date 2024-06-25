"use client"

import React from 'react'

const Actions = ({handleDelete,id}) => {
  return (
    <td className="px-6 py-5 font-medium">
      <span onClick={()=>handleDelete(id)} >Delete</span>&nbsp;&nbsp;&nbsp;
      <a href="" className="text-primary-700">Edit</a>
    </td>
  )
}

export default Actions