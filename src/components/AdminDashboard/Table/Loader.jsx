"use client"

import React from 'react'

const Loader = () => {
  return (
    <tr className="bg-white dark:bg-gray-900">
    <td className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
        <p className="w-32 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
        <p className="w-48 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
        <p className="w-64 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    </td>
   </tr>
  )
}

export default Loader