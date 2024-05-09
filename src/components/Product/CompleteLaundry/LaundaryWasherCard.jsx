import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { FaArrowRight } from 'react-icons/fa'
import ToolTip from '../../ToolTip'
import { useDispatch, useSelector } from 'react-redux'
import { setWasher,resetWasher } from '../../../store/laundarySlice'

const LaundryWasherCard = ({data}) => {

    const dispatch = useDispatch()

    const ID = useSelector((state)=>state.laundary.washer?.id);

    const StarIconPrinter = ({ numberOfTimes }) => {
        const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
          <AiFillStar key={index} className='text-b7 text-lg' /> // Render the star icon component for each iteration
        ));
    
        return <div className='flex mt-2 items-center' >{starIcons}</div>; // Render the array of star icons
      };


    return (
        <div className='border grid grid-cols-1 sm:grid-cols-[150px_1fr] md:grid-cols-[240px_1fr] xl:grid-cols-[200px_1fr] xl:gap-0 gap-5 border-b14 rounded-xl py-10 xl:px-2 px-5'>
            <div className='w-fit' >
                <img src={data.media.find(item => item.file === 'image')?.data} className='w-40 h-40 sm:w-full sm:h-full md:w-60 md:h-60 xl:w-48 object-contain' alt="" />
            </div>
            <div className='space-y-4'>
                <h3 className='line-clamp-2 text-lg md:text-xl xl:text-sm font-semibold leading-6'>{data.title}</h3>
                <div className='flex items-center gap-6' >
                    <span className='font-semibold text-xl text-b3' >${data.isSale ? data.salePrice : data.regPrice}</span>
                   {data.isSale ? <div className='flex items-center gap-2 flex-wrap'>
                        <strike className="text-b23" >${data.regPrice}</strike>
                        <span className='flex bg-b4 text-xs text-b16 px-2 py-1 font-semibold rounded-full' >-{(100 - (data.salePrice / data.regPrice) * 100).toFixed(0)}%</span>
                    </div>:null}
                </div>
                <div className='flex items-center gap-5' >
                    <div className='flex items-center gap-1' >
                        <h4 className='lg:text-sm text-xs font-semibold w-max text-b15' >Cosmetic&nbsp;Rating</h4>
                        <ToolTip color="text-b15/80" />
                    </div>
                    <div className='flex items-center'>
                     <StarIconPrinter numberOfTimes={data.rating} />
                    </div>
                </div>
                <div className='lg:flex hidden items-center  2xl:gap-x-14 xl:gap-x-10' >
                    <div className='flex font-semibold text-sm text-b15' ><h4>Discount</h4>&nbsp;%</div>
                    <div className='w-full bg-gray-100 rounded-lg' ><span className='flex rounded-lg bg-gradient-to-r from-b4 to-b7 w-32 h-2' ></span></div>
                </div>
                <button onClick={()=>{ID === data._id ? dispatch(resetWasher()) : dispatch(setWasher({id:data._id,title:data.title,isSale:data.isSale,salePrice:data.salePrice,regPrice:data.regPrice,rating:data.rating,bulletDescription:data.bulletDescription,brand:data.brand,tags:data.tags,media:data.media.find((item)=>item.file === 'image')?.data}))}} type="button" className={` ${ID === data._id ? 'text-black border-2 border-b7 bg-white':'bg-b7 text-white'} py-3 px-4 flex gap-1 items-center justify-center text-center w-full  rounded-lg text-xs font-bold`}>
                    Select Item
                    <FaArrowRight />
                </button>
            </div>
        </div>
    )
}

export default LaundryWasherCard