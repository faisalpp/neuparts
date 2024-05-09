import React from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const ChkLoader = () => {

  return (
     <>
      <div className='fixed flex flex-col space-y-5 items-center justify-center top-0 w-full h-screen z-40 bg-white' >
      <AiOutlineLoading3Quarters className='text-b6 text-6xl animate-spin' />
      <div className='flex flex-col items-center' >
        <h4 className='font-semibold text-sm' >Your order’s being processed.</h4>
        <p className='font-medium text-sm' >Please wait while we process your order.</p>
      </div>
     </div>
     </>
  )
}

export default ChkLoader