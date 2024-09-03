import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Cart from '@/models/cart';

export async function POST(request) {
  try {
    await connect();

    const { cartId } = await request.json();
    
    const cart = await Cart.findOne({ _id: cartId });
    if(cart){
      return NextResponse.json({ cart: cart, success: true }, { status: 200 });
    }  
    return NextResponse.json({ message: 'Cart not found!', success: false });
  } catch (error) {
    return NextResponse.json({ message: 'Cart search failed!', success: false });
  }
}
