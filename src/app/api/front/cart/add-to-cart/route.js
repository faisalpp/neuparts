import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import Product from '@/models/product'
import Cart from '@/models/cart'

export async function POST(request){
    await connect();

    try {
     const {productId,cartId,quantity,cartRender} = await request.json()
     
     //get product
     let PRODUCT;
     let CATEGORY;
     let isSale=false;
     try{
      PRODUCT = await Product.findOne({_id:productId}).populate('category');
      if(!PRODUCT){
        return  NextResponse.json({message: "Invalid product id!",success: false},{status:404})   
      }
      CATEGORY = PRODUCT.category;
      isSale = PRODUCT.sale_price != 0 ? true : false; 
     }catch(error){
        return  NextResponse.json({message: "Product fetching failed!",success: false,error:error},{status:500})  
     }
     
     //get cart by id
     let CART;
     if(cartId){
      try{
        CART = await Cart.findOne({_id:cartId})
      }catch(error){
       return  NextResponse.json({message: "Saving cart failed!",success: false})
      }
     }

     //if not exist create new cart
     if(!CART){
       try{
        CART = await Cart.create({userId:null})
       }catch(error){
        return  NextResponse.json({message: "Cart fetching failed!",success: false})   
       }
     }

     // Check if category exists in the cart
     let categoryIndex = CART.categories.findIndex(cat => cat.cat_id.toString() === CATEGORY._id.toString());

     if(categoryIndex === -1){
          // Add new category
          CART.categories.push({
            cat_id: CATEGORY._id,
            cat_title: CATEGORY.title,
            cat_image: CATEGORY.thumbnail,
            items: [{
              id: PRODUCT._id,
              thumbnail: PRODUCT.images[0].url,
              title: PRODUCT.title,
              regular_price: PRODUCT.regular_price,
              sale_price: PRODUCT.sale_price,
              is_sale:isSale,
              condition: PRODUCT.condition,
              quantity: quantity
            }]
          });
     }else{
      // Add product to existing category
      const itemIndex = CART.categories[categoryIndex].items.findIndex(item => item.id.toString() === PRODUCT._id.toString());
      if (itemIndex > -1) {
        CART.categories[categoryIndex].items[itemIndex].quantity += quantity;
      } else {
        CART.categories[categoryIndex].items.push({
          id: PRODUCT._id,
          thumbnail: PRODUCT.images[0].url,
          title: PRODUCT.title,
          regular_price: PRODUCT.regular_price,
          sale_price: PRODUCT.sale_price,
          is_sale:isSale,
          condition: PRODUCT.condition,
          quantity: quantity
        });
      }
     }

     try{
      const updatedProd = await Product.findOneAndUpdate({ _id: productId },{ $inc: { stock: -quantity } },{ new: true });
      const updatedCart = await CART.save()
      return  NextResponse.json({cart: updatedCart,cartRender:cartRender,stock:updatedProd.stock,success: true},{status:200})   
     }catch(error){
      return  NextResponse.json({message: "Cart update failed!",success: false})   
     }
    } catch (error) {
        return NextResponse.json({error: error.message,success:false}, {status: 500})
    }
}
