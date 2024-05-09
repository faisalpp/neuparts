import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CdSvg from '../../svgs/CdSvg'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import {getTipBySlug} from '../../api/admin/applianceTips'
import parse from 'html-react-parser'
const GetScoop = () => {

  const {slug} = useParams()
  const [tip,setTip] = useState({})

   const GetTip = async () => {
    const res = await getTipBySlug({slug:slug})
    console.log(res)
    if(res.status === 200){
     setTip(res.data.tip)
    }
   }

   useEffect(()=>{
    GetTip()
   },[slug])

    return (
        <div className='py-10 lg:py-16 xl:py-20 2xl:py-120px px-4 sm:px-10 lg:px-16 xl:px-20 2xl:px-120px'>
            <div className='w-full max-w-[960px] mx-auto'>
                <Link to="/helpful-appliances-tips" className='flex lg:hidden mb-10 items-center gap-2 text-sm text-b3 font-semibold'><AiOutlineArrowLeft />Back</Link>
                <div className='mb-8 md:mb-10 inline-flex items-center maxmd:w-16 maxmd:h-16 justify-center p-2 rounded-2xl bg-b3'>
                    <CdSvg />
                </div>
                <div className='flex flex-col gap-10 md:gap-16 xl:gap-20 w-full'>
                    <h1 className='font-bold text-b18 coxs:leading-[48px] text-28px coxs:text-32px sm:text-4xl lg:text-40px'>
                        Tips for {tip.title}
                    </h1>
                    <div>
                     {tip.content ? parse(tip.content):null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetScoop