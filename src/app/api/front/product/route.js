import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Product from '@/models/product';
import APIFilters from '@/utils/APIFilters';

export async function GET(req) {
  await connect();
  
  try {
    // const searchParams = req.nextUrl.searchParams;
    const searchParams = [];
    const paramsObj = {};

    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });

    const resPerPage = 10;
    const productCount = await Product.countDocuments();

    const apiFilters = new APIFilters(Product.find(), paramsObj).filter();
    let products = await apiFilters.query;

    const filteredProductsCount = products.length;

    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();

    return NextResponse.json({ success: true, productCount, filteredProductsCount, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error retrieving products' });
  }
}
