'use client';
import React, { useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import TextInput from '@/components/TextInput/TextInput';
import * as Yup from 'yup';
import BtnLoader from '@/components/Loader/BtnLoader';
import Image from 'next/image';

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Password is Required!'),
  confirmPassword: Yup.string().required('Confirm Password is Required!'),
});

const Form = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);

  const ValidateResetPassToken = async () => {};

  const HandleResetPassword = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex w-full flex-col items-center space-y-10 py-32 pt-20">
      <div>
        <Image width={400} height={400} alt="Logo" className="h-auto w-full" src="/login_logo.webp" />
      </div>
      <form onSubmit={HandleResetPassword} className="flex w-5/12 flex-col space-y-5 rounded-2xl border-[1px] border-gray-200 bg-white px-10 py-10">
        <h4 className="text-xl font-bold">Reset Password</h4>
        <TextInput width="full" name="password" title="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors && errors.includes('Email is Required!') ? true : false} errormessage="Email is Required!" placeholder="******" />
        <TextInput width="full" name="confirmPassword" title="Re-Type Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={errors && errors.includes('Confirm Password is Required!') ? true : false} errormessage="Confirm Password is Required!" placeholder="******" />
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
