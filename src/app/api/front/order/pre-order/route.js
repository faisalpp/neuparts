import Order from '@/models/order';
import Address from '@/model/address'
import NewsLetter from '@/model/newsLetter'
import { NextResponse } from 'next/server';
import connect from '@/lib/db';

export async function POST(request) {

  try {
    await connect();

    const {items,billingAddress,shippingAddress,subTotal,coupons,vat,grandTotal} = await request.json()

    // Todo: generate unique order no

    // Todo: newsletter subscribe

    // Todo: create user if not loggedIn


    // create billing address record put user id if saveAddress true
    const billing = await Address.create({
      email: billingAddress.email,first_name : billingAddress.first_name,
      last_name : billingAddress.last_name,address : billingAddress.address,
      appartment : billingAddress.appartment,city : billingAddress.city,
      province : billingAddress.province,country : billingAddress.country,
      postal_code : billingAddress.postal_code,phone: billingAddress.phone,
      type:'billing',is_next: billingAddress.saveAddress ? true : false
    })

    // create shipping address record put user id if saveAddress true
    const shipping = await Address.create({
      email: shippingAddress.email,first_name : shippingAddress.first_name,
      last_name : shippingAddress.last_name,address : shippingAddress.address,
      appartment : shippingAddress.appartment,city : shippingAddress.city,
      province : shippingAddress.province,country : shippingAddress.country,
      postal_code : shippingAddress.postal_code,phone: shippingAddress.phone,
      type:'shipping',is_next: shippingAddress.saveAddress ? true : false
    })


    // Todo: create order with above data
    const isCreated = await Order.create({});

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error!', success: false });
  }
}