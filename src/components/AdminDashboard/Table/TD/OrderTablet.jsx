import React from 'react'

const OrderTablet = ({type,text}) => {
 
if(type === 'payment'){
 return (
  <td className="px-6 py-5">
   {text === 'Completed' ?  <span className="text-md inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-green-50 px-2 py-1 font-semibold text-green-600">{text}</span> : null}
   {text === 'Pending' ?  <span className="text-md inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-orange-50 px-2 py-1 font-semibold text-orange-600">{text}</span> : null}
   {text === 'Declined' ?  <span className="text-md inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-red-50 px-2 py-1 font-semibold text-red-600">{text}</span> : null}
  </td>
 )
}

if(type === 'order'){
 return (
  <td className="px-6 py-5">
   {text === 'Completed' ?  <span className="text-md inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-green-50 px-2 py-1 font-semibold text-green-600">{text}</span> : null}
   {text === 'Pending' ?  <span className="text-md inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-orange-50 px-2 py-1 font-semibold text-orange-600">{text}</span> : null}
   {text === 'Cancelled' ?  <span className="text-md inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-red-50 px-2 py-1 font-semibold text-red-600">{text}</span> : null}
  </td>
 )
}
  
}

export default OrderTablet