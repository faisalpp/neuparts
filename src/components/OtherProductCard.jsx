import React from 'react'
import { AiFillStar, AiOutlineQuestionCircle } from 'react-icons/ai'
import { IoBagCheckOutline } from 'react-icons/io5'
import ToolTip from './ToolTip'
import { Link, useParams } from 'react-router-dom'

const OtherProductCard = ({ rating,disabled,disabledImg,product }) => {
  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar className='text-base' /> // Render the star icon component for each iteration
    ));

    return starIcons; // Render the array of star icons
  };

  const firstImg = product?.media?.find(item => item.file === 'image');
  const {slug} = useParams()

  return (
    <>
    {product ? 
    <div className={`flex flex-col rounded-lg px-1 py-4 bg-white w-full ${slug === product?.slug ?  'border-b6 shadow-[0px_4px_30px_rgba(0,0,0,0.25)]' :'border-gray-300'} hover:border-2 hover:border-b3 hover:shadow-[0px_4px_30px_rgba(0,0,0,0.25)] border-2 border-gray-300}`} >
      <Link to={`/product/${product?.slug}`}>
        <div className='flex items-center justify-between' >
          <div className='flex items-center '>
            <h6 className='text-[10px] w-max text-gray-500 font-semibold' >Cosmetic&nbsp;Rating</h6>{disabled === "true" ? <ToolTip color="text-b34/30" /> : <ToolTip /> }
          </div>
          <div>
            <span className={`flex items-center w-fit bg-b10 text-white text-[8px] px-3 rounded-xl py-1`} ><IoBagCheckOutline className='text-[10px] mr-1' />In&nbsp;Stock</span>
          </div>
        </div>
        <div className='flex items-center text-b7 bg-white rounded-xl text-xs w-fit px-2 py-1' >
          <StarIconPrinter numberOfTimes={product?.rating} />
        </div>
        <div className='relative flex w-full justify-center my-3 items-center' >
          <img src={firstImg?.data} className='w-28 h-[135px]' alt='product' />
        </div>
        <div className='flex flex-col space-y-3 px-2' >
          <div className='flex items-center' >
            <h6 className='text-sm font-semibold text-b3'>${product?.isSale ? product?.salePrice : product?.regPrice}</h6>
           {product?.isSale ? <div className='flex justify-end w-full text-xs text-gray-500' ><strike>${product?.regPrice}</strike></div>:null}
          </div>
          <div className='flex items-center' ><h6 className='text-xs font-semibold text-gray-500' >Discount&nbsp;%</h6><div className='flex justify-end w-full' ><span className={`${disabled === "true"?'bg-b34/30':'bg-b4'} rounded-2xl font-semibold lg:px-3 px-1 py-1 lg:text-[8px] text-[9px]`} >-{(100 - (product?.salePrice / product?.regPrice) * 100).toFixed(0)}%</span></div></div>
          <div className='flex w-full justify-center' ><div className='w-10/12 bg-gray-100 rounded-lg' ><span className={`flex rounded-lg bg-gradient-to-r ${disabled === "true" ? 'from-b34/30 to-b34/10':'from-b4 to-b7'} w-10 h-2`} ></span></div></div>
        </div>
        </Link>
    </div>:
    
    <div className={`flex flex-col cursor-pointer rounded-lg px-1 py-4 bg-white w-full hover:border-2 hover:border-b3 hover:shadow-[0px_4px_30px_rgba(0,0,0,0.25)] border-2 border-gray-300}`} >
      <div>
        <div className='flex items-center justify-between' >
          <div className='flex items-center '>
            <h6 className='text-[10px] w-max text-gray-500 font-semibold' >Cosmetic&nbsp;Rating</h6>{disabled === "true" ? <ToolTip color="text-b34/30" /> : <ToolTip /> }
          </div>
          <div>
            <span className={`flex items-center w-fit ${disabled === "true"?'bg-b34':'bg-b10'} text-white text-[8px] px-3 rounded-xl py-1`} >Out&nbsp;of&nbsp;Stock</span>
          </div>
        </div>
        <div className={`flex items-center ${disabled === 'true' ? 'text-b34/30':'text-b7'} bg-white rounded-xl text-xs w-fit px-2 py-1 ${rating === 5 ? 'bg-gray-300' : ''}`} >
          <StarIconPrinter numberOfTimes={rating} />
        </div>
        <div className='relative flex w-full justify-center my-3 items-center' >
          {disabled === "true" ? <div className="absolute flex z-20 bg-white/50 w-28 h-full" ></div>:null}
          <img src={disabledImg?.data} className='w-28 h-[135px]' alt='product' />
        </div>
        <div className='flex flex-col space-y-3' >
          <div className='flex items-center' ><h6 className={`text-sm font-semibold ${disabled === "true" ? 'text-b34':'text-b3'} `} >$279.00</h6><div className='flex justify-end w-full text-xs text-gray-500' ><strike>$379.00</strike></div></div>
          <div className='flex items-center' ><h6 className='text-xs font-semibold text-gray-500' >Discount&nbsp;%</h6><div className='flex justify-end w-full' ><span className={`${disabled === "true"?'bg-b34/30':'bg-b4'} rounded-2xl font-semibold lg:px-3 px-1 py-1 lg:text-[8px] text-[9px]`} >-27%</span></div></div>
          <div className='flex w-full justify-center' ><div className='w-10/12 bg-gray-100 rounded-lg' ><span className={`flex rounded-lg bg-gradient-to-r ${disabled === "true" ? 'from-b34/30 to-b34/10':'from-b4 to-b7'} w-10 h-2`} ></span></div></div>
        </div>
      </div>
    </div>
    
    
    }
    </>
  )
}

export default OtherProductCard