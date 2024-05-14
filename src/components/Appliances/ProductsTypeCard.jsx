import React from 'react';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';

const ProductsTypeCard = ({ productstype }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
        {productstype.map((product, index) => (
          <div key={index}>
            <div className="group relative overflow-hidden rounded-3xl border border-gray-300 p-7 2xl:p-[30px] maxmd:mx-auto maxmd:max-w-[350px]">
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex scale-0 items-center justify-center bg-b3/50 opacity-0 duration-300 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
                <Link href={`/appliances/${product.slug}`} className="inline-flex items-center gap-2 rounded-lg bg-b7 px-5 py-2 text-white duration-300 hover:gap-3">
                  View All Appliances
                  <AiOutlineArrowRight className="text-base" />
                </Link>
              </div>
              <div className="inline-flex h-80 w-full items-center justify-center xl:h-96 2xl:h-[393px]">
                <Image width={500} height={500} quality={100} src={product.image} className="h-80 w-full object-contain xl:h-96 2xl:h-[393px]" alt={product.title} />
              </div>
              <div className="mt-6 flex flex-col items-center gap-[10px] text-center">
                <h3 className="text-lg font-bold 3xl:text-[20px]">{product.title}</h3>
                <p className="text-xs font-semibold text-gray-400">299 Appliances</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsTypeCard;
