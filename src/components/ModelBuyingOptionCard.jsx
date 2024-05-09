import React from 'react'
import { AiFillStar, AiOutlineCheckCircle, AiOutlineArrowRight } from 'react-icons/ai'
import { NavLink, useParams } from 'react-router-dom';

const ModelBuyingOptionCard = ({ image,bestValue, cosmaticcondition, rating,price,modelNo,itemId,slugg }) => {

  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className='text-b7 text-2xl' /> // Render the star icon component for each iteration
    ));

    return <div className='flex items-center' >{starIcons}</div>; // Render the array of star icons
  };

  const {slug} = useParams()
  const img = image?.find((item) => item.file === 'image')
  return (
    <>
      <div className={`flex flex-col items-center space-y-5 px-6 pt-12 pb-4 w-full ${slug === slugg ? 'bg-b8':null} border  border-b8`} >
        <div className='flex w-full text-white justify-center' >{bestValue}</div>
        <div className='bg-white w-full flex justify-center py-8'>
          <img src={img?.data} className='w-52' alt='p1' />
        </div>
        <div className='flex flex-col items-center justify-center pt-8 gap-7 text-center' >
          <div className='flex items-center' >
            <StarIconPrinter numberOfTimes={rating} />
          </div>
          <h5 className='font-semibold text-sm xl:text-base text-[#111010]' >${price}</h5>
          <h5 className='font-normal text-sm xl:text-base text-[#111010]' >{modelNo}</h5>
          <h5 className='font-bold text-sm xl:text-base text-[#111010]'> #{itemId}</h5>
          <h5 className='font-normal text-sm xl:text-base text-[#111010]'> {cosmaticcondition}</h5>
          <h5 className='flex items-center text-sm xl:text-base text-[#111010] font-normal'><AiOutlineCheckCircle className='mr-1 text-b12' /> 100%</h5>
          <h5 className='flex items-center text-sm xl:text-base text-[#111010] font-normal'><AiOutlineCheckCircle className='mr-1 text-b12' /> Passed</h5>
          <h5 className='flex items-center text-sm xl:text-base text-[#111010] font-normal'> 1 Year Warranty</h5>
          <h5 className='flex items-center text-sm xl:text-base text-[#111010] font-normal'>Open Box / Scratch & Dent</h5>
          {slug === slugg ?
            <div className='border-b7 border cursor-not-allowed text-b7 bg-white py-2 rounded-md font-semibold w-[250px]' >Selected</div>
            :
            <NavLink to={`/product/${slugg}`} className='border-b7 border bg-b7 text-white py-2 rounded-md font-semibold w-[250px] flex gap-1 items-center justify-center' >View Appliance <AiOutlineArrowRight /></NavLink>
          }
        </div>
      </div>
    </>
  )
}

export default ModelBuyingOptionCard