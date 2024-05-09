import React,{useState} from 'react'
import {BsPencil,BsFillTrashFill} from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import {HiOutlineDocumentDuplicate} from 'react-icons/hi'
import {duplicateHelp,deleteHelp} from '../../../api/admin/Help&Support/helpSupport'
import Toast from '../../../utils/Toast'

const HelpRow = ({desc,title,category,id,slug,getBlog,setPage}) => {

  const [dupLoading,setDupLoading] = useState(false)
  const [delLoading,setDelLoading] = useState(false)

  const DuplicateBlog = async (e,id) => {
    e.preventDefault()
     setDupLoading(true)
     const data = {id:id}
     const res = await duplicateHelp(data);
     if(res.status === 200){
       setDupLoading(false)
       getBlog();
       Toast(res.data.msg,'success',1000)
      }else{
        setDupLoading(false)
        Toast(res.data.message,'error',1000)
    }
  }

  const DeleteBlog = async (e,id) => {
    e.preventDefault()
     setPage(1)
     setDelLoading(true)
     const data = {id:id}
     const res = await deleteHelp(data);
     if(res.status === 200){
       setDelLoading(false)
       getBlog(1)
       Toast(res.data.msg,'success',1000)
    }else{
      setDelLoading(false)
      Toast(res.data.message,'error',1000)
    }
  }


  return (
    <tr className="border-b border-l border-r border-b6 text-xs">
        <td className="px-2 py-3 w-52 overflow-hidden">{title?.substr(0,50)}...</td>
        <td className="px-2 py-3 w-52 overflow-hidden">{desc?.substr(0,50)}...</td>
        <td className="whitespace-nowrap  px-5 py-4 font-medium capitalize">{category.replace(/-/g,' ')}</td>
        <td className="flex items-center justify-center mt-3 space-x-1 px-5 py-4">
         <NavLink title="Update blog" to={`/admin/update-help/${id}`} className='flex items-center justify-center bg-b3 text-white hover:bg-white hover:text-b3 border-2 border-white hover:border-b3 text-sm px-2 w-fit rounded-full cursor-pointer py-2' ><BsPencil className="text-base" /></NavLink>
         <span title="Duplicate Blog" onClick={e=>DuplicateBlog(e,id)} className='flex items-center justify-center bg-b7 text-white hover:bg-white hover:text-b7 border-2 border-white hover:border-b7 text-sm px-2 w-fit rounded-full cursor-pointer py-2' >{dupLoading ? <img src="/loader-bg.gif" className='w-4 h-4' />:<HiOutlineDocumentDuplicate className="text-lg" />}</span>
         <span title="Delete Blog" onClick={e=>DeleteBlog(e,id)} className='flex items-center justify-center bg-red-500/30 text-red-500 hover:bg-white hover:text-red-500 border-2 border-white hover:border-red-500 text-sm px-2 w-fit rounded-full cursor-pointer py-2' >{delLoading ? <img src="/loader-bg.gif" className='w-4 h-4' />: <BsFillTrashFill className="text-base" />}</span>
        </td>
      </tr>
  )
}

export default HelpRow