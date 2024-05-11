'use client';
import React, { useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import * as Yup from 'yup';
import TextInput from '@/components/TextInput/TextInput';
import BtnLoader from '@/components/Loader/BtnLoader';
import Image from 'next/image';

const Form = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is Required!'),
  });

  const HandleForgotPassword = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex w-full flex-col items-center space-y-10 py-32 pt-20">
      <div>
        <Image width={400} height={400} quality={100} className="h-auto w-full" src="/login_logo.webp" alt="login_logo" />
      </div>
      <form onSubmit={HandleForgotPassword} className="flex w-5/12 flex-col space-y-5 rounded-2xl border-[1px] border-gray-200 bg-white px-10 py-10">
        <h4 className="text-xl font-bold">Forgot Password</h4>
        <TextInput width="full" name="email" title="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} error={errors && errors.includes('Email is Required!') ? true : false} errormessage="Email is Required!" placeholder="youremail@gmail.com" />
        <button className="flex w-full cursor-pointer items-center justify-center rounded-md bg-b3 py-1">
          {loading ? (
            <BtnLoader style="w-7" />
          ) : (
            <span className="flex w-fit items-center  rounded-md px-4 py-1 text-center font-semibold text-white">
              <span className="text-xs">Submit</span>
              <BsArrowRightShort className="text-2xl" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;
