"use client"

import React from 'react'
import Image from 'next/image'

const TdImage = ({src,css}) => {
  return (
    <td className='py-5 px-5' >
      <img src={`${src}`} className={css} />
    </td>
  )
}

export default TdImage