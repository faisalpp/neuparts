import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/user';
import { encryptResetToken } from '@/lib/auth';
import {NeuMailer} from '@/mailer/neu-mailer'
import {ForgotPassword} from '@/mailer/templates/forgot-password'

export async function POST(request) {
 try{   
  await connect();

  const { email } = await request.json();

  //1. find user with request email
  const isUser = await User.findOne({email:email});

  if(isUser){
   const NAME = isUser.firstName + ' ' + isUser.lastName 
   //2. create password reset token
   const token = await encryptResetToken({email:email})
   
   //3. store token in user db
   await User.findByIdAndUpdate(isUser._id,{forget_token:token})

   //4. password reset link
   const ResetUrl = process.env.NEXT_BASE_API + '/reset-password/' + token 
   
   //5. generate mail template
   const MailTemplate = ForgotPassword({url:ResetUrl,name:NAME})

   //6. send password reset email
   await NeuMailer(email,'Forgot Password!',MailTemplate)
   
   return NextResponse.json({ success:true }, { status: 200 });
   
  }else{
    return NextResponse.json({ message:'No user is matched with this email!',success:false }, { status: 404 });
  }
 }catch(error){
    return NextResponse.json({ message:'Something went wrong!',success:false }, { status: 500 });
 }
}
