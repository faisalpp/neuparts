import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Link from 'next/link';

const BackHome = ({ className }) => {
  return (
    <Link href="/" className={'flex items-center gap-2 text-sm font-semibold text-b3 ' + className}>
      <AiOutlineArrowLeft />
      <span>Back to Home</span>
    </Link>
  );
};

export default BackHome;
