import React from 'react';
import Image from 'next/image';

const BtnLoader = ({ style }) => {
  return (
    <div className="flex w-full justify-center">
      <Image width={400} height={400} quality={100} alt="Loader" src="/loader-bg.gif" className={style} />
    </div>
  );
};

export default BtnLoader;
