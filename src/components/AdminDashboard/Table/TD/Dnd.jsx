"use client"

import React from 'react'
import { RxDragHandleDots2 } from "react-icons/rx";

const Tablet = ({provider}) => {
  return (
    <td className="px-6 py-5">
     <span title='Draggable' {...provider.dragHandleProps} >
       <RxDragHandleDots2 className='cursor-grab text-2xl' />
     </span>
    </td>
  )
}

export default Tablet