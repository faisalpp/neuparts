import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineArrowRight, AiOutlineClose, AiOutlineShop,AiOutlineShoppingCart } from 'react-icons/ai'
import { HiOutlineTruck } from 'react-icons/hi'
import { FaDotCircle } from 'react-icons/fa'
import { BiLoaderAlt,BiError } from 'react-icons/bi'
import SideCartCard from './Cart/SideCartCard'
import { useSelector } from 'react-redux';
import { GoDotFill } from 'react-icons/go'
import { TiTick } from 'react-icons/ti'
import { BiSearchAlt2 } from 'react-icons/bi'
import SelectTimeSlot from './Cart/SelectTimeSlot'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { BsCart3 } from 'react-icons/bs'
import {showSCart, hideSCart,ChangePickupLocation, GetCart,RemoveFromCart,resetCart,ChangeDeliveryInfo,} from '../store/cartSlice'
import {resetOrder} from '../store/orderSlice'
import Toast from '../utils/Toast'
import { GetZipWithSlots } from '../api/frontEnd'

const SideCart = () => {
  const sCart = useSelector((state) => state.cart.sCart);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Cart Time Slot Functions
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(false)

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

  // Select Time Slot Data 
  const [selectedDate, setSelectedDate] = useState(new Date("2023/05/10"));
  const [dates, setDates] = useState([]);
  const [timeSlot, setTimeSlot] = useState('')

  const cartId = useSelector((state)=>state?.cart?.cart?._id) || '';
  const subTotal = useSelector((state)=>state?.cart?.cart?.subTotal)
  const cartCount = useSelector((state)=>state?.cart?.cart?.cartCount) || 0;
  const products = useSelector((state)=>state?.cart?.cart?.products) || [];
  const orderInfo = useSelector((state)=>state?.cart?.cart?.orderInfo);

  // Zip Code Location
  const [zip, setZip] = useState('')

  const GetCartData = async () => {
    if(!cartId){
      return
    }
    setLoading(true)
    const res = await dispatch(GetCart({cartId:cartId}));
    if(res.payload.status === 200){
      if(orderInfo.type === 'delivery'){
        setZip(orderInfo.location)
      }
      setLoading(false)
    }else if (res.payload.status === 404) {
      Toast(res.payload.message,'info',1000)
      dispatch(resetCart())
      dispatch(resetOrder())
      setLoading(false)
    }else{
      Toast(res.payload.messsage,'error',1000)
      setLoading(false)
    }
  }


  useEffect(() => {
    if(sCart){
      GetCartData()
    }
  }, [sCart])

  const [delLoading,setDelLoading] = useState('')

  const RemoveCartItemData = async (e, indx,pId,price) => {
    e.preventDefault()
    setDelLoading(indx)
      const data = { cartId:cartId ,productId:pId,price:price}
      const res = await dispatch(RemoveFromCart(data));
      if (res.payload.status === 200) {
        setDelLoading('')
        Toast(res.payload.msg,'success',1000)
      }else {
        setDelLoading('')
        Toast(res.payload.message,'error',1000)
      }
  }

  const [zipChange,setZipChange] = useState(false)
  const [zipError,setError] = useState(false)
  const [zipSuccess,setZipSuccess] = useState(true)

  const [frames,setFrames] = useState([])

  const Submit = async () => {
    setZipChange(true)
    const res = await GetZipWithSlots({zip:zip})
    if (res.status == 200) {
      setZipChange(false)
      setError(false);
      setZipSuccess(true);
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
        if(getTimeFrame?.length > 0){
          timeFrames.push({id:`${getFirstFrame[0].id}`,timeFrame:frame})
        }else{
          timeFrames.push({id:`${currentMonth+1}`+"-"+`${currentDay+1}`,timeFrame:frame})
        }
      })
      setDates(onlyDays)
      setFrames(timeFrames)
      
      dispatch(ChangeDeliveryInfo({cartId:cartId,orderInfo:{...orderInfo,location:zip,shipping:res.data.zip.location.rate}}))
    } else {
      setZipChange(false);
      setZipSuccess(false);
      setError(true);
    }
  };

  useEffect(() => {
    if (sCart &&zip && zip?.length === 5) {
     Submit();
   }
  }, [zip])

  const [locLoading,setLocLoading] = useState(false)

  const UpdatePickupLocation = async (e,loc) => {
    e.preventDefault()
    setLocLoading(true)
    const res = await dispatch(ChangePickupLocation({cartId:cartId,orderInfo:{ type:'pickup',location:loc,shipping:'Free'}}));
    if (res.payload.status === 200) {
      setLocLoading(false)
    }else {
      setLocLoading(false)
      Toast(res.payload.message,'error',1000)
    }    
  }


  return (
    <div className={` ${sCart ? 'top-0 lg:right-0' : 'maxlg:-top-[200vh] lg:-right-[200%]'} maxlg:pt-28 duration-500 fixed  z-[999] bg-black/60 w-full h-screen`} >

      <div ref={dropdownRef} className={` ${sCart ? '' : 'hidden'} relative mx-auto lg:float-right bg-white w-[90%] maxlg:rounded-t-2xl sm:w-[80%] lg:max-w-[420px] lg:w-full h-full`} >
        
      {isOpen && (
        <SelectTimeSlot frames={frames} timeSlot={timeSlot} setTimeSlot={setTimeSlot} selectDate={selectedDate} setSelectDate={setSelectedDate} dates={dates} />
        )}
        
        
        <button onClick={() => { sCart ? dispatch(hideSCart()) : dispatch(showSCart()) }} className='maxlg:w-10 maxlg:h-10 bg-white maxlg:hover:bg-b3 maxlg:hover:text-white duration-200 maxlg:rounded-full absolute -top-14 right-0 lg:top-5 lg:right-6 z-40  xy-center'><AiOutlineClose className='text-xl' /></button>
        <div className='flex flex-col overflow-y-auto w-full h-full'>
          <div className='flex items-center sticky top-0 bg-white maxlg:rounded-t-2xl py-5 px-6 justify-between' ><div className='flex items-center gap-x-3' ><h4>My Cart</h4><span className='bg-b3 text-white rounded-full text-xs w-5 h-5 xy-center' >{cartCount}</span></div></div>
          {loading ? <div className='xy-center h-full w-full' ><img src="/loader-bg.gif" className='w-10 h-10 ml-2' /></div> : products?.length === 0 ?
            <div className='flex flex-col px-2 space-y-5 w-full justify-center items-center h-full' >
              <img src="/bag.webp" />
              <h1 className='font-extrabold' >Your Cart is Empty</h1>
              <h2 className='text-center' >Lorem Ipsum Doller Sit Amet, Consecture Audipicsing Elit</h2>
              <button type='button' className='xy-center rounded-lg bg-b3 py-3 text-white font-medium w-1/2 text-sm'><BsCart3 className='mr-2' /> Start Shopping</button>
            </div>
            :
            <>
              <div style={{ 'height': 'calc(100vh - 200px)' }} className='flex flex-col overflow-y-auto' >
                {orderInfo?.type === 'delivery' && products?.length > 0 ? <div className='flex flex-col rounded-lg px-6 py-5 mx-5 mb-5 border border-gray-200 ' >
                  <h4 className='font-semibold' >Delivery Orders</h4>
                  {/* Cart Product */}
                  <div className='flex flex-col gap-6 space-y-2 mb-3 w-full'>
                    {products?.map((item, pindex) => ( 
                      Array.from({ length: item.count }).map((_, index) => (
                        <SideCartCard indx={`${pindex}-${index}-delivery`} key={`${pindex}-${index}-delivery`} cartId={cartId} item={item} RemoveFromCart={RemoveCartItemData} delState={delLoading} setDelState={setDelLoading} type="delivery" />
                      )) 
                    ))}
                  </div>
                  {/* Cart Product End */}
                  
                   <div className='relative border flex flex-col gap-4 lg:mt-0 mt-3 border-gray-200 rounded-md py-3 px-3' >
                    {/* Loader */}
                    {zipChange ? <div className='absolute z-40 flex justify-center items-center left-0 top-0 rounded-sm h-full bg-gray-500/50 w-full' ><BiLoaderAlt className='animate-spin text-4xl' /></div>:null}
                    
                    <div className='flex items-center justify-between' >
                      <div className='flex items-center space-x-1' ><FaDotCircle className='text-b3' /><HiOutlineTruck className='text-2xl' />
                        <h4 className='text-sm font-medium' >Delivering To</h4>
                      </div>
                      <h4 className='text-b3 font-semibold' >${orderInfo?.shipping}</h4>
                    </div>
                    <div className='flex items-center p-[8px] rounded-md border-[1px]' >
                     <BiSearchAlt2 className='text-b6 mr-1' />
                     <input type="text" value={zip} onChange={(e)=>setZip(e.target.value)} className=' text-xs font-semibold rounded-lg outline-none w-full' />
                     <span>{zipError?<BiError className='text-red-600 text-xl' />:null}{zipSuccess?<TiTick className='text-green-600 text-xl' />:null}</span>
                    </div>
                    <div  className='relative'>
                      <button onClick={toggleDropdown} className='w-full rounded-lg flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                          <span className='w-[18px] h-[18px]'>
                            <img src="/svgs/calendar_month.webp" alt="calendar_month" />
                          </span>
                          <span className='text-xs font-medium text-b3'>
                            Select Time-slot
                          </span>
                        </div>
                      </button>
                      

                    </div>

                  </div>

                </div> : null}


                {orderInfo.type === 'pickup' && products?.length > 0 ? <div className='flex flex-col rounded-lg px-6 py-5 mx-5 mb-5 border border-gray-200 ' >
                  <h4 className='font-semibold' >Pickup Orders</h4>
                  {/* Cart Product */}
                  <div className='flex flex-col gap-6 space-y-2 mb-3'>
                    {products.map((item, pindex) => ( 
                     Array.from({ length: item.count }).map((_, index) => (
                      <SideCartCard indx={`${pindex}-${index}-pickup`} key={`${pindex}-${index}-pickup`} type="pickup" item={item} cartId={cartId} RemoveFromCart={RemoveCartItemData} delState={delLoading} setDelState={setDelLoading} />
                    ))
                    )
                    )}
                  </div>
                  {/* Cart Product End */}

                  <div className='border flex flex-col lg:mt-0 mt-3 border-gray-200 rounded-md py-3 px-1' >
                    <div className='relative flex flex-col space-y-2' >
                      {locLoading ? <div className='absolute flex items-center justify-center bg-gray-500/50 w-full h-full' ><BiLoaderAlt className='animate-spin text-4xl' /></div>:null}
                      <div className='flex items-center px-2 space-x-2' >
                        <div className='flex' ><button type="button" onClick={e=>UpdatePickupLocation(e,'Georgetown, Tx')} className={`px-[2px] py-[2px] rounded-full cursor-pointer ${orderInfo?.location === 'Georgetown, Tx' || '' ? 'bg-b6/20' : 'bg-gray-100'} `} ><GoDotFill className={` ${orderInfo?.location === 'Georgetown, Tx' ? 'text-b6' : 'text-gray-200'} `} /></button></div>
                        <AiOutlineShop className='text-3xl text-gray-400' />
                        <h4 className='text-sm font-normal text-gray-400 w-full' >Pickup in the Warehouse Georgetown,Tx</h4>
                        <h4 className='text-sm font-normal text-gray-400' >Free</h4>
                      </div>
                      <div className='flex items-center px-2 pt-2 space-x-2 border-t-[1px] border-gray-200' >
                        <div className='flex' ><button type="button" onClick={e=>UpdatePickupLocation(e,'Austin, Tx')} className={`px-[2px] py-[2px] rounded-full cursor-pointer ${orderInfo?.location === 'Austin, Tx' ? 'bg-b6/20' : 'bg-gray-100'} `} ><GoDotFill className={` ${orderInfo?.location === 'Austin, Tx' ? 'text-b6' : 'text-gray-200'} `} /></button></div>
                        <AiOutlineShop className='text-3xl text-gray-400' />
                        <h4 className='text-sm font-normal text-gray-400 w-full' >Pickup in the store Austin, Tx</h4>
                        <h4 className='text-sm font-normal text-gray-400' >Free</h4>
                      </div>
                    </div>


                  </div>

                </div> : null}
              </div>
              <div className='relative border-t border-gray-300 p-6 flex flex-col justify-end gap-6'>
                <div className='flex justify-between'>
                  <span className='text-sm'>
                    Order Total
                  </span>
                  <span className='font-bold'>
                    ${subTotal}
                  </span>
                </div>

                <button onClick={(e)=>{e.preventDefault();dispatch(hideSCart());navigate('/mycart')}} disabled={zipError ? true : false} type='button' className={`text-xs text-white rounded-lg ${zipError?'bg-b7/80 cursor-not-allowed':'bg-b7'} px-4 py-3 flex gap-2 justify-center`}>
                  View Cart
                  <AiOutlineShoppingCart className='text-base' />
                </button>
                <button onClick={(e)=>{e.preventDefault();dispatch(hideSCart());navigate('/mycart/information')}} disabled={zipError ? true : false} type='button' className={`text-xs text-white rounded-lg ${zipError?'bg-b3/75 cursor-not-allowed':'bg-b3'} px-4 py-3 flex gap-2 justify-center`}>
                  Proceed to Checkout
                  <AiOutlineArrowRight className='text-base' />
                </button>
              </div></>}
        </div>
      </div>

    </div>
  )
}

export default SideCart