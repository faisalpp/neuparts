import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';
import APIFilters from '@/utils/APIFilters';
import ProductCategory from '@/models/productcategory';

export async function GET(req) {
  await connect();

  const searchParams = req.nextUrl.searchParams;
  const paramsObj = {};

  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  const resPerPage = 10;
  const currentPage = Number(paramsObj.page) || 1;

  let filteredProducts = Product.find();

  // If model_no is provided, filter products by category that matches the model_no
  if (paramsObj.model_no) {
    const category = await ProductCategory.findOne({ model_no: paramsObj.model_no });

    if (category) {
      paramsObj.category = category.slug; // Add the category ID to the filters
      filteredProducts = filteredProducts.where('category').equals(category._id);
    }
  }

  // Apply the other filters
  const apiFilters = new APIFilters(filteredProducts, paramsObj).filter();

  // Get all filtered products with pagination
  let products = await apiFilters.query.clone();

  // Manually filter out products with null categories or parttypes
  products = products.filter((product) => product.category !== null && product.parttype !== null && product.manufacturer);

  const productCount = await Product.countDocuments({ is_variant: true });
  const filteredProductsCount = products.length;

  // Apply pagination manually
  const startIndex = (currentPage - 1) * resPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + resPerPage);

  const finalProducts = await Promise.all(
    paginatedProducts.map(async (product) => {
      const partCount = await Product.countDocuments({
        parent_id: product.parent_id,
        is_variant: true,
      });
      
      return {
        ...product._doc,
        partCount: partCount,
      };
    })
  );
  
  return NextResponse.json({ success: true, productCount, filteredProductsCount, products: finalProducts });
}



// export async function GET(req) {
//   await connect();

//   const searchParams = req.nextUrl.searchParams;
//   const paramsObj = {};

//   searchParams.forEach((value, key) => {
//     paramsObj[key] = value;
//   });

//   const resPerPage = 10;
//   const currentPage = Number(paramsObj.page) || 1;

//   let filteredProducts = [];
//   let query = {}
//   if(paramsObj.categoery){
//     query.category = paramsObj.category
//   }

//   // If model_no is provided, filter products by category that matches the model_no
//   if (paramsObj.model_no) {
//     const parents = await Product.find({ is_variant:false,model_no: paramsObj.model_no });

//     if(parents.length > 0) {
//      for (const parent of parents){
//       const childs = await Product.find({is_variant:true,parent_id:parent.id})
//       filteredProducts.push(childs)
//      }
//     }

//   }
//   if(paramsObj.part_number){
//     const products = await Product.find({is_variant:true,part_number:paramsObj.part_number})
//     filteredProducts.push(products)
//   }

//   if(!paramsObj.model_no && ! paramsObj.part_number){
//     filteredProducts = await Product.find({})
//   }

//   const productCount = filteredProducts.length

//   // Apply pagination manually
//   const startIndex = (currentPage - 1) * resPerPage;
//   const paginatedProducts = filteredProducts.slice(startIndex, startIndex + resPerPage);
//   console.log(paginatedProducts)
  
//   return NextResponse.json({ success: true, productCount:productCount, products: paginatedProducts });
// }
