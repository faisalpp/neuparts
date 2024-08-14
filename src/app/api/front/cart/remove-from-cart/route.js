import { NextResponse } from "next/server";
import {connect} from '@/DB/index';
import Cart from '@/models/cart'

export async function POST(request){
    await connect();
    
        try {
            const { catId,productId, cartId } = await request.json();
            
            // Get cart by id
            let CART;
            if (cartId) {
                try {
                    CART = await Cart.findOne({ _id: cartId });
                    if (!CART) {
                        return NextResponse.json({ message: "Cart not found!", success: false }, { status: 404 });
                    }
                } catch (error) {
                    return NextResponse.json({ message: "Fetching cart failed!", success: false, error: error }, { status: 500 });
                }
            } else {
                return NextResponse.json({ message: "Cart ID is required!", success: false }, { status: 400 });
            }
    
            // Check if category exists in the cart
            let categoryIndex = CART.categories.findIndex(cat => cat.cat_id.toString() === catId.toString());
            if (categoryIndex === -1) {
                return NextResponse.json({ message: "Category not found in cart!", success: false }, { status: 404 });
            }
           
            // Find the item in the category
            let itemIndex = CART.categories[categoryIndex].items.findIndex(item => item._id.toString() === productId.toString());
            if (itemIndex === -1) {
                return NextResponse.json({ message: "Product not found in cart!", success: false }, { status: 404 });
            }
    
            // Decrement the quantity or remove the item
            if (CART.categories[categoryIndex].items[itemIndex].quantity > 1) {
                CART.categories[categoryIndex].items[itemIndex].quantity -= 1;
            } else {
                CART.categories[categoryIndex].items.splice(itemIndex, 1);
                // Remove the category if no items left
                if (CART.categories[categoryIndex].items.length === 0) {
                    CART.categories.splice(categoryIndex, 1);
                }
            }
    
            // Save the updated cart
            try {
                const updatedCart = await CART.save();
                return NextResponse.json({ cart: updatedCart, success: true }, { status: 200 });
            } catch (error) {
                return NextResponse.json({ message: "Cart update failed!", success: false, error: error }, { status: 500 });
            }
        } catch (error) {
            return NextResponse.json({ error: error.message, success: false }, { status: 500 });
        }
}