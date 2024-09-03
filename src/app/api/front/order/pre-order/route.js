import Order from '@/models/order';
import Address from '@/models/address'
import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import {checkSession} from '@/lib/auth'
import {GetOrderNo,SubscribeNewsLetter,generateRandomPassword,CreateCustomer} from '@/utils/order'

export async function POST(request) {

  try {
    await connect();

    const {items,billingAddress,shippingAddress,subTotal,coupons,shipping,vat,grandTotal} = await request.json()

    // Todo: generate unique order no
    const ORDER_NO = await GetOrderNo();
    if(!ORDER_NO){
      return NextResponse.json({ message: 'Order no is not generatable!', success: false });    
    }

    // Todo: newsletter subscribe
    if(shippingAddress.keepUpdates){
      const isSubscribed = await SubscribeNewsLetter(shippingAddress.email)
      if(!isSubscribed){
        return NextResponse.json({ message: 'Newsletter not subscribed!', success: false });    
      }
    }

    // Todo: create user if not loggedIn
    let USER=false;
    const isUser = checkSession(request,'neu-user')
    const isAdmin = checkSession(request,'neu-admin')
    if(isUser){
      USER = isUser.id
    }else if(isAdmin){
      USER = isAdmin.id
    }
    
   if(!USER){
    const newPass = generateRandomPassword()
    USER = await CreateCustomer({firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,country: shippingAddress.country,
      phone: shippingAddress.phone,email: shippingAddress.email,password: newPass})
    if(!USER){
      return NextResponse.json({ message: 'Creating new user failed!', success: false });    
    }
   }
    console.log(USER)
    // create billing address record put user id
    let BILLING_ADDRESS;
    try{
     BILLING_ADDRESS = await Address.create({
       email: billingAddress.email,first_name : billingAddress.firstName,
       last_name : billingAddress.lastName,address : billingAddress.address,
       appartment : billingAddress.appartment,city : billingAddress.city,
       province : billingAddress.province,country : billingAddress.country,
       postal_code : billingAddress.postalCode,phone: billingAddress.phone,
       type:'billing',user: USER
     })
    }catch(error){
      return NextResponse.json({ message: 'Creating billing address failed!', success: false });    
    }

    // create shipping address record put user id
    let SHIPPING_ADDRESS;
    try{
     SHIPPING_ADDRESS = await Address.create({
       email: shippingAddress.email,first_name : shippingAddress.firstName,
       last_name : shippingAddress.lastName,address : shippingAddress.address,
       appartment : shippingAddress.appartment,city : shippingAddress.city,
       province : shippingAddress.province,country : shippingAddress.country,
       postal_code : shippingAddress.postalCode,phone: shippingAddress.phone,
       type:'shipping',user: USER
     })
    }catch(error){
      return NextResponse.json({ message: 'Creating shipping address failed!', success: false });    
    }

    // Todo: create order with above data
    const isOrdered = await Order.create({
      user:USER,
      order_no:ORDER_NO,
      items:items,
      coupons:coupons,
      billing_address:BILLING_ADDRESS._id,
      shipping_address:SHIPPING_ADDRESS._id,
      sub_total:subTotal,
      vat:vat,
      shipping:shipping,
      grand_total:grandTotal,
      order_status:'Pending',
      payment_status:'Pending'
    });

    if(isOrdered){
      return NextResponse.json({order_id: isOrdered._id,success: true });
    }
    return NextResponse.json({ message: 'Processing order failed!', success: false });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error!', success: false });
  }
}