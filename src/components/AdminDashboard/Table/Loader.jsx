"use client"

import React from 'react'

const Loader = ({count,rows}) => {

 const cols = Array.from({length:count});
 const Rows = Array.from({length:rows});

  return (
  <>
  {Rows.map((_,i)=> (
   <tr key={`tr-${i}`} className="bg-white dark:bg-gray-900">
   {cols.map((_,i)=>
     <td key={`td-${i}`} className='py-5' ><p className="w-32 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p></td>
    )} 
   </tr>
  ))}
  </>
  )
}

export default Loader