import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';
import Category from '@/models/productcategory';
import Type from '@/models/producttype';


async function addMinMaxPrices(products) {
  // Group products by parent_id
  let groupedProducts = products.reduce((groups, product) => {
    const parentId = product.parent_id;
    if (!groups[parentId]) groups[parentId] = [];
    groups[parentId].push(product);
    return groups;
  }, {});

  // Loop through each group and determine min and max prices
  for (const parentId in groupedProducts) {
    const group = groupedProducts[parentId];
    
    // Determine the price based on whether the product is on sale or not
    const prices = group.map(p => {
      if (p.is_sale) {
        return p.sale_price;
      } else if (!p.is_sale) {
        return p.regular_price;
      }
      return null; // In case there's no price
    }).filter(price => price != null); // Filter out products without a valid price
    console.log(prices)
    // If there are valid prices, calculate min and max
    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      // Update each product's in-memory minPrice and maxPrice
      group.forEach(product => {
        product.minPrice = minPrice;
        product.maxPrice = maxPrice;
        product.partCount = prices.length
      });
    }
  }

  // Flatten the grouped products back into an array
  const updatedProducts = Object.values(groupedProducts).flat();

  return updatedProducts;
}



export async function GET(req) {
  
  await connect()

  const searchParams = req.nextUrl.searchParams;
  const paramsObj = {};

  searchParams.forEach((value, key) => {
    if(key != 'page'){
      paramsObj[key] = value;
    }
  });

  const limit = 10;
  const page = searchParams.get('page') || 1;
  const skip = (page - 1) * limit;
  
  let query = {is_variant:true}
  
  //get category if present in query
  const category = await Category.findOne(
    { slug: paramsObj.category },
    { _id: 1 } // Projection: Only return the _id field
  );
  if(category){
   query.category = category._id
  }

  //get parttype if present in query
  const partType = await Type.findOne(
    { slug: paramsObj.parttype },
    { _id: 1 } // Projection: Only return the _id field
  );
  if(partType){
    query.parttype = partType._id
  }

  //get parttype if present in query
  if(paramsObj.condition){
    query.condition = paramsObj.condition
  }

  //create price filter
  const priceFilters = {};
  if (paramsObj["regular_price[gte]"]) {
      priceFilters.$gte = parseFloat(paramsObj["regular_price[gte]"]);
  }
  if (paramsObj["regular_price[lte]"]) {
      priceFilters.$lte = parseFloat(paramsObj["regular_price[lte]"]);
  }

  // Add price range filter if specified
 if (Object.keys(priceFilters).length > 0) {
   if(paramsObj.is_sale){
     query.sale_price = priceFilters;
   }else{
     query.regular_price = priceFilters;
   }
 }

 if(paramsObj.part_number){
  query.part_number = paramsObj.part_number
 }

 query.is_sale = false;
 if(paramsObj.is_sale){
  query.is_sale = true;
 }

 let products = [];
 let productCount = 0;
 if(paramsObj.model_no){
  productCount = await Product.countDocuments({is_variant:false,model_no:paramsObj.model_no})
  const parents = await Product.find({is_variant:false,model_no:paramsObj.model_no}).limit(limit).skip(skip)
  if (parents.length > 0) {
    // Fetch all variants in parallel using `Promise.all`
    const variantQueries = parents.map((parent) =>
        Product.find({ parent_id: parent.id, ...query }).lean()
    );
    const variants = await Promise.all(variantQueries);
    // Flatten the results into the `products` array
    let p2 = variants.flat();
    products = await addMinMaxPrices(p2)
  }
 }else{
  productCount = await Product.countDocuments(query);
  let p1 = await Product.find(query).limit(limit).skip(skip).lean()
  products = await addMinMaxPrices(p1)
 }


 return NextResponse.json({ products, productCount ,success: true }, { status: 200 });

}
