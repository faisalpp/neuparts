import Order from '@/models/order';
import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import CmsOrder from '@/lib/neu-order';

export async function POST(request) {

  try {
    await connect();

    const {orderId,intent,paymentStatus} = await request.json()

    const order = await Order.findOne({_id:orderId})

    let isSynced = false;
    if(paymentStatus === 'Completed'){
      //Send order to neulink CMS
      const isSent = await CmsOrder({
        user:order.user,order_no:order.order_no,items:order.items,
        coupons:order.coupons,billing_address:order.billing_address,
        shipping_address:order.shipping_address,sub_total:order.sub_total,
        vat:order.vat,shipping:order.shipping,
        grand_total:order.grand_total,order_status:order.order_status,
        payment_status:order.payment_status,
      });
      
      if(isSent){
        isSynced = true
      }
    }


    
    const isUpdated = await Order.findByIdAndUpdate(orderId,
      {payment_intent: intent,payment_status: paymentStatus,is_synced:isSynced},
      { new: true });
    if(isUpdated){
      return NextResponse.json({success: true },{status:200});
    }
    return NextResponse.json({ message: 'Order update failed!', success: false },{status:500});
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error!', success: false });
  }
}