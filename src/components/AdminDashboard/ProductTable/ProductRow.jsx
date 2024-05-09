import React, { useState } from 'react'
import {BsPencil,BsFillTrashFill} from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {HiOutlineDocumentDuplicate} from 'react-icons/hi'
import TxtTransform from '../../../utils/TextTransform';
import {deleteProduct,duplicateProduct} from '../../../api/admin'
import Toast from '../../../utils/Toast'

const ProductRow = ({data,getProductss}) => {

    const [dupLoading,setDupLoading] = useState(false)
    const [delLoading,setDelLoading] = useState(false)

    const StarIconPrinter = ({ numberOfTimes }) => {
      const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
        <AiFillStar key={index} className='text-b7 text-base' /> // Render the star icon component for each iteration
      ));

      return <div className='flex justify-center items-center mt-2' >{starIcons}</div>; // Render the array of star icons
    };

    const firstImg = data.media.find(item => item.file === 'image');
    
    const DeleteProduct = async (e,id) => {
     setDelLoading(true)
     try{
       const res = await deleteProduct({pId:id})
       if(res.status === 200){
       Toast(res.data.msg,'success',1000)
       getProductss()
       setDelLoading(false)
      }else{
        Toast(res.data.message,'error',1000)
        setDelLoading(false)
      }
     }catch(error){
      setDelLoading(false)
      Toast('Internal Server Error!','error',1000)
     }
    }

    const DuplicateProduct = async (e,id) => {
      setDupLoading(true)
     try{
       const res = await duplicateProduct({pId:id})
       if(res.status === 200){
       Toast(res.data.msg,'success',1000)
       getProductss()
       setDupLoading(false)
      }else{
        Toast(res.data.message,'error',1000)
        setDupLoading(false)
      }
     }catch(error){
      setDupLoading(false)
      Toast('Internal Server Error!','error',1000)
     }
    }

  return (
    <tr className="border-b border-l border-r border-b6 text-xs">
        <td className=" py-3 capitalize"><img src={firstImg?.data} className='w-32' /></td>
        <td className=" capitalize">{data.title}</td>
        <td className=" py-4 font-medium">${data.salePrice}</td>
        <td className=" py-4 font-medium"><strike>${data.regPrice}</strike></td>
        <td className=" py-4 font-semibold text-red-500">{TxtTransform.Cap1Char(data.productType)}</td>
        <td className=" py-4 text-b6 font-medium"><StarIconPrinter numberOfTimes={data.rating} /></td>
        <td className="px-8 py-4 space-y-1">
         <NavLink title="Update Product" to={`/admin/update-product/${data.slug}`} className='flex items-center justify-center bg-b3 text-white hover:bg-white hover:text-b3 border-2 border-white hover:border-b3 text-sm px-2 w-fit rounded-full cursor-pointer py-2' ><BsPencil className="text-base" /></NavLink>
         <span title="Delete Product" onClick={e=>{!delLoading ? DeleteProduct(e,data._id):null}} className='flex items-center justify-center bg-red-500/30 text-red-500 hover:bg-white hover:text-red-500 border-2 border-white hover:border-red-500 text-sm px-2 w-fit rounded-full cursor-pointer py-2' >{delLoading ? <img src="/loader-bg.gif" className='w-4 h-4' />:<BsFillTrashFill className="text-base" />}</span>
         {/* {data.productType === 'parent' ? null :<span title="Duplicate Product" onClick={e=>{!dupLoading ? DuplicateProduct(e,data.slug) : null}} className='flex items-center justify-center bg-b7 text-white hover:bg-white hover:text-b7 border-2 border-white hover:border-b7 text-sm px-2 w-fit rounded-full cursor-pointer py-2' >{dupLoading ? <img src="/loader-bg.gif" className='w-4 h-4' />:<HiOutlineDocumentDuplicate className="text-lg" />}</span>} */}
         <span title="Duplicate Product" onClick={e=>{!dupLoading ? DuplicateProduct(e,data._id) : null}} className='flex items-center justify-center bg-b7 text-white hover:bg-white hover:text-b7 border-2 border-white hover:border-b7 text-sm px-2 w-fit rounded-full cursor-pointer py-2' >{dupLoading ? <img src="/loader-bg.gif" className='w-4 h-4' />:<HiOutlineDocumentDuplicate className="text-lg" />}</span>
        </td>
      </tr>
  )
}

export default ProductRow