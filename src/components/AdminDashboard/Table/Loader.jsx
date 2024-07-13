"use client"

import React from 'react'

const Loader = ({count}) => {

 const cols = Array.from({length:count});

  return (
  <tr className="bg-white dark:bg-gray-900">
   {cols.map((_,i)=>
     <td key={i} className='py-5' ><p className="w-32 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p></td>
   )} 
   </tr>
  )
}

export default Loader