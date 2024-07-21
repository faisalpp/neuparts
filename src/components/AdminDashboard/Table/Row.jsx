"use client"

import React from 'react'

const Row = ({children,Key,isDragable,draggableProps,Ref}) => {
 if(isDragable){
   return (
     <tr ref={Ref} {...draggableProps} className="hover:bg-gray-50">
      {children}
    </tr>
  )
}else{
  return (
    <tr key={Key} className="hover:bg-gray-50">
      {children}
    </tr>
  ) 
} 
}

export default Row