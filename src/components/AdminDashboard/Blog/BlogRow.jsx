import React,{useState} from 'react'
import {BsPencil,BsFillTrashFill} from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import {HiOutlineDocumentDuplicate} from 'react-icons/hi'
import {duplicateBlog,deleteBlog} from '../../../api/admin'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../../utils/Toast'

const BlogRow = ({img,title,category,id,slug,getBlog,setPage}) => {

  const [dupLoading,setDupLoading] = useState(false)
  const [delLoading,setDelLoading] = useState(false)
  const [thumbLoad,setThumbLoad] = useState(true)

  const DuplicateBlog = async (e,slug) => {
    e.preventDefault()
     setDupLoading(true)
     const data = {slug:slug}
     const res = await duplicateBlog(data);
     if(res.status === 200){
       setDupLoading(false)
       getBlog();
       Toast(res.data.msg,'success',1000)
    }else{
      setDupLoading(false)
      Toast(res.daa.message,'error',1000)
    }
  }

  const DeleteBlog = async (e,id) => {
    e.preventDefault()
     setPage(1)
     setDelLoading(true)
     const data = {id:id}
     const res = await deleteBlog(data);
     
     if(res.status === 200){
       setDelLoading(false)
       getBlog(1)
       Toast(res.data.msg,'success',1000)
    }else{
      setDelLoading(false)
      Toast(res.data.message,'error',1000)
    }
  }

  const handleLoad = () => {
    setThumbLoad(false)
  }

  return (
    <tr className="border-b border-l border-r border-b6 text-xs">
        <td className="px-5 py-3 capitalize"><div className='relative' >{thumbLoad && <div className='absolute flex items-center justify-center w-28 h-20' ><img src="/loader-bg.gif" className='w-5 h-5' /></div>} <img src={img} onLoad={handleLoad} alt='blog_thumbnail' className='w-28 h-20' /></div></td>
        <td className="px-2 py-3 w-52 overflow-hidden">{title.substr(0,50)}...</td>
        <td className="whitespace-nowrap  px-5 py-4 font-medium capitalize">{category.replace(/-/g,' ')}</td>
        <td className="flex items-center justify-center mt-3 space-x-1 px-5 py-4">
         <NavLink title="Update blog" to={`/admin/update-blog/${slug}`} className='flex items-center justify-center bg-b3 text-white hover:bg-white hover:text-b3 border-2 border-white hover:border-b3 text-sm px-2 w-fit rounded-full cursor-pointer py-2' ><BsPencil className="text-base" /></NavLink>
         <span title="Duplicate Blog" onClick={e=>DuplicateBlog(e,slug)} className='flex items-center justify-center bg-b7 text-white hover:bg-white hover:text-b7 border-2 border-white hover:border-b7 text-sm px-2 w-fit rounded-full cursor-pointer py-2' >{dupLoading ? <img src="/loader-bg.gif" className='w-4 h-4' />:<HiOutlineDocumentDuplicate className="text-lg" />}</span>
         <span title="Delete Blog" onClick={e=>DeleteBlog(e,id)} className='flex items-center justify-center bg-red-500/30 text-red-500 hover:bg-white hover:text-red-500 border-2 border-white hover:border-red-500 text-sm px-2 w-fit rounded-full cursor-pointer py-2' >{delLoading ? <img src="/loader-bg.gif" className='w-4 h-4' />: <BsFillTrashFill className="text-base" />}</span>
        </td>
      </tr>
  )
}

export default BlogRow