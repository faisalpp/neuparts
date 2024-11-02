import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Menufacturer from '@/models/productManufacturer';
import { generateSlug } from '@/utils/index';

export async function POST(request) {
  
  try {
    await connect();
    const res = await request.json();

    let slug = generateSlug(res.title);

    const is = await Menufacturer.findOne({slug: slug });
    if(is){
     return NextResponse.json({ message: 'Menufacturer already exists!', success: false },{status:401});
    }else{
     const isCreated = await Menufacturer.create({ ...res, slug: slug });
    
     if (isCreated) {
       return NextResponse.json({ message: 'Menufacturer Created!', success: true });
     }
     return NextResponse.json({ message: 'Something Went Wrong!', success: false },{status:500});
    }

  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();

    const menufacturers = await Menufacturer.find({});

    return NextResponse.json({ menufacturers, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connect();
    const res = await request.json();
    const id = res.id;
    if (!id) {
      return NextResponse.json({ message: 'Menufacturer id required!', success: false });
    }

    const isDeleted = await Menufacturer.findByIdAndDelete(id);
    if (isDeleted) {
      return NextResponse.json({ message: 'Menufacturer Deleted!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connect();
    const res = await request.json();
    const id = res._id;
    if (!id) {
      return NextResponse.json({ message: 'Part Type id required!', success: false });
    }

    let slug = generateSlug(res.title);

    const is = await Menufacturer.findOne({slug: slug });
    if(is){
     return NextResponse.json({ message: 'Menufacturer already exists!', success: false },{status:401});
    }else{
     const isUpdated = await ProductTyoe.findByIdAndUpdate(id, {...res,slug:slug});
    
     if (isUpdated) {
       return NextResponse.json({ message: 'Menufacturer Updated!', success: true });
     }
     return NextResponse.json({ message: 'Something Went Wrong!', success: false },{status:500});
    }

  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
