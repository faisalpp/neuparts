import React from 'react';
import Link from 'next/link';

const ReviewDetail = ({ title, detail, subtitle, textStyle }) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex items-center gap-4 text-sm text-b16">
        <span>{title}</span>
        <div>
          <span className={textStyle}>{detail}</span>
          {subtitle ? <span className="block text-xs">{subtitle}</span> : null}
        </div>
      </div>
      <Link href="/mycart/information/?callback=change-info" className="text-xs font-semibold text-b3 hover:underline">
        Change
      </Link>
    </div>
  );
};

export default ReviewDetail;
