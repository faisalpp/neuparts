import React from 'react';
import Image from 'next/image';

const RepairWork = () => {
  return (
    <div className="bg-b3/10">
      <div className="maincontainer py-10 lg:py-16 xl:py-20 2xl:py-[144px]">
        <div className="flex gap-10 rounded-3xl bg-b3 px-6 py-8 md:p-16 2xl:gap-16 maxlg:flex-col">
          <div className="mx-auto lg:h-[320px] lg:min-w-[320px] xl:h-[352px] xl:min-w-[352px] maxmd:w-[241px]">
            <Image width={600} height={600} quality={100} className="mx-auto lg:h-[320px] lg:min-w-[320px] xl:h-[352px] xl:min-w-[352px] maxmd:w-[241px]" src="/appliance/appliancework.webp" alt="Repair Work" />
          </div>
          <div>
            <div className="h-full flex-col justify-center rounded-3xl bg-white/20 px-4 py-6 sm:p-11 md:p-7 lg:flex 2xl:px-16 2xl:py-60px">
              <h3 className="mb-6 text-2xl font-bold text-white xl:text-3xl 2xl:text-[32px] maxmd:text-center">How Appliance Repair Works</h3>
              <p className="text-base text-white xs:text-xl xs:leading-8 maxmd:text-center">We can&apos;t speak for others but typically an appliance repair technician will come on site and diagnose your appliance for a flat rate. Usually this appliance diagnostic fee is waived if you choose to complete the repair on your appliance. If you choose not to complete the repair you usually only owe the diagnostic fee.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairWork;
