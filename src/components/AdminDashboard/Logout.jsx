'use client'
import React from 'react'
import { BiSolidLogOutCircle } from "react-icons/bi";
import {useRouter} from 'next/navigation'
import { toast } from 'react-toastify';

const Logout = () => {

  const router = useRouter()

  const Logout = async () => {
    const logoutToast = toast.loading('Signing out...')
    fetch('/api/admin/auth/logout',{method:'GET',headers:{'Content-Type':'application/json'}})
    .then((res)=>res.json())
    .then((data)=>{
      if(data.success){
       toast.update(logoutToast,{render:'Signout successfull!',type:'success',autoClose:1000,isLoading: false})
       router.push('/')
      }
    })
    .catch((error)=>{
      toast.update(logoutToast,{render:'Something went wrong!',type:'error',autoClose:1000,isLoading: false})
    })
  }

  return (
    <div onClick={Logout} className="flex items-center ml-3 cursor-pointer rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200">
    <BiSolidLogOutCircle className='text-xl' />
    <span className="mx-2 text-sm font-semibold">Logout</span>
  </div>
  )
}

export default Logout