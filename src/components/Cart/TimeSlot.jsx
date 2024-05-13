'use client';
import React, { useEffect, useState } from 'react';
import { Radio, Typography } from '@material-tailwind/react';
import RadioSvg from '@/components/svgs/RadioSvg';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';

const TimeSlot = ({ time, setTime, frames }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [activeFrames, setActiveFrames] = useState([]);

  useEffect(() => {
    const crDate = new Date('2023/05/10');
    const crDay = crDate.getDate();
    const crMonth = crDate.getMonth();
    const filtFrmes = frames.filter((item) => item.id === `${crMonth + 1}` + '-' + `${crDay}`);
    setTime(filtFrmes[0].timeFrame);
    setActiveFrames(filtFrmes);
  }, []);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const cartId = '';
  const orderInfo = '';
  const [loading, setLoading] = useState(false);

  const UpdateTimeSlot = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-5">
      {activeFrames.length > 0
        ? activeFrames.map((item, index) => (
            <label key={index} htmlFor={`date${index}`} className={`block w-full cursor-pointer rounded border p-1 ${activeTab === 1 ? 'active border-b3' : 'border-[#D9D9D9]'}`} onClick={() => handleTabClick(1)}>
              <Radio
                id={`date${index}`}
                value={item.timeFrame}
                onChange={(e) => setTime(item.timeFrame)}
                icon={<RadioSvg className="h-[18px] w-[18px]" />}
                className="h-[18px] w-[18px] border border-[#D9D9D9] bg-white p-0"
                ripple={false}
                name="timeslot"
                label={
                  <Typography className={`flex gap-4 text-base font-bold ${activeTab === 1 ? 'text-b3' : 'text-b16'}`}>
                    <span>{item.timeFrame}</span>
                  </Typography>
                }
                defaultChecked={item.timeFrame === orderInfo?.timeSlot ? true : false}
              />
            </label>
          ))
        : null}

      <div className="flex w-full justify-center">
        {/* <button className='text-xs text-red-500 py-3 px-4 rounded-full'>Remove</button> */}
        <button type="button" onClick={(e) => UpdateTimeSlot(e)} className="flex items-center justify-center gap-2 rounded-full bg-b7 px-10 py-3 text-xs text-white">
          {loading ? (
            <Image width={200} height={200} quality={100} alt="Loading" src="/loader-bg.gif" className="h-auto w-5" />
          ) : (
            <>
              Done <AiOutlineArrowRight />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TimeSlot;
