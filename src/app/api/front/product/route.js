import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';
import APIFilters from '@/utils/APIFilters';

export async function GET(req) {
  await connect();

  try {
    const searchParams = req.nextUrl.searchParams;
    // const searchParams = [];
    const paramsObj = {};

    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });

    const resPerPage = 10;
    const productCount = await Product.countDocuments();

    const apiFilters = new APIFilters(Product.find(), paramsObj).filter();
    // Get all filtered products first
    let products = await apiFilters.query.clone();

    // Manually filter out products with null categories
    products = products.filter((product) => product.category !== null && product.parttype !== null);

    const filteredProductsCount = products.length;

    // Apply pagination to the filtered products manually
    const currentPage = Number(paramsObj.page) || 1;
    const startIndex = (currentPage - 1) * resPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + resPerPage);

    return NextResponse.json({ success: true, productCount, filteredProductsCount, products: paginatedProducts });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error retrieving products' });
  }
}
