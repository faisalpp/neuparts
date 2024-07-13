import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import PostCategories from '@/models/postCategories'

export async function GET(request){
    try{
      await connect();
      const searchParams = request.nextUrl.searchParams
      const limit = searchParams.get('limit') || 3
  
      const page = searchParams.get('page') || 1;
      const skip = (page - 1 ) * parseInt(limit);
      
      let query = {postType:'appliance-tips'};
         
      const PostCountPromise = PostCategories.countDocuments(query);
      const GetPostsPromise = PostCategories.aggregate([
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
          postCount: 1,
          thumbnail:1
        }
      },
      { $sort: { _id: 1 } }, // Sort by _id or any other field
      { $skip: skip },
      { $limit: parseInt(limit) }
    ]);

      
      const [count,cats] = await Promise.all([PostCountPromise,GetPostsPromise])
  
      const pageCount = Math.ceil(count / limit);
      
      return  NextResponse.json({cats:cats,pagination:{pageCount,count},success: true})
    }catch(error){
      return NextResponse.json({error: error.message}, {status: 500})
    }
  }