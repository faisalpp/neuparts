'use client';
import React, { useState } from 'react';
import MenuCheckbox from '@/components/Reusable/MenuCheckbox';
import Image from 'next/image';
import FourStar from '@/components/svgs/FourStar';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';


const CompareModel = ({ products, condition, defaultProduct, slug }) => {
  const conditions = ['new', 'like-new-open-box', 'certified-refurbished', 'used-part-a-condition-grade', 'used-part-b-condition-grade', 'used-part-c-condition-grade', 'used-part-d-condition-grade'];

  const filteredProducts = conditions.map((cond) => {
    // Filter products by current condition
    const productsByCondition = products.filter((product) => product.condition === cond);

    // If products exist for the condition, find the one with maximum stock
    if (productsByCondition.length > 0) {
      return productsByCondition.reduce((maxStockProduct, product) => (product.stock > maxStockProduct.stock ? product : maxStockProduct));
    } else {
      // If no products exist, return an empty object with the condition and stock 0
      return { ...defaultProduct, condition: cond, stock: 0 };
    }
  });

  const [filters, setFilters] = useState([
    { title: 'Condition', icon: 'star.webp', items: [] },
    { title: 'Price', icon: 'percent.webp', items: [] },
    { title: 'Discount', icon: 'sell-black.webp', items: [] },
  ]);
  return (
    <div id="inspections" className="maincontainer flex flex-col justify-center py-10 lg:py-16 xl:py-20 2xl:py-120px">
      <div className="flex items-center justify-between gap-2 maxlg:flex-col">
        <h2 className="mb-4 text-left text-2xl font-bold lg:text-28px xl:text-32px">Compare buying option for this model</h2>
        <div className="flex items-center justify-end gap-1">
          {filters.map((filter, index) => (
            <MenuCheckbox key={index} data={filter} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <div className="relative overflow-x-auto whitespace-nowrap">
          <table className="w-full text-left text-sm maxlg:w-[992px] rtl:text-right">
            <thead className="text-black">
              <tr className="border-b border-b-black/10">
                <th scope="col" className="py-6">
                  Product
                </th>
                <th scope="col" className="py-6">
                  Condition
                </th>
                <th scope="col" className="py-6">
                  Stock
                </th>
                <th scope="col" className="py-6">
                  Discount
                </th>
                <th scope="col" className="py-6">
                  Price
                </th>
                <th scope="col" className="py-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 &&
                filteredProducts.map((item, index) => (
                  <tr key={index} className={`border-b border-b-black/10 bg-white ` + (item.stock ? '' : 'pointer-events-none select-none grayscale')}>
                    <th scope="row" className="flex items-center gap-2 whitespace-nowrap py-6 pr-2 font-semibold text-b1">
                      <Image width={60} height={60} className="h-10 w-10 object-contain" src="/popular-parts.webp" alt={item.title} />
                      <span className='truncate w-52' >{item.title}</span>
                    </th>
                    <td className="py-6 pr-2">
                      <div className={`inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-white ` + condition(item.condition)?.class}>
                        {item.condtion == 'New' && <FourStar />}
                        {condition(item.condition)?.title}
                      </div>
                    </td>
                    <td className="py-6 pr-2">
                      <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap py-1 text-xs font-semibold">
                        {item.stock > 1 ? 'Multiple' : null}
                        {item.stock === 1 ? 'Qty 1' : null}
                        {item.stock === 0 ? 'Out of Stock' : null}
                      </div>
                    </td>
                    <td className="py-6 pr-2">
                      {item.is_sale && (
                        <div className="grow rounded-lg bg-gray-100">
                          <span className="flex h-2 rounded-lg bg-gradient-to-r from-b4 to-b7" style={{ width: `${(((item.regular_price - item.sale_price) / item.regular_price) * 100).toFixed(1)}%` }}></span>
                        </div>
                      )}
                    </td>
                    <td className="py-6 pr-2 text-xl font-bold text-b3">${item.sale_price ? item.sale_price : item.regular_price}</td>
                    <td className="py-6">
                      <div className="flex items-center justify-evenly gap-1">
                        <button type="button" className="button-hover flex w-full items-center justify-center rounded-lg px-1 py-3 font-bold text-white">
                          <AiOutlineShoppingCart className="text-sm" />
                          <span className="ml-2 flex items-center text-xs font-bold">Add To Cart</span>
                        </button>
                        <button type="button" className="flex w-full items-center justify-center rounded-lg bg-[#071822] px-1 py-3 font-bold text-white hover:bg-[#071822]/90">
                          <Image width={100} height={100} className="h-4 w-4 object-contain" alt="Sell" src="/svgs/sell.webp" />
                          <span className="ml-2 flex items-center text-xs font-bold">Buy Now</span>
                        </button>
                        <Link href={`/product/${item.slug}`} className="flex w-full items-center justify-center rounded-lg border border-b3 px-1 py-3 text-xs font-bold text-b3">
                          View Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {filteredProducts.length > 0 ? 
      <div className="mt-10 flex justify-center md:mt-16">
        <Link href={`/product/${slug}/buying-options`} className="flex w-full items-center justify-center rounded-md border border-b3 px-4 py-3 font-semibold text-b3 md:w-fit">
          <span className="text-xs md:text-sm xl:text-base">View More</span>
          <BsArrowRightShort className="text-2xl" />
        </Link>
      </div>:null}
    </div>
  );
};

export default CompareModel;
