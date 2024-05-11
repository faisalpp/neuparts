import React from 'react';
import Link from 'next/link';
import LeftArrowSvg from '../../svgs/LeftArrowSvg';

const UpdateButton = ({ prevTitle, nextTitle, prevLink, nextLink, loading }) => {
  return (
    <div className="mt-5 flex w-full items-center justify-between">
      <Link href={prevLink} className="flex items-center gap-1">
        <LeftArrowSvg />
        <span className="text-sm font-medium text-b3">Return to {prevTitle}</span>
      </Link>
      <Link href={nextLink} className="flex items-center rounded-lg bg-b3 px-6 py-3 text-xs text-white">
        Continue to {nextTitle} {loading ? <img src="/loader-bg.gif" className="ml-2 h-4 w-4" /> : null}
      </Link>
    </div>
  );
};

export default UpdateButton;
