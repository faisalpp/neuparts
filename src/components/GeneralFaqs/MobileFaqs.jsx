'use client';
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import FaqAccordion from '../FaqAccordion';

const MobileFaqs = ({ title, isOpen, onClick, tabfaqs, activeClass }) => {
  return (
    <div className={`flex flex-col duration-200`}>
      <button onClick={onClick} className={`flex items-center justify-between rounded-2xl border p-5 text-left font-semibold xl:p-6 xl:text-lg ${activeClass ? 'border-b7 bg-b3 text-white' : 'border-b14 bg-white text-b1'}`}>
        <span>{title}</span>
        <FiChevronDown className={`duration-200 ${activeClass ? 'rotate-180' : ''}`} />
      </button>
      <div className={`${isOpen ? 'flex max-h-full flex-col gap-6 pt-6' : 'pointer-events-none max-h-0 select-none opacity-0'} duration-200`}>{tabfaqs.length > 0 ? tabfaqs.map((item, index) => <FaqAccordion key={index} title={item.question} parent="gap-3 bg-[#F8FBFB] text-white p-4 md:px-8 md:py-6 rounded-xl border-none text-b18 h-auto" icon="text-xl text-black" textStyle="font-bold text-lg text-b18" child="[&>p]:text-sm text-b18 font-normal" answer={item.answer} />) : <div className="text-center">No FAQ&apos;s Found!</div>}</div>
    </div>
  );
};

export default MobileFaqs;
