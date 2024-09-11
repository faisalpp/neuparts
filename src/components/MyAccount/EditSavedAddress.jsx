'use client';
import React, { useState } from 'react';
import EditSvg from '@/components/svgs/EditSvg';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {toast} from 'react-toastify'

const EditSavedAddress = ({ loadUpForm, upLoad, refresh, addr }) => {
  
  const [delLoading, setDelLoading] = useState(false);

  const DeleteShippingAddress = async (e, id) => {
    e.preventDefault();
    setDelLoading(true);
    const getToastId = toast.loading('Deleting address...')
    fetch(`/api/user/profile/shipping-address/?id=${id}`,{method:'DELETE'})
     .then((res) => res.json())
     .then((data) => {
     if (data.success) {
       setDelLoading(false)
       refresh()
       toast.update(getToastId, { render: 'Address deleted successfully!', type: 'success', autoClose: 1000, isLoading: false });
     }
    }).catch((error)=>{
      setDelLoading(false)
      toast.update(getToastId, { render: 'Something went wrong!', type: 'error', autoClose: 1000, isLoading: false });
    })
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 mt-3">
        <div className="flex flex-col gap-2">
          <h3 className=" font-semibold">
            {addr?.first_name} {addr?.last_name}
          </h3>
          <span className="text-sm font-medium">{addr?.phone}</span>
          <div className="flex flex-col text-sm">
            <span>{addr?.address}</span>
            <span>{addr?.apartment}</span>
            <span>
              {addr?.city} {addr?.province} {addr?.postal_code}
            </span>
            <span>{addr?.country.toUpperCase()}</span>
          </div>
        </div>
        <div className="flex items-center gap-5 sm:gap-10">
          <span onClick={e=>loadUpForm(e,addr._id)} className='cursor-pointer' ><EditSvg className="text-b3" /></span>
          <RiDeleteBin6Line onClick={(e) => DeleteShippingAddress(e, addr._id)} className={`h-5 w-5 cursor-pointer ${delLoading ? 'text-red-500 animate-pulse' : 'text-b3'}`} />
        </div>
      </div>
      <hr/>
    </>
  );
};

export default EditSavedAddress;
