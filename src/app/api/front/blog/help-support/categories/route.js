import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import PostCategories from '@/models/postCategories'

export async function GET(){
    try{
      await connect();
      
      let query = {postType:'help-support'};
         
      const cats = await PostCategories.aggregate([
      { $match: query },
      {
        $addFields: {
          categoryIdString: { $toString: '$_id' }
        }
      },
      {
        $lookup: {
          from: 'posts', // Name of the posts collection
          localField: 'categoryIdString', // Field from PostCategories (as string)
          foreignField: 'category', // Field from Posts (as string)
          as: 'posts' // Output array field
        }
      },
      {
        $addFields: {
          postCount: { $size: '$posts' }
        }
      },
       // Project to include only necessary fields
       {
        $project: {
          _id: 1,
          title: 1,
          slug: 1,
          postCount: 1,
          thumbnail:1
        }
      },
      { $sort: { _id: 1 } }
    ]);

  
      return  NextResponse.json({cats:cats,success: true})
    }catch(error){
      return NextResponse.json({error: error.message}, {status: 500})
    }
  }