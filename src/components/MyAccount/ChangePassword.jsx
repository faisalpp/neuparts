'use client';
import React, { useState } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import TextInput from '@/components/TextInput/TextInput';
import * as Yup from 'yup';
import BtnLoader from '@/components/Loader/BtnLoader';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
  return (
    <>
      <MyAccount>
        <ChangePasswordData />
      </MyAccount>
    </>
  );
};

export default ChangePassword;

const ChangePasswordData = () => {

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,25}$/;

  const UserId = useSelector((state)=>state.auth.id);

  const [curPassword,setCurPassword] = useState('')
  const [password,setPassword] = useState('')
  const [confPassword,setConfPassword] = useState('')
  const [loading,setLoading] = useState('')

  const changePasswordSchema = Yup.object().shape({
    curPassword: Yup.string()
      .required('Current password is Required!'),
    password: Yup.string()
      .required('Password is Required!').matches(passwordPattern, 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.'),
    confPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match!')
      .matches(passwordPattern, 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.')
      .required('Re-Type Password is Required!'),
  });


  const ChangePassword = async (e) => {
    e.preventDefault()
    
    try {
      await changePasswordSchema.validate({userId:UserId,curPassword,password,confPassword}, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }
    setLoading(true)
    const getToastId = toast.loading('Updating password...')
    fetch('/api/user/profile/change-password', {method: 'POST',
      headers: { 'Content-Type': 'application/json' },body: JSON.stringify({userId:UserId,curPassword,password,confPassword}),
    }).then((res) => res.json())
    .then((data) => {
      if(data.success){
       toast.update(getToastId, { render: 'Password updated!', type: 'success', autoClose: 1000, isLoading: false });
      }else{
       toast.update(getToastId, { render: data.message, type: 'error', autoClose: 1000, isLoading: false }); 
      }
      setPassword('')
      setCurPassword('')
      setConfPassword('')
      setLoading(false)
     }).catch((error) => {
      setPassword('')
      setCurPassword('')
      setConfPassword('')
      setLoading(false)
      toast.update(getToastId, { render: 'Something went wrong!', type: 'error', autoClose: 1000, isLoading: false });
    });
  };

  return (
    <>
      <form onSubmit={ChangePassword} className="flex w-full flex-col gap-6 lg:max-w-[432px]">
        <TextInput title="Current Password" type="password" width="full" value={curPassword} onChange={(e) => setCurPassword(e.target.value)}  />
        <TextInput title="Password" type="password" width="full" value={password} onChange={(e) => setPassword(e.target.value)}  />
        <TextInput title="Re-Type Password" type="password" width="full" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
        <button type={loading ? 'button' : 'submit'} className="flex w-full items-center justify-center rounded-lg bg-b3 py-3 text-xs font-medium text-white">
          {loading ? <BtnLoader style="w-4" /> : 'Change Password'}
        </button>
      </form>
    </>
  );
};

export { ChangePasswordData };
