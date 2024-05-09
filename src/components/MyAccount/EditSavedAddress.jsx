import React,{useState} from 'react';
import EditSvg from '../../svgs/EditSvg';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {deleteShippingAddress} from '../../api/user/profile'
import Toast from '../../utils/Toast'
import BtnLoader from '../Loader/BtnLoader'

const EditSavedAddress = ({loadUpForm,upLoad,refresh,addr}) => {

    const [delLoading,setDelLoading] = useState(false)

    const DeleteShippingAddress = async (e,id) => {
     e.preventDefault()
     setDelLoading(true)
     const res = await deleteShippingAddress({id:id})
     if(res.status === 200){
        refresh()
        setDelLoading(false)
       Toast(res.data.msg,'success',1000)
    }else{
        setDelLoading(false)
     Toast(res.data.message,'error',1000)
    }

    }

    return (
        <>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex flex-col gap-4'>
                    <h3 className=' font-semibold'>{addr?.firstName} {addr?.lastName}</h3>
                    <span className='font-medium text-sm'>
                        {addr?.phone}
                    </span>
                    <div className='text-sm flex flex-col'>
                        <span>{addr?.address}</span>
                        <span>{addr?.city} {addr?.state} {addr?.postalCode}</span>
                        <span>{addr?.country.toUpperCase()}</span>
                    </div>
                </div>
                <div className='flex gap-5 sm:gap-10 items-center'>
                    {upLoad === addr._id ? <BtnLoader style="w-5" /> : <span onClick={e=>loadUpForm(e,addr._id)} className='cursor-pointer' ><EditSvg  /></span>}
                    {delLoading ? <BtnLoader style="w-5" />:<RiDeleteBin6Line onClick={e=>DeleteShippingAddress(e,addr._id)} className='text-b3 w-5 h-5 cursor-pointer' />}
                </div>
            </div>
            <hr className='bg-[rgba(0,0,0,0.08)]' />
        </>
    )
}

export default EditSavedAddress