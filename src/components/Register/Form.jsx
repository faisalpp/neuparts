'use client';
import React, { useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { FiChevronDown } from 'react-icons/fi';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';

const Form = () => {

  const router = useRouter()

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,25}$/;

  const registerVal = Yup.object({
    firstName: Yup.string().max(30).required('First Name is required!'),
    lastName: Yup.string().max(30).required('Last Name is required!'),
    email: Yup.string().email().required('Email is required!'),
    phone: Yup.string().required('Phone is required!'),
    country: Yup.string().required('Country is required!'),
    password: Yup.string().required('Password is required!').matches(passwordPattern, 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match'),
  });

  const [formData,setFormData] = useState({firstName:'',lastName:'',email:'',country:'US',phone:'',password:'',confirmPassword:''})
  const [countryList, setCountryList] = useState(['US']);


  const HandleChange = (e) => {
   const {name,value} = e.target;
   setFormData({...formData,[name]:value})
  }

  const Signup = async (e) => {
    e.preventDefault()

 
    try {
     await registerVal.validate(formData, {abortEarly: false});   
   } catch (error) {
     console.log(error)
     error?.inner?.forEach((err) => {
       toast.error(err.message);
     });
     return
   }
 
   const crtToastId = toast.loading("Signing up...")
   
 
   fetch('/api/user/auth/signup', {method: 'POST',
     headers: { 'Content-Type': 'application/json' },body: JSON.stringify(formData),
   }).then((res) => res.json())
    .then((resp) => {
      console.log(resp)
     if(resp.success){
       setFormData({firstName:'',lastName:'',email:'',country:'US',phone:'',password:'',confirmPassword:''});
       toast.update(crtToastId,{render:'Signup Successfull!',type:'success',autoClose:1000,isLoading: false})
       router.push('/my-account/profile');
      }else{
       toast.update(crtToastId,{render:'Invalid Credentials',type:'error',autoClose:1000,isLoading: false})
      }
     })
     .catch((error) => {
       toast.update(crtToastId,{render:'Something went wrong!',type:'error',autoClose:1000,isLoading: false})
     });
 
   }

  return (
    <>
      <div className="flex w-full flex-col items-center space-y-10 px-5 py-32 pt-20">
        <Link href="/">
          <Image width={400} height={400} quality={100} className="h-auto w-32" src="/neu-blue.webp" alt="login_logo" />
        </Link>
        <form onSubmit={(e)=>Signup(e)} className="flex flex-col space-y-8 rounded-2xl border border-b1/10 bg-white px-10 py-10 md:w-7/12 lg:w-[512px] xl:w-[512px]">
          <h4 className="text-xl font-bold">Register</h4>
          <div className="flex flex-col space-y-2">
            <h5 className="text-xs font-semibold">First Name</h5>
            <input name="firstName" type="text" value={formData.firstName} onChange={HandleChange} className="w-full rounded-md border border-b1/15 px-4 py-3 text-sm outline-none" placeholder="Jhon" />
          </div>
          <div className="flex flex-col space-y-2">
            <h5 className="text-xs font-semibold">Last Name</h5>
            <input name="lastName" type="text" value={formData.lastName} onChange={HandleChange} className="w-full rounded-md border border-b1/15 px-4 py-3 text-sm outline-none" placeholder="Doe" />
          </div>
          <div className="flex flex-col space-y-2">
            <h5 className="text-xs font-semibold">Email Address</h5>
            <input name="email" type="text" value={formData.email} onChange={HandleChange} className="w-full rounded-md border border-b1/15 px-4 py-3 text-sm outline-none" placeholder="youremail@mail.com" />
          </div>
          <div className="flex flex-col space-y-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-b16">Country</label>
              <div className="relative">
                <select name="country" onChange={HandleChange} className="h-10 w-full appearance-none rounded-lg border border-[rgba(0,0,0,0.16)] px-4 text-sm outline-none">
                  {countryList.length > 0 ? (
                    countryList.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))
                  ) : (
                    <option>No Country Data Found!</option>
                  )}
                </select>
                <FiChevronDown className="absolute right-4 top-3" />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h5 className="text-xs font-semibold">Phone</h5>
            <input name="phone" type="number" value={formData.phone} onChange={HandleChange} className="w-full rounded-md border border-b1/15 px-4 py-3 text-sm outline-none" placeholder="+1 000-000-0000" />
          </div>
          <div className="flex flex-col space-y-2">
            <h5 className="text-xs font-semibold">Password</h5>
            <input name="password" type="password" value={formData.password} onChange={HandleChange} className="w-full rounded-md border border-b1/15 px-4 py-3 text-sm outline-none" placeholder="Password" />
          </div>
          <div className="flex flex-col space-y-2">
            <h5 className="text-xs font-semibold">Confirm Password</h5>
            <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={HandleChange} className="w-full rounded-md border border-b1/15 px-4 py-3 text-sm outline-none" placeholder="Password" />
          </div>
          <button type="submit" className="flex w-full cursor-pointer items-center justify-center rounded-md bg-b3 py-3">
              <span className="flex w-fit items-center  rounded-md px-4 text-center font-medium text-white">
                <span className="text-xs">Create Account</span>
                <BsArrowRightShort className="text-2xl" />
              </span>
          </button>
          <div className="flex w-full justify-center">
            <h5 className="text-sm">
              Have an Account?{' '}
              <Link href="/login">
                <span className="cursor-pointer font-bold text-b3 underline">Login</span>
              </Link>
            </h5>
          </div>
        </form>
      </div>
      <div className="flex w-full items-center justify-center text-xs font-normal ">
        <div className="flex py-4 text-[9px] text-black/70 md:w-7/12 xl:w-5/12  coxxl:w-5/12 xss-to-xs:w-10/12 xs-to-sm:w-7/12 lg-to-xl:w-6/12">
          <h3 className="w-1/2 xl:w-8/12 coxxl:w-8/12 lg-to-xl:w-8/12">© 2023 Neu Parts</h3>
          <h3 className="text-end">Terms&nbsp;of&nbsp;Use&nbsp;•&nbsp;Privacy&nbsp;Policy&nbsp;•&nbsp;Help&nbsp;Center</h3>
        </div>
      </div>
    </>
  );
};

export default Form;
