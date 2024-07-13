import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import Admin from '@/models/admin'
import bcrypt from 'bcrypt'


export async function POST(request){
    await connect()
   
    const {email,password} = await request.json()

    const hash = await bcrypt.hash(password,10);

    try{
     await Admin.create({email,password:hash})
     return NextResponse.json({success:true,msg:'Signup successfull!'})
    }catch(error){
      return NextResponse.json({error: error.message}, {status: 500})
    }

}