"use client"

import React from 'react'

const NoData = ({colspan,alert}) => {
  return (
    <tr className='flex justify-center' >
     <td colSpan={colspan} className='py-5 text-red-500 text-md' >{alert}</td>
    </tr>
  )
}

export default NoData