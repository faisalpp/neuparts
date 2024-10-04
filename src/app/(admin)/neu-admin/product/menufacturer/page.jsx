'use client';

import React, { useEffect, useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Page = () => {
  
  const [dLoading,setDLoading] = useState('')
  const [isLoading,setLoading] = useState(false)
  const [cLoading,setCloading] = useState(false)
  const [menufacturer,setMenufacturer] = useState('')
  const [menufacturers,setMenufacturers] = useState([])

  const GetData = async () => {
    setLoading(true)
    await fetch(`/api/admin/product/menufacturer`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setMenufacturers(data.menufacturers);
      } else {
        setMenufacturers([]);
      }
      setLoading(false);
    });
  }

  useEffect(()=>{
    GetData()
  },[])

  const SaveData = async (e) => {
    e.preventDefault()
    
    if(menufacturer === ''){
      toast.error('Menufacturer field is required!')
      return;
    }
    setCloading(true)
    const CrloadingId = toast.loading('Saving menufacturer...');
    fetch('/api/admin/product/menufacturer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({title:menufacturer}) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          GetData()
          toast.update(CrloadingId, { render:resp.message,type: 'success', autoClose: 1000, isLoading: false });
          setMenufacturer('')
        } else {
          toast.update(CrloadingId, { render:resp.message,type: 'error', autoClose: 1000, isLoading: false });
        }
        setCloading(false)
      })
      .catch((error) => {
        setCloading(false)
        toast.update(CrloadingId, { render:'Something went wrong!',type: 'error', autoClose: 1000, isLoading: false });
      });
  }


  const DeleteMenufacturer = async (id) => {
    if (!id) {
      toast.error('Menufacturer id required!');
      return;
    }

    const delToastId = toast.loading('Deleting menufacturer...');
    setDLoading(id)
    await fetch('/api/admin/product/menufacturer', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          GetData()
          toast.update(delToastId, { render: resp.message, type: 'success', autoClose: 1000, isLoading: false });
        } else {
          toast.update(delToastId, { type: 'error',render:resp.message ,autoClose: 1000, isLoading: false });
        }
        setDLoading('')
      })
      .catch((error) => {
        setDLoading('')
        toast.update(delToastId, { type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
      });
  };


  function LoaderSkelton(){
   return (
    <>
    <div className='flex items-center justify-between bg-gray-200 animate-pulse h-fit min-w-20 px-4 py-1 rounded-2xl' ><span className='text-gray-200 font-bold' >LG</span></div>
    <div className='flex items-center justify-between bg-gray-200 animate-pulse h-fit min-w-20 px-4 py-1 rounded-2xl' ><span className='text-gray-200 font-bold' >LG</span></div>
    <div className='flex items-center justify-between bg-gray-200 animate-pulse h-fit min-w-20 px-4 py-1 rounded-2xl' ><span className='text-gray-200 font-bold' >LG</span></div>
    <div className='flex items-center justify-between bg-gray-200 animate-pulse h-fit min-w-20 px-4 py-1 rounded-2xl' ><span className='text-gray-200 font-bold' >LG</span></div>
    <div className='flex items-center justify-between bg-gray-200 animate-pulse h-fit min-w-20 px-4 py-1 rounded-2xl' ><span className='text-gray-200 font-bold' >LG</span></div>
    </>
   )
  }

  return (
    <>
    <div className="mx-10 flex flex-col">
     <div className='flex flex-col w-full rounded-xl shadow-xl mt-10' >
      <form onSubmit={SaveData} className='bg-gray-100 py-3 px-5 rounded-t-xl' >
       <div className='flex items-center gap-5' ><input onChange={(e)=>setMenufacturer(e.target.value)} value={menufacturer} type="text" className='outline-none border border-b3 rounded-lg text-sm px-2 py-1' placeholder='Type menufacturer name here' /><button className='flex items-center rounded-lg bg-b4 px-3 py-1 font-bold text-sm' ><IoSaveSharp/>&nbsp;<span>Save</span></button>{cLoading ? <AiOutlineLoading3Quarters className='animate-spin text-red-300' />:null}</div>
      </form>

      {/* Pills Data */}
      <div className='flex flex-wrap gap-5 min-h-72 overflow-x-hidden overflow-y-scroll px-5 py-5' style={{'maxHeight':'calc(100vh - 200px)'}} > 
       {/* Pill */}
       {isLoading ? <LoaderSkelton/> : 
        menufacturers.length > 0 ? menufacturers.map((menu)=>(<div key={menu._id} className={`flex gap-2 items-center justify-between ${dLoading === menu._id ? 'bg-red-500 animate-pulse' :'bg-b3'} h-fit min-w-20 px-4 py-1 rounded-2xl`} ><span className='text-white font-bold' >{menu.title}</span>{dLoading === menu._id ? null : <IoIosCloseCircle onClick={()=>DeleteMenufacturer(menu._id)} className='text-red-500 bg-white rounded-xl cursor-pointer' />}</div>)
       ):<span className='text-red-500' >No menufacturers found!</span>}
       {/* Data Loader */}
       
      </div>
    
    </div>

    </div>

    </>
  );
};

export default Page;
