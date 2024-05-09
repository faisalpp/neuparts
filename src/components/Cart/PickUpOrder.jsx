import React, { useState ,useEffect} from 'react';
import CartCard from './CartCard';
import { useSelector,useDispatch } from 'react-redux';
import { Radio, Typography } from "@material-tailwind/react";
import RadioSvg from '../../svgs/RadioSvg';
import ShipmentSvg from '../../svgs/ShipmentSvg';
import PickUpSvg from '../../svgs/PickUpSvg';
import {ChangeCartItemType,resetCart} from '../../store/cartSlice'
import Toast from '../../utils/Toast'
import { resetOrder } from '../../store/orderSlice';
import Popup from '../../components/AdminDashboard/Popup'
import { CheckZip } from '../../api/frontEnd';
import {BsTruck} from 'react-icons/bs'
import {GoDotFill} from 'react-icons/go'
import {AiOutlineSearch} from 'react-icons/ai'


const PickUpOrder = ({orders,refresh}) => {

    const date = new Date()
    
    const [delvPopup,setDelvPopup] = useState(false)

    const orderInfo = useSelector((state)=>state.cart?.cart.orderInfo)
    const cartId = useSelector((state)=>state.cart?.cart._id)
    const dispatch = useDispatch()

      const [ordrInfo, setOrdrInfo] = useState({});
      const [zip, setZip] = useState('73301');
      const [changeZip, setChangeZip] = useState(true);
      const [error, setError] = useState(false);

      const [zipLoading,setZipLoading] = useState(false)

      const Submit = async () => {
        setZipLoading(true)
        const res = await CheckZip({zip:zip})
        if (res.status == 200) {
          setZipLoading(false)
          setError(false);
          setChangeZip(false);
          setOrdrInfo({type:'delivery',location:zip,shipping:res.data.zip.location.rate})
        } else {
          setZipLoading(false)
          setChangeZip(false);
          setError(true);
        }
      };
      useEffect(() => {
        if (zip.length === 5) {
          Submit();
        }
       }, [zip])
  

      const handleDeliveryChange = async (e) => {
        e.preventDefault()
            const data = {cartId:cartId,orderInfo:ordrInfo};
            const res = await dispatch(ChangeCartItemType(data))
            if(res.payload.status === 200){
             setDelvPopup(false)
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
         <Popup state={delvPopup} setState={setDelvPopup} style="left-0" >
            <div className='flex flex-col items-center space-y-3' >
             <h3 className='font-semibold' >Change Delivery Location</h3>
             
             <div className={`flex flex-col px-5 pt-2 pb-6 w-3/2 rounded-lg border-[1px]  border-b10} `} >
               <div className='flex items-center space-x-2' ><BsTruck className='text-5xl' /><h6 className='font-bold text-sm' >Delivery&nbsp;<span>{changeZip ? null : zip}</span></h6><h6 onClick={()=>setChangeZip(true)} className='text-xs w-max text-blue-400 hover:underline cursor-pointer' >Change&nbsp;ZIP</h6><div className='flex items-center justify-end w-full' ><span className={`py-[2px] px-[2px] rounded-full cursor-pointer bg-b10/20`} ><GoDotFill className='text-b10' /></span></div></div>
                <div className={` ${changeZip ? 'flex' : 'hidden'} flex-col justify-center items-center h-full text-sm`} >
                 <div className='flex items-center bg-white border-[1px] px-2 py-1 rounded-lg space-x-2 w-10/12 ' ><AiOutlineSearch className='text-blue-400 text-lg' /><input type="search" value={zip} onChange={e => setZip(e.target.value)} placeholder='Enter ZIP Code' className="w-full text-xs outline-none" />{zipLoading ? <div className="flex w-fit h-full justify-center items-center" ><img src="/loader-bg.gif" className="w-4 h-4" /></div> :null}</div>
               </div>
               <div className={` ${changeZip ? 'hidden' : 'flex'} flex-col space-y-2 text-sm`} >
                 <h6 className='text-b10' >{date.day}, {date.month} {date.date} (EST).</h6>
                 <h6 className='text-gray-500' >Schedule Delivery in Checkout.</h6>
                 {error ? <span className='flex items-center bg-gray-500 text-white text-xs w-fit px-2 py-1 rounded-xl' ><AiFillCloseCircle className='mr-1' />Delivery Not Available</span> : <h6 className='font-bold' >${ordrInfo.shipping}</h6>}
               </div>
             </div>
             <button type='button' onClick={e=>handleDeliveryChange(e)} className='bg-b6 w-fit text-white px-2 text-sm py-1 rounded-lg' >Change</button>
            </div>
         </Popup>



        <div className='border border-b26 rounded p-5 md:p-10 grid grid-cols-1 gap-8'>
            <h2 className='text-b16 font-bold text-xl'>Pickup Orders</h2>
            {orders.map((item,indx)=><CartCard key={indx} indx={indx} order={item} type="pickup" changeType={refresh} />)}
            <div className='w-full border border-[#D9D9D9] p-4 rounded-lg flex justify-between items-center'>
            <div className='flex' > 
             <div className='flex gap-2 items-center'>
              <span className='w-[18px] h-[18px]'><img src="/svgs/Pick-up.webp" alt="Pick-up" /></span>
              <span className='text-sm text-[#545454] pr-3'>{orderInfo.location}</span>
             </div>
             <div className="flex border-l-[1px]">
              <Radio id={`delivery1`} icon={<RadioSvg className="w-[18px] h-[18px]" />} className='border border-[#D9D9D9] bg-white p-0 w-[18px] h-[18px]' ripple={false} name={`delivery-1`} label={
                  <Typography className="font-medium text-sm text-b16 flex gap-4"><ShipmentSvg /><span>Delivery</span></Typography>
              } defaultChecked={orderInfo.type === 'delivery' ? true : false} onChange={(e)=>{if(e.target.checked){setDelvPopup(true)}}} />
              <Radio id={`pickup-1`} icon={<RadioSvg className="w-[18px] h-[18px]" />} className='border border-[#D9D9D9] bg-white w-[18px] h-[18px] p-0' ripple={false} name={`delivery-1`} label={
               <Typography className="font-medium text-sm text-b16 flex gap-4"><PickUpSvg /><span>Pickup</span></Typography>
              } defaultChecked={orderInfo.type === 'pickup' ? true : false} onChange={(e)=>{if(e.target.checked){setPickPopup(true)}}} />
             </div>
             </div>
             <div className='leading-[-0.2px] text-sm text-b3'>Free</div>
            </div>
        </div>
        </>
    )
}

export default PickUpOrder