import React, { useState,useEffect } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import LaundryDryerCard from './LaundryDryerCard'
import LaundryWasherCard from './LaundaryWasherCard'
import {GetLaundarySetAppliances} from '../../../api/frontEnd'
import BtnLoader from '../../Loader/BtnLoader'
import Pagination from '../../Pagination/Pagination2'

const Filter = ({type}) => {

    const [products,setProducts] = useState([])
    const [filter,setFilter] = useState({})
    const [loading,setLoading] = useState(false)

    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(4)
    const [totalCount,setTotalCount] = useState(1)

    const GetLaundaryAppliances = async () => {
     setLoading(true)
     const res = await GetLaundarySetAppliances({subCategory:type==='washer'?'dryer':'washer',page:page,limit:limit})
     if(res.status === 200){
      setProducts(res.data.products)
      setTotalCount(Math.ceil(res.data.productsCount/limit))
      setLoading(false)
     }else{
      setLoading(false)
     }
    }

    useEffect(()=>{
        GetLaundaryAppliances()
    },[type,page])

    
    const LaundaryFilter = ({id,title,filters}) => {
     const [is,setIs] = useState('')
     return (
     <div onClick={()=>{is === id ? setIs('') : setIs(id)}} className={`cursor-pointer relative  border-[1px] flex items-center gap-2 text-black font-semibold text-sm px-5 py-4 ${is===id?'rounded-full bg-b3 text-white':'rounded-full bg-white'}`}>
     <div className='flex items-center space-x-2' ><span>{title}</span><FiChevronDown className='text-lg' /></div>    
     {is === id ? 
      <div className='absolute -bottom-36 w-full left-0 overflow-x-hidden overflow-y-scroll bg-white border-[1px] rounded-3xl h-32' >
       <div className='w-full flex flex-col items-center text-white h-32 space-y-2 mt-3' >
        {filters?.length > 0 ? filters.map((filt)=>
        <div className='flex bg-white text-black w-11/12 rounded-md py-1 px-5 justify-center' ><h3>{filt.title}</h3></div>
        ):null}
       </div>
     </div>:null} 
       </div>
     )
    }

    return (
        <div className='flex flex-col gap-10 w-full'>
            <div className='flex gap-8 items-center'>
                <h3 className='whitespace-nowrap'>Filter by </h3>
                <div className='flex items-center flex-wrap gap-2'>
                    <LaundaryFilter id="1" title="Cosmetic Ratings" filters={[{title:'3 Star Rating',link:'/products/?rating=3'},{title:'4 Star Rating',link:'/products/?rating=4'},{title:'5 Star Rating',link:'/products/?rating=5'}]} />            
                    <LaundaryFilter id="2" title="Popular Features" filters={[{title:'3 Star Rating',link:'/products/?rating=3'},{title:'4 Star Rating',link:'/products/?rating=4'},{title:'5 Star Rating',link:'/products/?rating=5'}]} />            
                    <LaundaryFilter id="3" title="Fuel Type" filters={[{title:'3 Star Rating',link:'/products/?rating=3'},{title:'4 Star Rating',link:'/products/?rating=4'},{title:'5 Star Rating',link:'/products/?rating=5'}]} />            
                    <LaundaryFilter id="4" title="Popular Brands" filters={[{title:'3 Star Rating',link:'/products/?rating=3'},{title:'4 Star Rating',link:'/products/?rating=4'},{title:'5 Star Rating',link:'/products/?rating=5'}]} />            
                </div>
            </div>
            {loading ? <div className='flex flex-col items-center justify-center w-full h-80' ><BtnLoader/></div> : products.length > 0 ?<div className='grid grid-cols-1 2xl:grid-cols-2 xl:grid-cols-2 gap-4'>
              {type === 'dryer' ? products.map((product)=><LaundryWasherCard data={product} />):null}
              {type === 'washer' ? products.map((product)=><LaundryDryerCard data={product} />):null}
            </div>:<div className='flex items-center justify-center w-full h-80' ><img src="/not-found.webp" className='w-32' /></div>}
            {products.length > 0 ?<Pagination page={page} setPage={setPage} totalPages={totalCount} />:null}
        </div>
    )
}

export default Filter