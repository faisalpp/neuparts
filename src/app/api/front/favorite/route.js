import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Favorite from '@/models/favorite'


export async function POST(req) {
  try{
    await connect();

    const {userId} = await req.json()

    const favorites = await Favorite.find({userId:userId}).populate('item')

    return NextResponse.json({favorites:favorites ,success: true },{status:200});
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Something went wrong!' },{status:500});
  }
}


export async function PUT(req) {
  try{
    await connect();

    const {userId,productId} = await req.json()

    const isCreated = await Favorite.create({
      userId:userId,item:productId
    })

    if(isCreated){
        return NextResponse.json({product:{_id:isCreated._id,favId:productId},message:'Product added to favorite!' ,success: true },{status:200});
    }
    
    return NextResponse.json({message:'Adding to favorite failed!' ,success: false },{status:500});
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Something went wrong!' },{status:500});
  }
}


export async function DELETE(req) {
  try{
    await connect();

    const {_id} = await req.json()

    const isDeleted = await Favorite.findByIdAndDelete(_id)
    
    if(isDeleted){
      return NextResponse.json({_id:_id,message:'Favorite product deleted successfully!' ,success: true },{status:200});
    }
    
    return NextResponse.json({message:'Deleting favorite product failed!' ,success: false },{status:500});
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Something went wrong!' },{status:500});
  }
}
