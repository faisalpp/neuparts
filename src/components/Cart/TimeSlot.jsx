import React, { useEffect, useState } from 'react';
import { Radio, Typography } from "@material-tailwind/react";
import RadioSvg from '../../svgs/RadioSvg';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useSelector,useDispatch } from 'react-redux';
import Toast from '../../utils/Toast'
import {ChangeTimeSlot} from '../../store/cartSlice'

const TimeSlot = ({time,setTime,frames}) => {
    const [activeTab, setActiveTab] = useState(1);
    const [activeFrames, setActiveFrames] = useState([]);

    useEffect(()=>{
     const crDate = new Date('2023/05/10');
     const crDay = crDate.getDate();
     const crMonth = crDate.getMonth();
     const filtFrmes = frames.filter((item)=> item.id === `${crMonth+1}`+"-"+`${crDay}`)
      setTime(filtFrmes[0].timeFrame)
      setActiveFrames(filtFrmes)
    },[])

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const dispatch = useDispatch()
    const cartId = useSelector((state)=>state.cart.cart._id)
    const orderInfo = useSelector((state)=>state.cart.cart.orderInfo)
    const [loading,setLoading] = useState(false)

    const UpdateTimeSlot = async (e) => {
    e.preventDefault()
    setLoading(true)
     const data = {cartId:cartId,orderInfo:{...orderInfo,timeSlot:time}}
     const res = await dispatch(ChangeTimeSlot(data));
     if (res.payload.status === 200) {
        Toast(res.payload.msg,'success',1000)
        setLoading(false)
      }else {
        setLoading(false)
        Toast(res.payload.message,'error',1000)
      }
    }

    return (
        <div className='flex flex-col gap-5'>
            {activeFrames.length > 0 ? activeFrames.map((item,indx)=>
            <label htmlFor={`date${indx}`} className={`p-1 border rounded w-full block cursor-pointer ${activeTab === 1 ? 'active border-b3' : 'border-[#D9D9D9]'}`} onClick={() => handleTabClick(1)}>
                <Radio id={`date${indx}`} value={item.timeFrame} onChange={(e)=> setTime(item.timeFrame)} icon={<RadioSvg className="w-[18px] h-[18px]" />} className='border border-[#D9D9D9] bg-white p-0 w-[18px] h-[18px]' ripple={false} name="timeslot" label={
                    <Typography className={`font-bold text-base flex gap-4 ${activeTab === 1 ? 'text-b3' : 'text-b16'}`}>
                        <span>
                            {item.timeFrame}
                        </span>
                    </Typography>
                } defaultChecked={item.timeFrame === orderInfo?.timeSlot?true:false} />
            </label>):null}

            <div className='flex w-full justify-center'>
             {/* <button className='text-xs text-red-500 py-3 px-4 rounded-full'>Remove</button> */}
             <button type="button" onClick={e=>UpdateTimeSlot(e)} className='text-xs flex gap-2 items-center justify-center bg-b7 text-white px-10 py-3 rounded-full'>{loading ? <img src="/loader-bg.gif" className='w-5' /> : <>Done <AiOutlineArrowRight /></>}</button>
            </div>
        </div>
    )
}

export default TimeSlot