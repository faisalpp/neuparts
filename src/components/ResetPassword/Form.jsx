'use client'
import React, { useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import TextInput from '@/components/TextInput/TextInput';
import * as Yup from 'yup';
import Image from 'next/image';
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';

const Form = ({email}) => {
  const router = useRouter()

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,25}$/;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const resetPasswordSchema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string()
    .required('Password is Required!').matches(passwordPattern, 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match!')
    .matches(passwordPattern, 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.')
    .required('Re-Type Password is Required!'),
  });

  const HandleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await resetPasswordSchema.validate({email,password,confirmPassword}, {abortEarly: false});   
    } catch (error) {
      (error)
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return
    }
    setLoading(true)
    const getToastId = toast.loading('Please wait...')
    await fetch('/api/user/reset-password', {method: 'POST',headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email:email,password:password}),
    }).then((res)=> res.json())
    .then((data)=>{
     if(data.success){
      toast.update(getToastId, { render: 'Password changed successfully!', type: 'success', autoClose: 1000, isLoading: false });
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
        <Image width={400} height={400} alt="Logo" className="h-auto w-full" src="/login_logo.webp" />
      </div>
      <form onSubmit={HandleResetPassword} className="flex w-5/12 flex-col space-y-5 rounded-2xl border-[1px] border-gray-200 bg-white px-10 py-10">
        <h4 className="text-xl font-bold">Reset Password</h4>
        <TextInput width="full" name="password" title="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" />
        <TextInput width="full" name="confirmPassword" title="Re-Type Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  placeholder="" />
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
