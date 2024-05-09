import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import {BiArchive} from 'react-icons/bi'
import {BsPencil} from 'react-icons/bs'
import {AiOutlineRedo} from 'react-icons/ai'
import {archiveOrderById,unarchiveOrderById} from '../../../api/admin/order'
import Toast from '../../../utils/Toast'
import BtnLoader from '../../Loader/BtnLoader'

const OrderRow = ({id,orderNo,orderType,date,orderStatus,isArchived,paymentStatus,total,refreshOrders}) => {

  const [arcLoader,setArcLoader] = useState(false)

  const ArchiveOrder = async (e,orderId) => {
    e.preventDefault()
    setArcLoader(true)
    const res = await archiveOrderById({orderId:orderId})
    if(res.status === 200){
      Toast(res.data.msg,'success',1000)
      setArcLoader(false)
      refreshOrders()
    }else{
      Toast(res.data.message,'error',1000)
      setArcLoader(false)
    }

  }

  const [uarcLoader,setuArcLoader] = useState(false)

  const UnArchiveOrder = async (e,orderId) => {
    e.preventDefault()
    setuArcLoader(true)
    const res = await unarchiveOrderById({orderId:orderId})
    if(res.status === 200){
      Toast(res.data.msg,'success',1000)
      setuArcLoader(false)
      refreshOrders()
    }else{
      Toast(res.data.message,'error',1000)
      setuArcLoader(false)
    }

  }

  return (
    <tr className="border-b border-l border-r border-b6 text-xs">
        <td className="whitespace-nowrap px-5 py-3">{orderNo}</td>
        <td className="whitespace-nowrap px-5 py-3 capitalize"><span className='bg-b7/20 text-b7 px-2 rounded-2xl py-1 font-semibold' >{orderType}</span></td>
        <td className="whitespace-nowrap px-5 py-3 capitalize">{date}</td>
        <td className="whitespace-nowrap px-5 py-3 capitalize">
          <span className='bg-b6/20 text-b6 px-2 rounded-2xl py-1 font-semibold' >{orderStatus.replace(/\-/g,' ')}</span>
        </td>
        <td className="whitespace-nowrap  px-5 py-4 text-b6 font-semibold text-sm ">${total}</td>
        <td className="flex items-center justify-center whitespace-nowrap space-x-1 px-5 py-4">
         <NavLink title="View Order" to={`/admin/update-order/${orderNo}`} className='flex items-center justify-center bg-b3 text-white hover:bg-white hover:text-b3 border-2 border-white hover:border-b3 text-sm px-2 w-fit rounded-full cursor-pointer py-2' ><BsPencil className="text-base" /></NavLink>
         {isArchived ? <>
         {uarcLoader ? <button title="UnArchive Order" className='flex items-center justify-center bg-green-500 text-white hover:bg-white hover:text-green-500 border-2 border-white hover:border-green-500 text-sm w-9 h-9 rounded-full cursor-wait' ><BtnLoader style="w-3 h-3" /></button>
           :
           <button onClick={e=>UnArchiveOrder(e,id)} title="UnArchive Order" className='flex items-center justify-center bg-green-500 text-white hover:bg-white hover:text-green-500 border-2 border-white hover:border-green-500 text-sm px-2 w-fit rounded-full cursor-pointer py-2' >
          <AiOutlineRedo className="text-base" />
         </button>}
         </> :
          <>
         {arcLoader ? <button title="Archive Order" className='flex items-center justify-center bg-orange-500 text-white hover:bg-white hover:text-orange-500 border-2 border-white hover:border-orange-500 text-sm w-9 h-9 rounded-full cursor-wait' ><BtnLoader style="w-3 h-3" /></button>
           :
           <button onClick={e=>ArchiveOrder(e,id)} title="Archive Order" className='flex items-center justify-center bg-orange-500 text-white hover:bg-white hover:text-orange-500 border-2 border-white hover:border-orange-500 text-sm px-2 w-fit rounded-full cursor-pointer py-2' >
          <BiArchive className="text-base" />
         </button>}
           </>}
        </td>
      </tr>
  )
}

export default OrderRow