import React from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';

const ShopAustinSection = () => {
  return (
    <div className="bg-b3">
      <div className="shopaustin maincontainer">
        <div className="order-2 lg:order-none">
          <h2>Shop Austin&apos;s Best Scratch and Dent Appliances</h2>
          <p>Offering Austin, Tx the BEST in Discounted Open Box Appliances and Scratch and Dent Appliances. Our Inventory is LIVE and changes QUICKLY, so if you see something you like Snag it ASAP before its gone!</p>
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white p-4 text-sm font-semibold text-b3 maxmd:w-full">
            <HiOutlineShoppingCart className="h-5 w-5" /> <span>Shop Now</span>
          </Link>
        </div>
        <div>
          <Image width={400} height={400} quality={100} src="/shopaustin.webp" className="h-auto w-full rounded-3xl 3xl:h-[560px]" alt="shopaustin" />
        </div>
      </div>
    </div>
  );
};

export default ShopAustinSection;
