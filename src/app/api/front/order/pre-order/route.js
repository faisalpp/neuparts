import Order from '@/models/order';
import Address from '@/models/address'
import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import {checkSession} from '@/lib/auth'
import {GetOrderNo,SubscribeNewsLetter,generateRandomPassword,CreateCustomer} from '@/utils/order'
import {NeuMailer} from '@/mailer/neu-mailer'
import {User} from '@/mailer/templates/user'

export async function POST(request) {

  try {
    await connect();

    const {items,billingAddress,shippingAddress,subTotal,coupons,shipping,vat,grandTotal} = await request.json()

    // Todo: generate unique order no
    const ORDER_NO = await GetOrderNo();
    if(!ORDER_NO){
      return NextResponse.json({ message: 'Order no is not generatable!', success: false });    
    }

    await SubscribeNewsLetter(shippingAddress.email)


    let USER=false;
    const isUser = await  checkSession(request,'neu-user')
    const isAdmin = await checkSession(request,'neu-admin')
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
    const fullName = shippingAddress.firstName + ' ' + shippingAddress.lastName

    const MailTemplate = User(fullName,shippingAddress.email,newPass)
    await NeuMailer(shippingAddress.email,'NeupartsOutlet new account details',MailTemplate)
   }

    // Billing and Shipping addresses objects;
    const BILLING_OBJ = {
      email: billingAddress.email,first_name : billingAddress.firstName,
      last_name : billingAddress.lastName,address : billingAddress.address,
      apartment : billingAddress.apartment,city : billingAddress.city,
      province : billingAddress.province,country : billingAddress.country,
      postal_code : billingAddress.postalCode,phone: billingAddress.phone,
      type:'Billing',user: USER
    }

    const SHIPPING_OBJ = {
      email: shippingAddress.email,first_name : shippingAddress.firstName,
      last_name : shippingAddress.lastName,address : shippingAddress.address,
      apartment : shippingAddress.apartment,city : shippingAddress.city,
      province : shippingAddress.province,country : shippingAddress.country,
      postal_code : shippingAddress.postalCode,phone: shippingAddress.phone,
      type:'Shipping',user: USER
    }
    // create billing address record
    const isBilling = await Address.findOne(BILLING_OBJ)
    if(!isBilling && billingAddress.saveAddress){
      try{
       await Address.create(BILLING_OBJ)
      }catch(error){
        return NextResponse.json({ message: 'Creating billing address failed!', success: false });    
      }
    }

    // create shipping address record put user id
    const isShipping = await Address.findOne(SHIPPING_OBJ)
    if(!isShipping && shippingAddress.saveAddress){
     try{
      await Address.create(SHIPPING_OBJ)
     }catch(error){
      return NextResponse.json({ message: 'Creating shipping address failed!', success: false });    
     }
    }

    // Todo: create order with above data
    const isOrdered = await Order.create({
      user:USER,
      order_no:ORDER_NO,
      items:items,
      coupons:coupons,
      billing_address:BILLING_OBJ,
      shipping_address:SHIPPING_OBJ,
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