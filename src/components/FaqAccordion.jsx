'use client';
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import Parser from 'html-react-parser';

const FaqAccordion = ({ activeBg, activeText, parser, title,headerStyle, contentStyle, textStyle, answer, parent, child, icon, chevrown, isExpand }) => {
  const [drp, setDrp] = useState(isExpand ? true : false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (drp) {
      setContentHeight(contentRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
  }, [drp]);

  return (
    <div className={`flex flex-col border border-b14 duration-200 ${parent} ${drp ? activeBg : ''}`}>
      <div onClick={() => setDrp(!drp)} className={`flex w-full cursor-pointer items-center justify-between gap-1 ${headerStyle}`}>
        <h6 className={`${drp ? activeText : ''} ${textStyle}`}>{title}</h6>
        <div>
          {chevrown ? (
            <FiChevronDown className={`${icon} ${drp ? `rotate-180 ${activeText}` : ''} duration-200`} />
          ) : (
            <AiOutlineArrowDown className={`${icon} ${drp ? `rotate-180 ${activeText}` : ''} duration-200`} />
          )}
        </div>
      </div>
      <div
        ref={contentRef}
        style={{ height: contentHeight, overflow: 'hidden', transition: 'height 0.3s ease' }}
        className={`${child} mt-1 ${drp ? activeText : ''}`}
      >
        <div className={`pt-2 ${contentStyle}`}>{parser === 'true' ? Parser(answer) : answer}</div>
      </div>
    </div>
  );
};

export default FaqAccordion;
