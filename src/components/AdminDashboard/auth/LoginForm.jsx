"use client"

import React,{useState} from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import {toast} from 'react-toastify'
import * as Yup from "yup";
import { useRouter } from 'next/navigation'

const Form = () => {

  const [formData,setFormData] = useState({email:'',password:''});
  const router = useRouter()

  const HandleChange = (e) => {
    const {value,name} = e.target;
    setFormData({...formData,[name]:value})
  }

  const Login = async (e) => {
   e.preventDefault()

   const ValAdmin = Yup.object({
    email: Yup.string().required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  })

   try {
    await ValAdmin.validate(formData, {abortEarly: false});   
  } catch (error) {
    (error)
    error?.inner?.forEach((err) => {
      toast.error(err.message);
    });
    return
  }

  const crtToastId = toast.loading("Please wait...")
  

  fetch('/api/admin/auth/login', {method: 'POST',
    headers: { 'Content-Type': 'application/json' },body: JSON.stringify(formData),
  }).then((res) => res.json())
   .then((resp) => {
    if(resp.success){
      setFormData({email:'',password:''});
      toast.update(crtToastId,{render:'Login Successfull!',type:'success',autoClose:1000,isLoading: false})
      router.push('/neu-admin');
     }else{
      toast.update(crtToastId,{render:'Invalid User Credentials',type:'error',autoClose:1000,isLoading: false})
     }
    })
    .catch((error) => {
      toast.update(crtToastId,{render:'Something went wrong!',type:'error',autoClose:1000,isLoading: false})
    });

  }

  return (
    <div className='flex flex-col w-full items-center'>
      <div className="flex w-full flex-col items-center space-y-8 px-5 py-32 pt-20">
        <Link href="/">
          <Image width={400} height={400} quality={100} className="h-auto w-32" src="/neu-blue.webp" alt="login_logo" />
        </Link>
        <form onSubmit={Login} className="flex flex-col space-y-8 rounded-2xl border border-b1/10 bg-white px-10 py-10 md:w-7/12 lg:w-[512px] xl:w-[512px]">
          <h4 className="text-xl font-bold text-center">Admin</h4>
          <div className="flex flex-col space-y-2">
            <h5 className="text-xs font-semibold">Email Address</h5>
            <input type="email" name="email" value={formData.email} onChange={HandleChange} className="w-full rounded-md border border-b1/15 px-4 py-3 text-sm outline-none" placeholder="youremail@mail.com" />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <h5 className="text-xs font-semibold">Password</h5>
            </div>
            <input type="password" name="password" value={formData.password} onChange={HandleChange} className="w-full rounded-md border border-b1/15 px-4 py-3 text-sm outline-none" />
          </div>
          <button type="submit" className="flex w-full cursor-pointer items-center justify-center rounded-md bg-b3 py-3 font-medium text-white">
            <span className="text-xs">Login</span>
            <BsArrowRightShort className="text-2xl" />
          </button>
        </form>
      </div>
      <div className="flex w-full items-center justify-center text-xs font-normal ">
        <div className="flex py-4 text-[9px] text-black/70 md:w-7/12 xl:w-5/12  coxxl:w-5/12 xss-to-xs:w-10/12 xs-to-sm:w-7/12 lg-to-xl:w-6/12">
          <h3 className="w-1/2 xl:w-8/12 coxxl:w-8/12 lg-to-xl:w-8/12">© 2023 Neu Parts</h3>
          <h3 className="text-end">Terms&nbsp;of&nbsp;Use&nbsp;•&nbsp;Privacy&nbsp;Policy&nbsp;•&nbsp;Help&nbsp;Center</h3>
        </div>
      </div>
    </div>
  );
};

export default Form;
