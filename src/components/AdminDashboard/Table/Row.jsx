"use client"

import React from 'react'

const Row = ({children,Key}) => {
  return (
    <tr key={Key} className="hover:bg-gray-50">
      {children}
    </tr>
  )
}

export default Row