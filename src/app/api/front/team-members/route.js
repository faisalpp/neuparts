import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import TeamMember from '@/models/teamMembers'

export async function GET(){
  try{
    await connect();

    const teamMembers = await TeamMember.find({});
    
    return  NextResponse.json({members:teamMembers,success: true})
  }catch(error){
    return NextResponse.json({error: error.message}, {status: 500})
  }
}