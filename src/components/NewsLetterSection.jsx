'use client'
import React, { useState } from 'react'
import InputCheckbox from './InputCheckbox'
import Link from 'next/link'
import Image from 'next/image'

const NewsLetterSection = ({ backimage }) => {


  const [email, setEmail] = useState('')

  const SubscribeNews = async (e) => {
    e.preventDefault()
    // const res = await subscribeNewLetter({email:email})
    // if(res.status === 200){
    //   Toast(res.data.msg,'success',1000)
    //   setEmail('')
    // }else{
    //   Toast(res.data.message,'error',1000)
    // }
  }

  return (
    <div id="news" className='relative'>
      <div className='flex justify-center items-center h-auto py-10 lg:py-16 maincontainer' >
        <Image width={1000} height={1000} quality={100} src={backimage} className='absolute top-0 left-0 right-0 bottom-0 -z-10 w-full h-full' alt="new" />
        <div id="news-grid">
          <div className='col-start-2 col-end-6 flex flex-col items-center lg:space-y-5 xl:space-y-5 space-y-2 justify-center [&>*]:text-b16' >
            <div className='bg-b3 px-7 py-2 text-xs xl:text-sm w-fit rounded-3xl !text-white font-bold' >STAY UPDATED</div>
            <h4 className='lg:text-4xl text-xl xl:text-[56px] font-bold' >Subscribe!</h4>
            <p className='xl:text-base lg:text-sm text-xs text-center lg:w-72' >Get updates on exclusive discounts, experiences and more.</p>
          </div>
          <div className='col-start-7 col-end-12 flex flex-col space-y-2 [&>*]:text-b16' >
            <h4 className='font-bold text-sm' >Email</h4>
            <form onSubmit={SubscribeNews} className='flex lg:flex-row flex-col lg:space-y-0 space-y-2 space-x-5 items-center' ><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='outline-none text-xs lg:py-3 xl:py-3 py-2 px-2 rounded-md w-72 placeholder:text-[#777E90] placeholder:font-normal' placeholder='Type here' /><button className='bg-b3 px-7 py-3 text-xs font-bold rounded-md w-max text-white whitespace-nowrap' >Get Updates</button></form>
            <div className='flex items-center space-x-3 py-2' >
              <InputCheckbox />
              {/* <Checkbox color='black' checked ripple={true} /> */}
              <span className='text-sm font-semibold' >Yes, sign me up!</span></div>
            <p className='text-xs xl:w-[350px] w-[280px]' >Sign up above to get updates delivered directly to your inbox. See our <Link href="/privacy-policy" className='font-semibold underline'>Privacy Policy.</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsLetterSection