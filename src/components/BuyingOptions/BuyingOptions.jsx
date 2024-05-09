import React, { useEffect, useState } from 'react'
import { BsGrid } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { AiFillStar, AiOutlineArrowRight } from 'react-icons/ai'
import ToolTip from '../ToolTip'
import {GetApplianceBuyingOptions} from '../../api/frontEnd'
import { NavLink } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination2'

const BuyingOptions = ({rating,modelNo,threeStarCount,fourStarCount,fiveStarCount}) => {
    const [isGrid, setIsGrid] = useState(true);
    const StarIconPrinter = ({ numberOfTimes,color }) => {
        const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
            <AiFillStar key={index} className={`${color ? color : 'text-b7'} text-lg`} /> // Render the star icon component for each iteration
        ));

        return <div className='flex items-center' >{starIcons}</div>; // Render the array of star icons
    };

    const [filter,setFilter] = useState('all')
    const [options,setOptions] = useState([])
    const [loading,setLoading] = useState(false)

    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(8)
    const [totalCount,setTotalCount] = useState(1)


    const GetBuyingOptions = async () => {
        setLoading(true)
     const res = await GetApplianceBuyingOptions({modelNo:modelNo,filter:filter,page:page,limit:limit})
     if(res.status === 200){
         setOptions(res.data.products)
         setTotalCount(Math.ceil(res.data.productCount/limit))
        setLoading(false)
     }else{
      setOptions([])
      setLoading(false)
     }
    }

    useEffect(()=>{
        GetBuyingOptions()
    },[filter,page])

    return (
        <div className='my-60px'>
            <div className='flex justify-between w-full whitespace-nowrap'>
                <h2 className='text-black font-bold text-2xl'>Buying Options</h2>
                <div className='flex items-center space-x-5 w-full justify-end' ><BsGrid className={`cursor-pointer ${isGrid ? 'text-b3' : ''}`} onClick={() => setIsGrid(true)} /><FaBars className={`cursor-pointer ${isGrid ? '' : 'text-b3'}`} onClick={() => setIsGrid(false)} /></div>
            </div>
            <div className='my-10 flex gap-8 items-center'>
                <h3>Filter by Cosmetic Ratings</h3>
                <div className='flex items-center gap-10px'>
                 <button onClick={()=>setFilter('all')} className={`px-5 py-4 rounded-full border hover:shadow-md border-b33 text-sm font-semibold`}>Show All</button>
                 {fiveStarCount > 0 ?<button onClick={()=>setFilter(5)} className={`flex gap-10px items-center justify-center px-5 py-4 rounded-full border border-b33 text-sm font-semibold hover:shadow-md shadow-sm `}>5 Star rating <StarIconPrinter numberOfTimes={5} /></button>:<div className={`flex gap-10px items-center justify-center px-5 py-4 rounded-full border border-b33 bg-b31/20 cursor-not-allowed text-sm font-semibold  hover:shadow-md shadow-sm `}>5 Star rating <StarIconPrinter numberOfTimes={5} color="text-b31" /></div>}
                 {fourStarCount > 0 ? <button onClick={()=>setFilter(4)} className={`flex gap-10px items-center justify-center px-5 py-4 rounded-full border border-b33 text-sm font-semibold hover:shadow-md shadow-sm `}>4 Star rating <StarIconPrinter numberOfTimes={4} /></button>:<div className={`flex gap-10px items-center justify-center px-5 py-4 rounded-full border border-b33 bg-b31/20 cursor-not-allowed text-sm font-semibold hover:shadow-md shadow-sm `}>4 Star rating <StarIconPrinter numberOfTimes={4} color="text-b31" /></div>}
                 {threeStarCount > 0 ? <button onClick={()=>setFilter(3)} className={`flex gap-10px items-center justify-center px-5 py-4 rounded-full border border-b33 text-sm font-semibold hover:shadow-md shadow-sm `}>3 Star rating <StarIconPrinter numberOfTimes={3} /></button>:<div className={`flex gap-10px items-center justify-center px-5 py-4 rounded-full border border-b33 bg-b31/20 cursor-not-allowed text-sm font-semibold hover:shadow-md shadow-sm `}>3 Star rating <StarIconPrinter numberOfTimes={3} color="text-b31" /></div>}
                </div>
            </div>
            {/* Product Card */}
            {loading ? <div style={{height:"calc(100vh - 100px)"}} className="w-full flex justify-center items-center" ><img src='/loader2.gif' className='h-18' /></div> :  options?.length > 0 ? <>
            <div className={`grid gap-6 ${isGrid ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {options.map((item, index) => (
                    <div key={index} className={`border border-b14 rounded-2xl p-6 ${isGrid ? '' : 'flex gap-4 items-center'}`}>
                        <div className='min-w-[222px] min-h-[270px] relative'>
                            <img src={item.media.find(item=>item.file === 'image').data} alt="p1" className={`object-contain w-[222px] h-[270px] ${isGrid ? 'mx-auto' : ''}`} />
                            <div className='absolute -right-3 -top-3 flex items-center justify-center text-sm text-b16 font-semibold px-3 py-2 bg-b7 rounded-full'>{(100 - (item.salePrice / item.regPrice) * 100).toFixed(0)}% Off</div>
                        </div>
                        <div className='mt-6 flex flex-col w-full gap-5'>
                            <div className='flex justify-between items-center'><span className='text-b15 text-sm font-semibold'>ID Number</span>{item.itemId}</div>
                            <div className='flex justify-between items-center'><span className='text-b15 text-sm font-semibold'>Model Number</span>{item.modelNo}</div>
                            <div className='flex gap-10px items-center'>
                                <h3 className='lg:text-sm text-xs font-semibold w-max text-b15 flex items-center gap-1' >Cosmetic <br /> Rating <ToolTip color="text-b15" /></h3>
                                <StarIconPrinter numberOfTimes={item.rating} />
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-b3 text-xl font-semibold'>${item.isSale ? item.salePrice : item.regPrice}</span>
                                {item.isSale ? <span className='flex gap-2 items-center'>
                                    <strike className='text-b23'>${item.regPrice}</strike> <span className='bg-b4 px-2 py-1 rounded-full text-xs text-b16 font-semibold'>- {(100 - (item.salePrice / item.regPrice) * 100).toFixed(0)}%</span>
                                </span>:null}
                            </div>
                            <div className='flex items-center gap-10px'>
                                <span className='text-b15 font-semibold text-sm'>Disbcount %</span>
                                <div className='grow bg-black/[0.08] rounded-lg' ><span className='flex rounded-lg bg-gradient-to-r from-b4 to-b7 w-3/5 h-2' ></span></div>
                            </div>
                            <NavLink to={`/product/${item.slug}`} className='bg-b7 w-full hover:underline px-4 py-3 rounded-lg flex items-center justify-center gap-1 font-semibold text-xs text-white'>View Appliance <AiOutlineArrowRight className='text-white' /></NavLink>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination page={page} setPage={setPage} totalPages={totalCount} />
            </>
            :<div style={{height:"calc(100vh - 100px)"}} className="w-full flex justify-center items-center" ><img src='/not-found.webp' className='w-32' /></div>}
        </div>
    )
}

export default BuyingOptions
