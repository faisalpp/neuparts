"use client"

import React from 'react'

const Table = ({children,header}) => {

  return (
<div class="overflow-x-hidden overflow-y-scroll rounded-lg border border-gray-200 shadow-md w-full" style={{maxHeight:'calc(100vh - 300px)'}}>
  <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-50">
     {header?.length > 0 ? 
      <tr>{
      header.map((title,index)=>
        <th key={index} scope="col" class="px-6 py-4 font-medium text-gray-900">{title}</th>
      )}</tr> : null }
    </thead>
    <tbody class="divide-y divide-gray-200 border-t border-gray-100">
      {children}
    </tbody>
  </table>
</div>
  )
}

export default Table