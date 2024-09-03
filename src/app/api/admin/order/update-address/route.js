import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Address from '@/models/address';
import * as Yup from 'yup';


export async function POST(request) {
    await connect();
  
    const ValAddress = Yup.object({
      id: Yup.string().required('Id is required!'),
      type: Yup.string().required('Address Type is required!'),
      email: Yup.string().required('Email is required!'),
      first_name: Yup.string().required('First Name is required!'),
      last_name: Yup.string().required('Last Name is required!'),
      address: Yup.string().required('Review is required!'),
      appartment: Yup.string(),
      city: Yup.string().required('City is required!'),
      province: Yup.string().required('Province is required!'),
      country: Yup.string().required('Country is required!'),
      postal_code: Yup.string().required('Postal Code is required!'),
      phone: Yup.string().required('Phone is required!'),
    });
  
    try {
      const {id,type,email,first_name,last_name,address,appartment,city,province,country,postal_code,phone} = await request.json();
      await ValAddress.validate({id,type,email,first_name,last_name,address,appartment,city,province,country,postal_code,phone}, { abortEarly: false });
  
      const isUpdated = await Address.findByIdAndUpdate(id,{
        type,email,first_name,last_name,address,appartment,city,province,country,postal_code,phone
      })
  
      if (isUpdated) {
        return NextResponse.json({ message: 'Address Updated!', success: true });
      }
      return NextResponse.json({ message: 'Something Went Wrong!', success: false },{status:500});
    } catch (error) {
      return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
  }