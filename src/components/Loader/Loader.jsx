import React from 'react';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="fixed top-0 z-40 flex h-screen w-full items-center justify-center bg-white/80">
      <Image width={400} height={400} quality={100} src="/loading.gif" className="h-12 w-auto" alt="loading" />
    </div>
  );
};

export default Loader;
