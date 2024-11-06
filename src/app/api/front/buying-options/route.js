import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    const product = await Product.findOne({ slug: slug, is_variant: true }).populate('parent');
    if (!product || !product.parent) {
      throw new Error('Product or its parent not found');
    }
  
    // Step 2: Get the model_no of the parent product
    const parent = await Product.find({id:product.parent_id});
  
    // Step 3: Find other parent products with matching model_no values
    const matchedParents = await Product.find({
      is_variant: false, // Ensure we're only fetching parent products
      _id: { $ne: product.parent._id }, // Exclude the original parent
      model_no: { $in: parent.model_no }, // Match any of the parent's model_no values
    });
  
    // Step 4: Get all variants of these matched parent products
    const matchedParentIds = matchedParents.map(parent => parent._id);
    const partproducts = await Product.find({
      is_variant: true,
      parent: { $in: matchedParentIds }, // Match variants whose parent is in matched parents
    }).sort({ createdAt: -1 });

    return NextResponse.json({ product, partproducts, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
