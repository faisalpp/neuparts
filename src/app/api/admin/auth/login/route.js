import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import Admin from '@/models/admin'
import bcrypt from 'bcrypt'
import {encrypt} from '@/lib/auth'
import { cookies } from "next/headers";


export async function POST(request){
    await connect()
   
    const {email,password} = await request.json()

    let user;
    try{
     user = await Admin.findOne({email:email});
     if(!user){
        ('null')
      return NextResponse.json({success:false,msg:'Ivalid User Credentials!'},{status:401})
     }
    }catch(error){
      return NextResponse.json({error: error.message}, {status: 500})
    }

    const hash = await bcrypt.compare(password,user.password);
    const expiredAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    
    if(hash){
      const session = await encrypt({email:user.email,expiredAt});
      cookies().set('neu-admin',session,{expires:expiredAt,httpOnly:false})
      return NextResponse.json({success:true,msg:'Login successfull!'},{status:200})
    }else{
      return NextResponse.json({success:false,msg:'Ivalid User Credentials!'},{status:401})
    }



}