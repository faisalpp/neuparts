import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import Product from '@/models/product'
import Cart from '@/models/cart'

export async function POST(request){
    await connect();

    try {
     const {productId,cartId} = await request.json()
     
     //get product
     let PRODUCT;
     try{
      PRODUCT = await Product.findOne({_id:productId});
      if(!PRODUCT){
        return  NextResponse.json({message: "Invalid product id!",success: false})   
      } 
     }catch(error){
        return  NextResponse.json({message: "Something Went Wrong!",success: false})  
     }
     
     //get cart by id
     let CART;
     if(cartId != ''){
      try{
        CART = await Cart.findOne({_id:cartId})
      }catch(error){
       return  NextResponse.json({message: "Something Went Wrong!",success: false})
      }
     }

     //if not exist create new cart
     if(!CART){
       try{
        CART = await Cart.create({userId:null})
       }catch(error){
        return  NextResponse.json({message: "Something Went Wrong!",success: false})   
       }
     }

     
     //create cart item
     // Create the cart item
    const cartItem = {
        productId,
        quantity,
        category: {
          id: category._id,
          title: category.title,
          image: category.image
        }
      };



    } catch (error) {
        return NextResponse.json({error: error.message,success:false}, {status: 500})
    }
}
