import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import PostCategories from '@/models/postCategories'


export async function GET(request){
  await connect()
  const searchParams = request.nextUrl.searchParams
  const postType = searchParams.get('postType');
  if(!postType){
    return  NextResponse.json({cats:[],success: false})   
  }
  
  try{
  const cats = await PostCategories.find({postType:postType})

  return  NextResponse.json({cats:cats,success: true})
  }catch(error){
    return NextResponse.json({error: error.message}, {status: 500})
  }

}