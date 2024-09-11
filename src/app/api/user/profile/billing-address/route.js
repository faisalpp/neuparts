import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Address from '@/models/address';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    
    const address = await Address.findOne({ user:userId,type:'billing' });
    if(address){
        return NextResponse.json({ address:address ,success: true }, { status: 200 });
    }
    return NextResponse.json({ success: false, message: 'Billing address not available!' }, { status: 404 });
  }catch(error){
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {

    await connect();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    await Address.findByIdAndDelete(id);

    return NextResponse.json({ message:'Billing address deleted successfully!' ,success: true }, { status: 200 });
    
  }catch(error){
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }
}


export async function PUT(request) {
//   try {
    await connect();

    const { userId,email,first_name,last_name,address,apartment,city,country,province,postal_code,phone} = await request.json()

    const isAddress = await Address.findOne({user:userId})

    if(isAddress){
      await Address.findByIdAndUpdate(isAddress._id,{
        email,first_name,last_name,address,apartment,city,country,province,postal_code,phone
      })
    }else{
      await Address.create({
        user:userId,email,first_name,last_name,address,apartment,city,country,province,postal_code,phone,type:'billing'
      });
    }

    return NextResponse.json({ message:'Billing address updated successfully!' ,success: true }, { status: 200 });
//   }catch(error){
//     return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
//   }
}
