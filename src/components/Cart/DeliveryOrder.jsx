import React, { useState, useRef, useEffect } from 'react';
import CartCard from './CartCard';
import SelectTimeSlot from './SelectTimeSlot';
import { useDispatch,useSelector } from 'react-redux';
import { GetZipWithSlots } from '../../api/frontEnd'
import { Radio, Typography } from "@material-tailwind/react";
import RadioSvg from '../../svgs/RadioSvg';
import ShipmentSvg from '../../svgs/ShipmentSvg';
import PickUpSvg from '../../svgs/PickUpSvg';
import {ChangeCartItemType, resetCart} from '../../store/cartSlice'
import { resetOrder } from '../../store/orderSlice';
import Toast from '../../utils/Toast'
import Popup from '../../components/AdminDashboard/Popup'

const DeliveryOrder = ({orders,refresh,loading}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const orderInfo = useSelector((state)=>state.cart?.cart.orderInfo)
    const cartId = useSelector((state)=>state.cart?.cart._id)

    const [selectedDate, setSelectedDate] = useState(new Date("2023/05/10"));
    const [frames,setFrames] = useState([])
    const [timeSlot, setTimeSlot] = useState('')
    const [dates, setDates] = useState(null);

    const [zipChange,setZipChange] = useState(false)

    const GetZipSlots = async () => {
        setZipChange(true)
        const res = await GetZipWithSlots({zip:orderInfo.location})
        if (res.status == 200) {
          setZipChange(false)
          let onlyDays = [];
          let timeFrames = [];
          res.data.zip.slots.forEach((item)=>{
            let date = new Date(item.date)
            onlyDays.push(date);
            const monthNames = [
              'January', 'February', 'March', 'April', 'May', 'June', 
              'July', 'August', 'September', 'October', 'November', 'December'
            ];
    
            const currentMonth = date.getMonth();
            const currentDay = date.getDate();
            const currentMonthName = monthNames[currentMonth];
            let frame = `${currentMonthName}`+" "+ `${currentDay+1}`+" "+'-'+" "+`${item.timeframe}`;
            let getTimeFrame = timeFrames.filter((item)=> item.id.day === currentDay && item.id.month+1 === currentMonthName)
            if(getTimeFrame.length > 0){
              timeFrames.push({id:`${getFirstFrame[0].id}`,timeFrame:frame})
            }else{
              timeFrames.push({id:`${currentMonth+1}`+"-"+`${currentDay+1}`,timeFrame:frame})
            }
          })
          setDates(onlyDays)
          setFrames(timeFrames)
        }
      };
    
      useEffect(() => {
        if(orderInfo){
            GetZipSlots();
        }
      }, [])


      const [pickPopup,setPickPopup] = useState(false)
      const [location,setLocation] = useState(orderInfo.type == 'pickup' ? orderInfo.location : 'Austin, Tx')
          const HandlePickupLocation = (e) => {
         if(e.target.name === 'georgetown'){
            setLocation('Georgetown, Tx')
         }else{
            setLocation('Austin, Tx')
         }
        }

      const handlePickupChange = async () => {
       // e.prevenDefault()
       const data = {cartId:cartId,orderInfo:{type:'pickup',location:location,shipping:'Free'}};
       const res = await dispatch(ChangeCartItemType(data))
       if(res.payload.status === 200){
        refresh()
        Toast(res.payload.msg,'success',1000)
       }else if(res.payload.status === 404) {
         dispatch(resetCart())
         dispatch(resetOrder())
        Toast(res.payload.message,'error',1000)
       }else{
        Toast(res.payload.message,'error',1000)
       }
      }

    return (
       <>
                {/* Pickup Location Popup */}
                <Popup width="w-4/12" state={pickPopup} setState={setPickPopup} style="left-0" >
          <div className='flex flex-col items-center space-y-5 w-full' >
          <h3 className='font-semibold' >Change Pickup Location</h3>
          <div className="flex space-x-5 w-full justify-center">
            <Radio name="austin" id={`delivery2`} icon={<RadioSvg className="w-[18px] h-[18px]" />} className='border border-[#D9D9D9] bg-white p-0 w-[18px] h-[18px]' ripple={false} label={
                <Typography className="font-medium text-sm text-b16 flex gap-4"><ShipmentSvg /><span>Austin, Tx</span></Typography>
            } checked={location === 'Austin, Tx'?true:false} onChange={(e)=>HandlePickupLocation(e)} />
            <Radio name="georgetown" id={`pickup-2`} icon={<RadioSvg className="w-[18px] h-[18px]" />} className='border border-[#D9D9D9] bg-white w-[18px] h-[18px] p-0' ripple={false} label={
             <Typography className="font-medium text-sm text-b16 flex gap-4"><PickUpSvg /><span>Georgetown, Tx</span></Typography>
            } checked={location === 'Georgetown, Tx'?true:false} onChange={(e)=>HandlePickupLocation(e)} />
         </div>
          <button type='button' onClick={handlePickupChange} className='bg-b6 text-white px-2 text-sm py-1 rounded-lg' >Change</button>
         </div>
         </Popup>
        <div className='border border-b26 rounded p-4 sm:p-5 md:p-10 grid grid-cols-1 gap-8'>
         <h2 className='text-b16 font-bold text-xl maxmd:text-center'>Delivery Orders</h2>
          {orders.map((item,indx)=><CartCard chk={loading} key={indx} indx={indx} order={item} type="delivery" changeType={refresh} />)}
          <div className='w-full border border-[#D9D9D9] p-4 rounded-lg flex justify-between items-center' >
          <div className='flex items-center space-x-5' >
            <div ref={dropdownRef} className='relative '>
                {zipChange?null:<button onClick={toggleDropdown} className='flex w-full '>
                    <div className='flex gap-2 items-center'>
                        <span className='w-[18px] h-[18px]'>
                            <img src="/svgs/calendar_month.webp" alt="calendar_month" />
                        </span>
                        <span className='text-xs font-medium text-b3'>
                            Select Time-slot
                        </span>
                    </div>
                </button>}
                {isOpen && (<SelectTimeSlot frames={frames} timeSlot={timeSlot} setTimeSlot={setTimeSlot} selectDate={selectedDate} setSelectDate={setSelectedDate} dates={dates} />)}            
            </div>
            <div className="flex border-l-[1px]">
              <Radio id={`delivery2`} icon={<RadioSvg className="w-[18px] h-[18px]" />} className='border border-[#D9D9D9] bg-white p-0 w-[18px] h-[18px]' ripple={false} name={`delivery-2`} label={
                  <Typography className="font-medium text-sm text-b16 flex gap-4"><ShipmentSvg /><span>Delivery</span></Typography>
              } defaultChecked={orderInfo.type === 'delivery' ? true : false} />
              <Radio id={`pickup-2`} icon={<RadioSvg className="w-[18px] h-[18px]" />} className='border border-[#D9D9D9] bg-white w-[18px] h-[18px] p-0' ripple={false} name={`delivery-2`} label={
               <Typography className="font-medium text-sm text-b16 flex gap-4"><PickUpSvg /><span>Pickup</span></Typography>
              } defaultChecked={orderInfo.type === 'pickup' ? true : false} onChange={(e)=>setPickPopup(true)} />
             </div>
          </div>  

            <div className='font-semibold text-sm text-b3'>
                ${orderInfo?.shipping}
            </div>
          
          </div>  
        </div>
        </>
    )
}

export default DeliveryOrder