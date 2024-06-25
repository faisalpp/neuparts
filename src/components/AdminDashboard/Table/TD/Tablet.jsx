"use client"

import React from 'react'

const Tablet = ({text}) => {
  return (
    <td className="px-6 py-5">
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-md font-semibold text-green-600">
        {text}
      </span>
    </td>
  )
}

export default Tablet