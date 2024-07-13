
import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import Review from '@/models/reviews'

export async function GET(request){
    try{
      await connect();
      const searchParams = request.nextUrl.searchParams
      const page = searchParams.get('page')

      const query = {pages: { $in: [page, 'all'] }}
         
      const reviews = await Review.find(query);
    
      if(reviews){
        return  NextResponse.json({reviews:reviews,success: true})
      }else{
        return NextResponse.json({success:false})
      }

    }catch(error){
      return NextResponse.json({error: error.message}, {status: 500})
    }
  }