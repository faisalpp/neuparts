import React from 'react';
import { Tooltip, Typography } from '@material-tailwind/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const ToolTip = ({ color, title, moreUrl, dimension }) => {
  return (
    <Tooltip
      placement="top"
      className="z-[999] bg-white shadow-xl"
      content={
        <div className="w-80 px-2 py-3">
          {title ? (
            <Typography color="black" className="text-xs font-medium text-t2">
              {title}
            </Typography>
          ) : (
            <Typography color="black" className="text-xs font-medium text-t2">
              All 3 star items are tested and confirmed to operate like new. We grade our scratch and dent appliances based on their cosmetic appearance. These scores refer to how the appliance looks not how they function.
            </Typography>
          )}
          {moreUrl ? (
            <Typography color="black" className="text-xs font-semibold text-b3">
              Learn More
            </Typography>
          ) : null}
        </div>
      }
    >
      <QuestionMarkCircleIcon strokeWidth={2} className={`${dimension || 'h-5 w-5'} cursor-pointer hover:text-b3 ${color || 'text-b3'}`} />
    </Tooltip>
  );
};

export default ToolTip;
