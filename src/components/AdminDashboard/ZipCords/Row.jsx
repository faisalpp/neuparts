import React,{useState} from 'react'
import {BsPencil,BsFillTrashFill } from 'react-icons/bs'
import {deleteZipCords} from '../../../api/admin/zipCords'
import Toast from '../../../utils/Toast'

const Row = ({item,updateHandler,updateState,getAllZips}) => {

  const [delLoading,setDelLoading] = useState(false);

  const DeleteZip = async (e,id) => {
    e.preventDefault()
    setDelLoading(true)
    const res = await deleteZipCords({id:id})
    if(res.status === 200){
      getAllZips()
      setDelLoading(false)
      Toast(res.data.msg,'success',1000)
    }else{
      setDelLoading(false)
      Toast(res.data.message,'error',1000)
    }
  }
  
  return (
     <tr className="border-b border-l border-r border-b6 text-xs">
      <td className="whitespace-nowrap px-5 py-3 capitalize font-semibold">{item.zipCode}</td>
      <td className="whitespace-nowrap  px-5 py-4 text-b7 font-medium">{item.country}</td>
      <td className="px-5 py-4 text-black font-medium">{item.state}</td>
      <td className="px-5 py-4 text-black font-medium">{item.city}</td>
      <td className="flex items-center justify-center whitespace-nowrap space-x-1 px-5 py-4">
       <button type="button" onClick={e=>updateHandler(e,item._id)} title="Edite Zip Code" className='flex items-center justify-center bg-b3 text-white hover:bg-white hover:text-b3 border-2 border-white hover:border-b3 text-sm px-2 w-fit rounded-full cursor-pointer py-2' >{updateState === item._id ? <img src="/loader-bg.gif" className='w-4 h-4' />:<BsPencil className="text-base" />}</button>
       <button type="button" title="Delete Zip Code" onClick={e=>DeleteZip(e,item._id)} className='flex items-center justify-center bg-red-500/30 text-red-500 hover:bg-white hover:text-red-500 border-2 border-white hover:border-red-500 text-sm px-2 w-fit rounded-full cursor-pointer py-2' >{delLoading ? <img src="/loader-bg.gif" className='w-4 h-4' />: <BsFillTrashFill className="text-base" />}</button>
      </td>
     </tr>
  )
}

export default Row