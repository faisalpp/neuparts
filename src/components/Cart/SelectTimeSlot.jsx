'use client';
import React, { useState } from 'react';
import DatePIcker from './DatePicker';
import TimeSlot from './TimeSlot';
import Image from 'next/image';

const SelectTimeSlot = ({ selectDate, setSelectDate, timeSlot, setTimeSlot, dates, frames }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="absolute top-10 z-50 w-[394px] rounded-md bg-white p-5 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)]">
      <div className="mb-5 flex justify-between">
        <button className={`flex items-center gap-2 rounded-md px-5 py-3 ${activeTab === 1 ? 'active border-[3px] border-b3' : 'border border-[#E2E3E5] text-[#6C727F] '}`} onClick={() => handleTabClick(1)}>
          <Image width={400} height={400} quality={100} className="h-auto w-full" src="/svgs/calendar_month_black.webp" alt="" />
          Delivery Date
        </button>
        <button className={`flex items-center gap-2 rounded-md px-5 py-3 ${activeTab === 2 ? 'active border-[3px] border-b3' : 'border border-[#E2E3E5] text-[#6C727F] '}`} onClick={() => handleTabClick(2)}>
          <Image width={400} height={400} quality={100} className="h-auto w-full" src="/svgs/nest_clock_farsight_analog.webp" alt="" />
          Time-slot
        </button>
      </div>
      {activeTab === 1 && <DatePIcker dates={dates} selectDate={selectDate} setSelectDate={setSelectDate} />}
      {activeTab === 2 && <TimeSlot time={timeSlot} setTime={setTimeSlot} frames={frames} />}
    </div>
  );
};

export default SelectTimeSlot;
