import React from 'react';
import Image from 'next/image';

const TextInput = (props) => {
  return (
    <div className={`flex flex-col space-y-1 ${props.width === 'full' ? 'w-full' : 'w-1/2'}`}>
      <div className="flex flex-col space-y-1">
        {props.title ? (
          <h5 className="text-xs font-semibold">
            {props.title} {props.iscompulsory === 'true' ? <i className="text-red-500">*</i> : null}
          </h5>
        ) : null}
        <h5 className="text-xs text-red-500">{props.error ? props.errormessage : null}</h5>
        <div className="relative">
          <input {...props} className={`border-[1px] text-sm outline-none  ${props.error ? 'border-red-500' : 'border-b31'} h-10 w-full rounded-lg px-4 text-xs placeholder:text-b25`} />

          {props.icon ? <Image width={200} height={200} quality={100} src={'/svgs/' + props.icon} className="pointer-events-none absolute right-4 top-3 h-[18px] w-[18px] object-contain" alt="Icon" /> : null}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
