'use client';
import React from 'react';
import { useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import Parser from 'html-react-parser';

const Accordion = ({ activeBg, activeText, parser, title, textStyle, content, parent, child, icon, chevrown, isExpand }) => {
  const [drp, setDrp] = useState(isExpand ? true : false);
  return (
    <>
      <div className={`flex flex-col border border-b14 duration-200 ${parent} ${drp ? activeBg : ''}`}>
        <div
          onClick={() => {
            drp ? setDrp(false) : setDrp(true);
          }}
          className="flex w-full cursor-pointer items-center justify-between gap-1"
        >
          <h6 className={`${drp ? activeText : ''} ${textStyle}`}>{title}</h6>
          <div>{chevrown ? <FiChevronDown className={`${icon} ${drp ? `rotate-180 ${activeText}` : ''} duration-200`} /> : <AiOutlineArrowDown className={`${icon} ${drp ? `rotate-180 ${activeText}` : ''} duration-200`} />}</div>
        </div>
        <div className={` ${drp ? `flex ${activeText}` : 'hidden'} ${child} items-center justify-center mt-1 duration-200`}>
          {content}
        </div>
      </div>
    </>
  );
};

export default Accordion;
