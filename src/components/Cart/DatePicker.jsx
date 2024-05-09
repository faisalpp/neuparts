import React, { useEffect } from 'react';
import { DayPicker, useNavigation } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

const CustomCaption = ({ CaptionProps, displayMonth }) => {
    const { goToMonth, nextMonth, previousMonth } = useNavigation();

    return (
        <div className='flex items-center justify-between'>
            <button
                disabled={!previousMonth}
                onClick={() => previousMonth && goToMonth(previousMonth)}
            >
                <AiFillCaretLeft className='text-b3' />
            </button>
            <span className='text-[#212121] font-semibold'>
                {format(displayMonth, 'MMMM yyy')}
            </span>
            <button
                disabled={!nextMonth}
                onClick={() => nextMonth && goToMonth(nextMonth)}
            >
                <AiFillCaretRight className='text-b3' />
            </button>
        </div>
    )

}

const DatePIcker = ({selectDate,setSelectDate,dates}) => {

    const handleDayClick = (date,modifiers,e) => {
        if (!modifiers.booked) {
            e.preventDefault(); // Prevent default action if the day is booked
            e.stopPropagation(); // Stop event propagation if the day is booked
            return;
        }
        setSelectDate(date);
    };

    

    const fromDate = new Date(dates[0]?.getFullYear(), dates[0]?.getMonth()+1, 1); // Example fromDate
    const toDate = new Date(dates[dates.length -1].getFullYear(), dates[dates.length -1].getMonth(), 31); // Example toDate

    return (
        <DayPicker
            selected={selectDate}
            onDayClick={handleDayClick}
            modifiers={{ booked: dates,}}
            modifiersStyles={{ booked: { color: 'black' } }}
            styles={{
                day:{color:'gray'}
            }}
            fromMonth={fromDate}
            toDate={toDate}
            components={{
                Caption: CustomCaption
            }}
        />
    )
}

export default DatePIcker