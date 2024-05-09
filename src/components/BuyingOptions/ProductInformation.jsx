import React from 'react'
import InformationCard from './InformationCard'
import InformationCardDisabled from './InformationCardDisabled'

const ProductInformation = ({image,title,modelNo,bullets,threeStarProduct,fourStarProduct,fiveStarProduct,threeStarCount,fourStarCount,fiveStarCount}) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-[560px_auto] gap-14'>
            <div className='border border-b14 rounded-2xl py-[77px]'>
                <img src={image} alt="p1" className='w-[378px] h-[378px] object-contain mx-auto' />
            </div>
            <div>
                <h2 className='text-b18 font-bold text-2xl'>{title}</h2>
                <div className='flex items-center gap-7 my-8'>
                    <h3 className='text-black text-sm font-semibold'>Model Number</h3>
                    <span className='text-b16'>{modelNo}</span>
                </div>
                <ul className='list-disc ml-6 leading-8 mb-5'>
                    {bullets?.length ? bullets.slice(0, 4).map((bullet,indx)=>
                    <li key={indx} className='text-black'>{bullet}</li>):null}
                </ul>
                <div className='w-full flex flex-col gap-[10px]'>
                 {threeStarProduct ? <InformationCard item={threeStarProduct} count={threeStarCount} />:<InformationCardDisabled rating={3} />}
                 {fourStarProduct ? <InformationCard item={fourStarProduct} count={fourStarCount} />:<InformationCardDisabled rating={4} />}
                 {fiveStarProduct ? <InformationCard item={fiveStarProduct} count={fiveStarCount} />:<InformationCardDisabled rating={5} />}
                </div>
            </div>
        </div>)
}

export default ProductInformation
