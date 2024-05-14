import React from 'react';
import Image from 'next/image';

const OurVison = ({ order, image, about, title, description, BoxStyle }) => {
  return (
    <>
      <div className="maincontainer grid grid-cols-1 gap-10 py-16 lg:grid-cols-2 xl:gap-24 xl:py-20 2xl:flex 2xl:gap-[140px] 2xl:py-100px 3xl:gap-[168px]">
        <div className={`2xl:h-[500px] 2xl:min-w-[700px] ${order}`}>
          <Image width={800} height={800} quality={100} src={image} alt={title} className="h-auto w-full lg:h-[420px] lg:w-auto 2xl:h-[470px] 3xl:h-[500px] maxlg:object-contain" />
        </div>
        <div className="relative flex items-center">
          <div className={`absolute top-0 -z-10 mt-4 h-[230px] w-[300px] rounded-3xl bg-b3/10 xl:h-[250px] xl:w-[318px] 3xl:h-[279px] maxlg:hidden ${BoxStyle}`}></div>
          <div className="flex flex-col gap-3 3xl:gap-5">
            <span className="text-xs font-bold">{about}</span>
            <h3 className="text-2xl font-bold lg:text-xl xl:text-2xl 3xl:text-3xl">{title}</h3>
            <p className="leading-[30px]">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurVison;
