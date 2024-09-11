import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Order from '@/models/order';
import * as Yup from 'yup';

export async function POST(request) {
    try {
      await connect();
      
      const ValStatus = Yup.object({
        orderId: Yup.string().required('Order Id is required!'),
        type: Yup.string().required('Type is required!'),
        status: Yup.string().required('Status is required!'),
      });

      const {orderId,type,status} = await request.json()
      
      await ValStatus.validate({orderId,type,status}, { abortEarly: false });

      let data = {};
      switch(type){
       case 'order':
        data.order_status = status;
        break;
       case 'payment':
        data.payment_status = status;
        break;
      }

      const isUpdated = await Order.findByIdAndUpdate(orderId,data)

      if(isUpdated){
        return NextResponse.json({ error: 'Order status updated!', success: true });  
      }
      return NextResponse.json({ error: 'Something went wrong!', success: true },{status:500});
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }