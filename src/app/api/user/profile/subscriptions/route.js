import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import NewsLetter from '@/models/newsLetter';


export async function GET(request) {

  try{
    await connect();

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    const newsletter = await NewsLetter.findOne({email:email})
    
    return NextResponse.json({ newsletter:newsletter,success: true }, { status: 200 });

  }catch(error){
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }

}

export async function PUT(request) {
  try {
    await connect();

    const { email,type,value} = await request.json()
     
    const updatedLetter = await NewsLetter.findOneAndUpdate(
        { email: email }, // Find the user by email
        { $set: {[type]:value} }, // Update with new data
        { new: true, runValidators: true } // Options: return the updated document, validate schema
    );
    
    if(updatedLetter){
      return NextResponse.json({value:value ,message:'Newsletter updated successfully!' ,success: true }, { status: 200 });
    }

    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }catch(error){
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }
}
