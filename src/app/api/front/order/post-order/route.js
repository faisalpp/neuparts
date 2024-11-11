import Order from '@/models/order';
import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import CmsOrder from '@/lib/neu-order';
import {NeuMailer} from '@/mailer/neu-mailer'
import {OrderTemplate} from '@/mailer/templates/order'

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

      let cart_count = 0;
      let order_items = [];
      for (const outerItem of order.items) {
       for (const item of outerItem.items) {
         cart_count += item.quantity;
         order_items.push(item)
       }
     }
    
      const shipping_address = `${order.shipping_address.address} ${order.shipping_address.apartment} ${order.shipping_address.city} ${order.shipping_address.province} ${order.shipping_address.postal_code} ${order.shipping_address.country}`
      const billing_address = `${order.billing_address.address} ${order.billing_address.apartment} ${order.billing_address.city} ${order.billing_address.province} ${order.billing_address.postal_code} ${order.billing_address.country}`
      
      const orderObj = {
       order,
       shipping_address:shipping_address,
       billing_address:billing_address,
       cart_count:cart_count,
       order_items:order_items
      }
    
      const MailTemplate = OrderTemplate(orderObj,process.env.NEXT_BASE_API)
    
      await NeuMailer(order.shipping_address.email,'Order Confirmation',MailTemplate)


      return NextResponse.json({success: true },{status:200});
    }
    return NextResponse.json({ message: 'Order update failed!', success: false },{status:500});
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error!', success: false });
  }
}