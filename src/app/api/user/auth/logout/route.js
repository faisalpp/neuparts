import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import { cookies } from "next/headers";


export async function GET(request){
    await connect()

    try{
        cookies().set('neu-user','',{expires:new Date(0)})
        return NextResponse.json({success:true,msg:'Logout successfull!'},{status:200})
    }catch(error){
        return NextResponse.json({success:false},{status:500})
    }
}