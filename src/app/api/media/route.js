import Media from '@/models/media'
import { NextResponse } from 'next/server';
import {connect} from '@/DB/index'
import * as Yup from "yup";

export async function GET(){
  await connect()
  try{
    const allMedia = await Media.find({});
    return  NextResponse.json({media:allMedia,success: true})   
  }catch(error){
    return  NextResponse.json({message:'Internal Server Error!',success: false})   
  }
}

export async function PUT(request){
  await connect()

  const data = await request.json()
  console.log(data)
  const MediaVal = Yup.object({
    id: Yup.string().required('Id is required!'),
    name: Yup.string().required('Name is required!'),
    alt: Yup.string().required('Alt is required!'),
  })
  
  try{
    await MediaVal.validate(data, {abortEarly: false});
  }catch(error){
    return  NextResponse.json({message:'Internal Server Error!',success: false})   
  }


  const {id,name,alt} = data;
  
  try{
    const isUpdated = await Media.findByIdAndUpdate(id,{
      name,alt
    });

    if(!isUpdated){
      return  NextResponse.json({message:'Something went wrong!',success: false})   
    }

    return  NextResponse.json({message:'Media Updated!',success: true})   
  }catch(error){
    return  NextResponse.json({message:'Internal Server Error!',success: false})   
  }
}