import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths } from 'date-fns';
import {BsArrowRightSquareFill,BsArrowLeftSquareFill} from 'react-icons/bs'

const Calendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const updateCalendar = (newDate) => {
    const firstDay = startOfMonth(newDate);
    const lastDay = endOfMonth(newDate);
    const newCalendarData = eachDayOfInterval({ start: firstDay, end: lastDay });
    setCalendarData(newCalendarData);
  };

  const [calendarData, setCalendarData] = useState([...eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth })]);

  const handleDateClick = (date) => {
    const updatedSelectedDates = [...selectedDates];
    const dateIndex = updatedSelectedDates.indexOf(date);

    if (dateIndex === -1) {
      updatedSelectedDates.push(date);
    } else {
      updatedSelectedDates.splice(dateIndex, 1);
    }

    setSelectedDates(updatedSelectedDates);
  };

  const saveSelectedDates = () => {
    localStorage.setItem('selectedDates', JSON.stringify(selectedDates));
  };

  const handleMonthChange = (change) => {
    if (change === 'next') {
      setCurrentDate((prevDate) => addMonths(prevDate, 1));
    } else if (change === 'prev') {
      setCurrentDate((prevDate) => subMonths(prevDate, 1));
    }
  };

  useEffect(() => {
    updateCalendar(currentDate);
  }, [currentDate]);

  return (
    <div className="flex flex-col items-center w-full">
      <h4 className="text-sm font-semibold mb-1">Set Calendar Dates</h4>
      <div className="flex items-center mb-2 border-[1px] border-b6 rounded-md space-x-2">
        <button onClick={() => handleMonthChange('prev')}><BsArrowLeftSquareFill className='text-b6 text-xl' /></button>
        <span className='flex text-sm' >{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={() => handleMonthChange('next')}><BsArrowRightSquareFill className='text-b6 text-xl' /></button>
      </div>
      <div className="grid grid-cols-5 gap-x-2 gap-y-2 border-[1px] border-b6 rounded-lg px-2 w-full py-2">
        {calendarData.map((date) => (
          <div
            key={date}
            onClick={() => handleDateClick(date)}
            style={{
              cursor: 'pointer',
              backgroundColor: selectedDates.includes(date) ? 'blue' : 'white',
            }}
            className="flex items-center justify-center rounded-md border-[1px] bg-b5 shadow-lg cursor-pointer"
          >
            {format(date, 'dd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

