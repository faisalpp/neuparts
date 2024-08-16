import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Product from '@/models/product';
import APIFilters from '@/utils/APIFilters';

export async function GET(req) {
  await connect();
  ('yes');
  try {
    const searchParams = req.nextUrl.searchParams;
    const paramsObj = {};

    // Iterate over searchParams and populate paramsObj
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });
    const resPerPage = 2;

    const productCount = await Product.countDocuments();
    const apiFilters = new APIFilters(Product.find(), paramsObj).filter();

    let filteredProducts = await apiFilters.query;

    console.log(filteredProducts);

    let products = filteredProducts.filter((product) => product.category !== null);

    const filteredProductsCount = products.length;

    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();
    products = products.filter((product) => product.category !== null);

    return NextResponse.json({ success: true, productCount, filteredProductsCount, products });
  } catch (error) {
    return NextResponse.json({ success: error, message: 'Error retrieving products' });
  }
}
