import React from 'react'
import Product from './Product'

const page = async ({param}) => {
  const { slug } = param;
  return (
    <Product slug={slug}/>
  )
}

export default page
