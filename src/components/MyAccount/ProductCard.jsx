import React, { useState } from 'react'
import { AiFillStar,AiOutlineLoading } from 'react-icons/ai'
import { VscLoading } from 'react-icons/vsc'
import ToolTip from '../ToolTip'
import { IoCloseSharp } from 'react-icons/io5'
import {RemoveFromFavorite} from '../../api/user/favorite'
import { useSelector } from 'react-redux'
import Toast from '../../utils/Toast'


const ProductCard = ({ data,reload }) => {
    const StarIconPrinter = ({ numberOfTimes }) => {
        const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
            <AiFillStar className='text-b7 text-lg' /> // Render the star icon component for each iteration
        ));
        return <div className='flex items-center' >{starIcons}</div>; // Render the array of star icons
    }
 
    const [favLoad,setFavLoad] = useState(false)
    const product = JSON.parse(data.product)
    const userId = useSelector((state)=>state.user._id)
    const removeFavorite = async (e) => {
        e.preventDefault()
        if(!userId){
          Toast('Login Required!','error',1000)
        }else{
         setFavLoad(true)
         const res = await RemoveFromFavorite({pid:data.pid,userId:userId})
         if(res.status === 200){
          setFavLoad(false)
          reload()
          Toast(res.data.msg,'success',1000)
        }else{
          setFavLoad(false)
          Toast(res.data.message,'error',1000)
         }
        }
       }

    return (
        <>
            <div className={`relative flex maxmd:max-w-[267px] maxmd:mx-auto flex-col border border-b14 rounded-2xl bg-white overflow-hidden`} >
                <span className='absolute top-0 right-0 bg-b4 rounded-2xl mt-2 mr-1 px-4 py-2 text-xs font-bold z-20' >{(100 - (product.salePrice / product.regPrice) * 100).toFixed(0)}% Off</span>
                <div className='flex w-full justify-center xl:px-5 lg:px-5 px-3 pt-10' >
                    <img src="/p1.webp" className=' xl:w-54 lg:w-52 w-[160px] h-full' alt='refrigrator' />
                </div>
                {/* Remove Item */}
                <button type="button" onClick={e=>removeFavorite(e)} className='absolute top-3 left-4 h-7 w-7 md:w-8 md:h-8 rounded-full bg-b3 flex justify-center items-center'>
                    {favLoad ? <VscLoading className="animate-spin text-white text-xl"  /> : <IoCloseSharp className="text-lg md:text-xl text-white" />}
                </button>

                <div className='flex flex-col gap-y-3 my-5 mx-5 xl:mx-[37.41px]' >
                    <p className='font-semibold font-reg xl:text-base text-sm !leading-5 text-line-camp'>{product.title}</p>
                    <div className='flex' >
                        <span className='text-b3 font-semibold' >${product.isSale ? product.salePrice : product.regPrice}</span>
                        {product.isSale ? <div className='flex justify-end w-full space-x-2 items-center' >
                            <strike className="text-[rgba(17,16,16,0.64)] maxmd:text-sm">${product.regPrice}</strike>
                            <span className='bg-b4 rounded-xl font-semibold px-2 py-1 text-[10px] md:text-xs' >- {(100 - (product.salePrice / product.regPrice) * 100).toFixed(0)}%</span>
                        </div>:null}
                    </div>
                    <div className='flex items-center space-x-2' ><div className='flex items-center gap-1' ><h4 className='text-xs md:text-sm font-semibold text-b15' >Cosmetic Rating</h4><ToolTip color="text-b3" /></div><div className='flex items-center' ><StarIconPrinter numberOfTimes={product.rating} /> </div></div>
                    <div className='flex items-center space-x-10' >
                        <div className='flex font-semibold text-xs md:text-sm text-b15' ><h4>Discount</h4>&nbsp;%</div>
                        <div className='grow bg-gray-100 rounded-lg' ><span className='flex rounded-lg bg-gradient-to-r from-b4 to-b7 w-20 h-2' ></span></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard 