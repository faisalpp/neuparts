import React, { useEffect, useState } from 'react'
import CosmaticSlider from '../CosmaticSlider';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getSliderAppliances } from '../../api/frontEnd';

const MassiveAppliance = ({ sliderstyle, title, customstyle }) => {

    const [relatedProducts,setRelatedProducts] = useState([])

    const GetRecentAppliances = async () => {
        const res = await getSliderAppliances({isSale:true,sort:1})
        if(res.status === 200){
          setRelatedProducts(res.data.products)
        }
    }

    useEffect(()=>{
      GetRecentAppliances()
    },[])

    return (
        <>
          {relatedProducts?.length > 0 ?
            <div className='bg-b8'>
                <div className={'py-10 lg:py-16 xl:py-20 2xl:py-120px maincontainer ' + customstyle}>
                    <h2 className='font-bold text-2xl xl:text-32px text-center mb-5 lg:mb-10 xl:mb-[60px]'>{title}</h2>

                    <CosmaticSlider products={relatedProducts} sliderstyle={sliderstyle} />

                    <div className='flex justify-center mt-10 lg:mt-14 xl:mt-[60px]'>
                        <Link to="" className='whitespace-nowrap inline-flex maxsm:w-full justify-center items-center gap-1 hover:gap-2 duration-300 px-4 py-3 rounded-lg text-b3 font-medium text-sm 3xl:text-base border border-b3'>
                            <span>View More</span>
                            <AiOutlineArrowRight className="text-base" />
                        </Link>
                    </div>
                </div>
            </div>:null}
        </>
    )
}

export default MassiveAppliance