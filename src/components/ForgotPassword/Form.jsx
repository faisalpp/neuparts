'use client';
import React, { useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import * as Yup from 'yup';
import TextInput from '@/components/TextInput/TextInput';
import Image from 'next/image';
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';

const Form = () => {

  const router = useRouter()

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is Required!'),
  });

  const HandleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await forgotPasswordSchema.validate({email}, {abortEarly: false});   
    } catch (error) {
      (error)
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return
    }
    setLoading(true)
    const getToastId = toast.loading('Please wait...')
    await fetch('/api/user/forgot-password', {method: 'POST',headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email:email}),
    }).then((res)=> res.json())
    .then((data)=>{
     if(data.success){
      toast.update(getToastId, { render: 'Password reset link is sent to your email!', type: 'success', autoClose: 1000, isLoading: false });
      router.push('/login')
     }else{
      toast.update(getToastId, { render: data.message, type: 'success', autoClose: 1000, isLoading: false });
     }
     setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      toast.update(getToastId, { render: 'Something went wrong!', type: 'error', autoClose: 1000, isLoading: false });
    })
  };


  return (
    <div className="flex w-full flex-col items-center space-y-10 py-32 pt-20">
      <div>
        <Image width={400} height={400} quality={100} className="h-auto w-full" src="/login_logo.webp" alt="login_logo" />
      </div>
      <form onSubmit={HandleForgotPassword} className="flex w-5/12 flex-col space-y-5 rounded-2xl border-[1px] border-gray-200 bg-white px-10 py-10">
        <h4 className="text-xl font-bold">Forgot Password</h4>
        <TextInput width="full" name="email" title="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" />
        <button disabled={loading ? true : false} className={`flex w-full ${loading ? 'cursor-default bg-b3/50' : 'cursor-pointer bg-b3'} items-center justify-center rounded-md py-1`}>
            <span className="flex w-fit items-center  rounded-md px-4 py-1 text-center font-semibold text-white">
              <span className="text-xs">Submit</span>
              <BsArrowRightShort className="text-2xl" />
            </span>
        </button>
      </form>
    </div>
  );
};

export default Form;
