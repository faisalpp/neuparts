import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import PostCategories from '@/models/postCategories'

export async function GET(){
    try{
      await connect();
      
      let query = {postType:'general-faqs'};
         
      const cats = await PostCategories.find(query);
    
      return  NextResponse.json({tabs:cats,success: true})

    }catch(error){
      return NextResponse.json({error: error.message}, {status: 500})
    }
  }