import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Address from '@/models/address';


export async function GET(request) {
  try {

    await connect();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    const addresses = await Address.find({ user:id,type:'shipping' });

    return NextResponse.json({ addresses:addresses ,success: true, }, { status: 200 });
    
  }catch(error){
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {

    await connect();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    await Address.findByIdAndUpdate(id);

    return NextResponse.json({ message:'Shipping address deleted successfully!' ,success: true }, { status: 200 });
    
  }catch(error){
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }
}


export async function PUT(request) {
  try {
    await connect();

    const { id,email,first_name,last_name,address,apartment,city,country,province,postal_code,phone} = await request.json()

    await Address.findByIdAndUpdate(id,{
      email,first_name,last_name,address,apartment,city,country,province,postal_code,phone
    });

    return NextResponse.json({ message:'Shipping address updated successfully!' ,success: true }, { status: 200 });
  }catch(error){
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { status: 500 });
  }
}
