import React from 'react';
import Form from '@/components/ResetPassword/Form';
import dbConnect from '@/lib/db'
import User from '@/models/user'
import {decryptResetToken} from '@/lib/auth'
import { redirect } from 'next/navigation';

const CheckToken = async (token) => {
 try{
  await dbConnect()

  const payload = await decryptResetToken(token)
  
  if(payload?.email){
    const user = await User.findOne({email:payload.email})
    if(user && user.forget_token === token){
     return {data:payload.email,status:200}
    }else{
     return {status:404}
    }
  }else{
    return {status:404}
  }

 }catch(error){
  return {status:500}
 }
}


const Page = async ({ params }) => {
  
  const res = await CheckToken(params.token)
  if(res.status === 500){
    redirect('/500','push')
  }else if(res.status === 404){
    redirect('/404','push')
  }else{
    return <Form email={res.data} />;
  }
};

export default Page;
