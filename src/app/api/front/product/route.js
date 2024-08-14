import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Product from '@/models/product';
import APIFilters from '@/utils/APIFilters';

// export async function GET(request) {
//   await connect();
//   const searchParams = request.nextUrl.searchParams;
//   const { category, partType = 'all', conditions = 'all', minPrice = 0, maxPrice = Infinity, onsale = 'false' } = searchParams;
//   console.log(searchParams);

//   const filters = {};

//   // if (category) {
//   // }

//   if (partType !== 'all') filters.type = partType;
//   if (conditions !== 'all') filters.condition = conditions;
//   if (minPrice || maxPrice) {
//     filters.regular_price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
//   }
//   if (onsale === 'true') {
//     filters.sale_price = { $exists: true, $ne: null };
//   }
//   console.log(filters);

//   try {
//     const filteredProducts = await Product.find(filters)
//       .populate({
//         path: 'category',
//         match: { slug: category ? category : { $exists: true } }, // Match the category's slug
//       })
//       .exec();

//     // Filter out products where the category does not match the slug
//     const products = filteredProducts.filter((product) => product.category);
//     return NextResponse.json({ success: true, products });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json({ success: false, message: 'Error retrieving products' });
//   }
// }
export async function GET(req) {
  await connect();
  try {
    const searchParams = req.nextUrl.searchParams;
    const paramsObj = {};

    // Iterate over searchParams and populate paramsObj
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });

    console.log(paramsObj);

    const resPerPage = 9;
    const productCount = await Product.countDocuments();

    const apiFilters = new APIFilters(Product.find(), paramsObj).search().filter();

    let products = await apiFilters.query;

    const filteredProductsCount = products.length;
    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();

    return NextResponse.json({ success: true, productCount, filteredProductsCount, products });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ success: false, message: 'Error retrieving products' });
  }
}
