'use client';
import React, { useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { FiChevronDown } from 'react-icons/fi';
import * as Yup from 'yup';
import BtnLoader from '@/components/Loader/BtnLoader';
import Image from 'next/image';
import Link from 'next/link';

const Form = () => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,25}$/;

  const registerSchema = Yup.object({
    firstName: Yup.string().max(30).required(),
    lastName: Yup.string().max(30).required(),
    email: Yup.string().email().required(),
    phone: Yup.string().required(),
    country: Yup.string().required(),
    password: Yup.string().matches(passwordPattern, 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.').required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('US');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countryList, setCountryList] = useState(['US']);

  const Submit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex w-full flex-col items-center space-y-10 px-5 py-32 pt-20">
        <div>
          <Image width={400} height={400} className="h-auto w-full" src="/login_logo.webp" alt="login_logo" />
        </div>
        <form onSubmit={(e) => Submit(e)} className="flex flex-col space-y-8 rounded-2xl border-[1px] border-gray-200 bg-white px-10 py-10 md:w-7/12 lg:w-[512px] xl:w-[512px]">
          <h4 className="text-xl font-bold">Register</h4>
          <div className="flex flex-col space-y-1">
            <h5 className="text-xs font-semibold">First Name</h5>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full rounded-md border-[1px] border-gray-200 px-4 py-3 text-sm outline-none" placeholder="Jhon" />
          </div>
          <div className="flex flex-col space-y-1">
            <h5 className="text-xs font-semibold">Last Name</h5>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full rounded-md border-[1px] border-gray-200 px-4 py-3 text-sm outline-none" placeholder="Doe" />
          </div>
          <div className="flex flex-col space-y-1">
            <h5 className="text-xs font-semibold">Email Address</h5>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border-[1px] border-gray-200 px-4 py-3 text-sm outline-none" placeholder="youremail@mail.com" />
          </div>
          <div className="flex flex-col space-y-1">
            <div>
              <label className="mb-2 block text-xs font-semibold text-b16">Country</label>
              <div className="relative">
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="h-10 w-full appearance-none rounded-lg border border-[rgba(0,0,0,0.16)] px-4 text-sm outline-none">
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
          <div className="flex flex-col space-y-1">
            <h5 className="text-xs font-semibold">Phone</h5>
            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md border-[1px] border-gray-200 px-4 py-3 text-sm outline-none" placeholder="+1 000-000-0000" />
          </div>
          <div className="flex flex-col space-y-1">
            <h5 className="text-xs font-semibold">Password</h5>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border-[1px] border-gray-200 px-4 py-3 text-sm outline-none" placeholder="Password" />
          </div>
          <div className="flex flex-col space-y-1">
            <h5 className="text-xs font-semibold">Confirm Password</h5>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full rounded-md border-[1px] border-gray-200 px-4 py-3 text-sm outline-none" placeholder="Password" />
          </div>
          <button type={loader ? 'button' : 'submit'} className="flex w-full cursor-pointer items-center justify-center rounded-md bg-b3 py-1">
            {loader ? (
              <BtnLoader style="w-5 py-1" />
            ) : (
              <span className="flex w-fit items-center  rounded-md px-4 py-1 text-center font-semibold text-white">
                <span className="text-xs">Create Account</span>
                <BsArrowRightShort className="text-2xl" />
              </span>
            )}
          </button>
          <div className="flex w-full justify-center">
            <h5 className="text-sm">
              Have an Account?{' '}
              <Link href="/login">
                <span className="cursor-pointer text-b3 hover:underline">Login</span>
              </Link>
            </h5>
          </div>
        </form>
      </div>
      <div className="flex w-full items-center justify-center text-xs font-normal ">
        <div className="flex py-4 text-[9px] text-black/70 md:w-7/12 xl:w-5/12  coxxl:w-5/12 xss-to-xs:w-10/12 xs-to-sm:w-7/12 lg-to-xl:w-6/12">
          <h3 className="w-1/2 xl:w-8/12 coxxl:w-8/12 lg-to-xl:w-8/12">© 2023 Neu Appliances</h3>
          <h3 className="text-end">Terms&nbsp;of&nbsp;Use&nbsp;•&nbsp;Privacy&nbsp;Policy&nbsp;•&nbsp;Help&nbsp;Center</h3>
        </div>
      </div>
    </>
  );
};

export default Form;
