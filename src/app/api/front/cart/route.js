import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Cart from '@/models/cart';

export async function DELETE(request) {
    try {
      await connect();
  
      const { id } = await request.json();
  
      if (id === '') {
        return NextResponse.json({ message: 'Cart ID is required!', success: false });
      }
  
  
      await Cart.findByIdAndDelete(id);
  
      return NextResponse.json({ message: 'Cart Deleted!', success: true });
    } catch (error) {
      return NextResponse.json({ message: 'Something Went Wrong!', success: false });
    }
  }