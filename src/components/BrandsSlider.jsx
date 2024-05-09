import Image from 'next/image';
import React from 'react'
import Marquee from "react-fast-marquee";

const BrandsSlider = () => {
   return (
      <>
         {/* Brands Logo Slider Auto Start */}
         <div className='bg-white py-5' >
            <h4 className='text-center text-sm' >BRANDS WE SELL</h4>
            <div className='relative mt-2' >
               <Marquee velocity={12}>
                  <Image width={1000} height={1000} className='w-full h-auto' alt="amana" src="/amana.webp" />
                  <Image width={1000} height={1000} className='w-full h-auto' alt="maytag" src="/maytag.webp" />
                  <Image width={1000} height={1000} className='w-full h-auto' alt="frigdaire" src="/frigdaire.webp" />
                  <Image width={1000} height={1000} className='w-full h-auto' alt="haier" src="/haier.webp" />
                  <Image width={1000} height={1000} className='w-full h-auto' alt="hisense" src="/hisense.webp" />
                  <Image width={1000} height={1000} className='w-full h-auto' alt="kenmore" src="/kenmore.webp" />
                  <Image width={1000} height={1000} className='w-full h-auto' alt="lg" src="/lg.webp" />
                  <Image width={1000} height={1000} className='w-full h-auto' alt="samsung" src="/samsung.webp" />
                  <Image width={1000} height={1000} className='w-full h-auto' alt="whirlpool" src="/whirlpool.webp" />
                  <Image width={1000} height={1000} className='w-full h-auto' alt="midea" src="/midea.webp" />
               </Marquee>
            </div>
         </div>
         {/* Brands Logo Slider Auto End */}
      </>
   )
}

export default BrandsSlider