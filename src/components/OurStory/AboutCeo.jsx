import React from 'react';
import Image from 'next/image';

const AboutCeo = () => {
  return (
    <>
      <div className="bg-b5">
        <div className="maincontainer py-10 lg:py-16 xl:py-20 2xl:py-100px">
          <div className="mx-auto flex w-full max-w-[844px] flex-col items-center gap-5 text-center">
            <div>
              <Image width={400} height={400} quality={100} src="/quotes.webp" alt="quotes" className="h-12 w-16 2xl:h-[67px] 2xl:w-24" />
            </div>
            <p className="md:text-xl xl:text-2xl 3xl:text-3xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero ultrices dis a arcu. Eu rhoncus, non suspendisse nec consequat enim. Proin natoque malesuada donec convallis lectus euismod nec, in.</p>
            <div>
              <strong className="text-sm">John Smith</strong>
              <br />
              <span className="text-sm">CEO</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutCeo;
