'use client';
import React, { useState } from 'react';
import ProductInformation from '@/components/BuyingOptions/ProductInformation';
import BuyingOptions from '@/components/BuyingOptions/BuyingOptions';
import Image from 'next/image';

const BuyingOptionsV1 = () => {
  const [product, setProduct] = useState({
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
    isSale: true,
    salePrice: 279.0,
    regPrice: 230.0,
    rating: 5,
    modelNo: '213213',
    bulletDescription: ['2123213', '123213', '2132131'],
  });
  const [threeStarProduct, setThreeStarProduct] = useState({
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
    isSale: true,
    salePrice: 279.0,
    regPrice: 230.0,
    rating: 5,
    modelNo: '213213',
    bulletDescription: ['2123213', '123213', '2132131'],
  });
  const [fourStarProduct, setFourStarProduct] = useState({
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
    isSale: true,
    salePrice: 279.0,
    regPrice: 230.0,
    rating: 5,
    modelNo: '213213',
    bulletDescription: ['2123213', '123213', '2132131'],
  });
  const [fiveStarProduct, setFiveStarProduct] = useState({
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
    isSale: true,
    salePrice: 279.0,
    regPrice: 230.0,
    rating: 5,
    modelNo: '213213',
    bulletDescription: ['2123213', '123213', '2132131'],
  });
  const [threeStarCount, setThreeStarCount] = useState(0);
  const [fourStarCount, setFourStarCount] = useState(0);
  const [fiveStarCount, setFiveStarCount] = useState(0);

  const [frstImg, setFrstImg] = useState('/p1.webp');
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <div style={{ height: 'calc(100vh - 100px)' }} className="flex w-full items-center justify-center">
          <Image width={400} height={400} alt="loader2" src="/loader2.gif" className="h-18 w-auto" />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-1680px px-4 py-12 sm:px-10 lg:px-16 lg:py-16 xl:px-20 xl:py-20 2xl:px-120px">
          <ProductInformation image={frstImg} title={product.title} modelNo={product.modelNo} bullets={product.bulletDescription} threeStarProduct={threeStarProduct} fourStarProduct={fourStarProduct} fiveStarProduct={fiveStarProduct} threeStarCount={threeStarCount} fourStarCount={fourStarCount} fiveStarCount={fiveStarCount} />
          <BuyingOptions rating={product?.rating} modelNo={product?.modelNo} threeStarCount={threeStarCount} fourStarCount={fourStarCount} fiveStarCount={fiveStarCount} />
        </div>
      )}
    </>
  );
};
export default BuyingOptionsV1;
