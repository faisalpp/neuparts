import Image from 'next/image'
import React from 'react'

const HomeImagesSection = () => {
  return (
    <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col w-full' >
      <div className='relative xl:w-1/2 w-full' ><div className='absolute xl:left-8 lg:left-8 top-20 w-full' ><span className='flex justify-center w-full' ><Image className='xl:w[593px] xl:h-[90px] lg:w-9/12 h-auto w-10/12' src="/ht1.webp" alt='' quality={100} width={1000} height={1000} /></span></div><Image src="/h1.webp" className='w-full h-auto' width={1000} height={1000} quality={100} alt='h1' /></div>
      <div className='relative xl:w-1/2 w-full' ><div className='absolute top-20 w-full' ><span className='flex justify-center w-full' ><Image className='xl:w[593px] xl:h-[90px] lg:w-9/12 w-10/12 h-auto' src="/ht2.webp" alt='' width={1000} height={1000} quality={100} /></span></div><Image src="/h2.webp" className='w-full h-auto' alt='h2' width={1000} height={1000} quality={100} /></div>
    </div>
  )
}

export default HomeImagesSection