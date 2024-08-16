import Image from 'next/image';
import React from 'react';

const CartCard = () => {
  return (
    <div className="mt-3 flex justify-start gap-14px">
      <div className="relative w-full max-w-[64px]">
        <Image width={200} height={200} quality={100} src="/popular-parts.webp" className="h-16 w-16 object-contain" alt="p1" />
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-b3 text-xs font-medium text-white">1</span>
      </div>
      <div className="flex items-center gap-14px">
        <div>
          <h3 className="text-sm font-medium !leading-[150%] tracking-032 line-clamp-1 text-b16">White GE 1.7 cu. ft. Over the Range Microwave with Convenience</h3>
          <p className="text-xs text-b25">5 Stars (Flawless Cosmetic Rating)</p>
        </div>
        <div className="flex justify-between text-sm font-medium text-b3">$100.00</div>
      </div>
    </div>
  );
};

export default CartCard;
