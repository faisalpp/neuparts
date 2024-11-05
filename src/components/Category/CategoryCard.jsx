import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';


const ProductCard = ({ product }) => {
  const [thumbnail,setThumbnail] = useState(product?.thumbnail ? product.thumbnail : '/no-image.webp')
  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 border-gray-100 bg-white`}>
      <div className="relative flex w-full justify-center px-3 pt-10 lg:px-5 xl:px-5">
        <Image onErrorCapture={()=>setThumbnail('/no-image.webp')} src={thumbnail} width={400} height={400} quality={100} className="xl:w-54 h-32 w-full object-contain p-3 md:h-60 lg:w-52" alt="refrigrator" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex scale-0 items-center justify-center bg-b3/50 opacity-0 duration-300 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
          <Link href={`/products?type=${product.slug}`} className="rounded-lg bg-white px-5 py-2 font-semibold text-black duration-300">
            View Products
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 p-3 lg:p-5 xl:p-6">
        <h3 className="line-clamp-2 font-reg text-sm font-semibold xl:text-base">{product.title}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
