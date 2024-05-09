import React,{useState} from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Washer from './Product/CompleteLaundry/Washer'
import Drayer from './Product/CompleteLaundry/Drayer'
import Filter from './Product/CompleteLaundry/Filter'
import { Link } from 'react-router-dom'
import  {resetLaundary} from '../store/laundarySlice'
import { useDispatch, useSelector } from 'react-redux'
import { FaQuestion } from 'react-icons/fa'
import { BsArrowRightShort } from 'react-icons/bs'
import { AddToCart } from '../store/cartSlice'
import Toast from '../utils/Toast'

const CompleteLaundary = ({ closeModal ,subCategory}) => {

    const [type,setType] = useState(subCategory)
    const dispatch = useDispatch()
    const WASHER = useSelector((state)=>state.laundary?.washer)
    const DRYER = useSelector((state)=>state.laundary?.dryer)
    const SUB_TOTAL = useSelector((state)=>state.laundary.subTotal)

    const cartId = useSelector((state)=>state.cart?.cart._id)
    const [loading,setLoading] = useState(false)
    const ordInfo = useSelector((state)=>state.cart?.cart?.orderInfo)
    const [orderInfo, setOrderInfo] = useState(ordInfo ? ordInfo :  {type:'pickup',location:'Georgetown, Tx',shipping:'Free'});

    const addToCart = async (e) => {
        e.preventDefault();
        if (WASHER && DRYER) {
          setLoading(true);
            // Add WASHER to the cart
            const washerData = { cartId: cartId, productId: WASHER.id, orderInfo: orderInfo };
            const washerRes = await dispatch(AddToCart(washerData));
            if (washerRes.payload.status === 200) {
              Toast(washerRes.payload.msg, 'success', 1000);
            } else if (washerRes.payload.status === 404) {
              dispatch(resetCart());
              dispatch(resetOrder());
              setLoading(false);
              Toast(washerRes.payload.message, 'info', 1000);
              return
            } else {
              setLoading(false);
              Toast(washerRes.payload.message, 'error', 1000);
              return
            }
      
            // Add DRYER to the cart
            const dryerData = { cartId: cartId, productId: DRYER.id, orderInfo: orderInfo };
            const dryerRes = await dispatch(AddToCart(dryerData));
      
            if (dryerRes.payload.status === 200) {
              Toast(dryerRes.payload.msg, 'success', 1000);
            } else if (dryerRes.payload.status === 404) {
              dispatch(resetCart());
              dispatch(resetOrder());
              Toast(dryerRes.payload.message, 'info', 1000);
              setLoading(false);
              return
            } else {
              Toast(dryerRes.payload.message, 'error', 1000);
              setLoading(false);
              return
            }
            closeModal()
            dispatch(resetLaundary())
            setLoading(false); // Set loading to false after both additions are completed
        }
      };

    const NotSelected = ({title}) => {
        return (
            <div className='flex flex-col gap-4 items-center w-full h-full' >
            <h4 className='text-xl font-semibold' >{title}</h4>
            <div className='flex flex-col items-center justify-center py-10 border-dashed border-2 border-b3 rounded-xl h-full w-full' >
             <div className='flex flex-col items-center space-y-3' >
              <FaQuestion className='text-4xl mb-4' />
              <div className='flex justify-center' ><span className='flex items-center bg-b7 text-xs px-4 py-3 rounded-md text-white font-bold' ><span >Choose A {title}</span><BsArrowRightShort className='text-2xl' /></span></div>
             </div>
            </div>
           </div>
        )
    }

    const Card = ({image,title,not}) => {
     return (
      <div className='text-center space-y-2'>
       {not ? <div className='w-16 h-16 border flex justify-center items-center border-dashed border-b3 rounded-xl'>
         <FaPlus className='text-b3' />
         </div>:
       <div className='w-16 h-16 border flex justify-center items-center border-dashed border-b3 rounded-xl'>
        <img src={image} alt="p1" className='w-10 h-10 object-contain' />
       </div>}
       <span className='text-b16 text-sm font-medium'>
        {title}
       </span>
      </div>
     )
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 w-full overflow-y-auto h-screen bg-black/40 z-50 !m-0 px-12 lg:px-20'>
            <div className='max-w-[1440px] mx-auto my-10 bg-white rounded-3xl'>
                <div className='relative grid grid-cols-1 gap-60px mx-auto h-auto  p-10 lg:p-14 3xl:p-60px '>
                    <button type='button' onClick={closeModal} className='absolute -right-10 top-0 bg-b3 text-white flex p-1 justify-center items-center w-8 h-8 rounded-full'>
                        <IoCloseOutline className='text-3xl' />
                    </button>
                    <div className='grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-7 w-full justify-center items-center h-full'>
                        {/* Washer */}
                        {WASHER?<Washer />:<NotSelected title="Washer" />}
                        {/* ==== */}
                        <div><FaPlus className='text-b3 mx-auto' /></div>
                        {/* Drayer */}
                        {DRYER?<Drayer />:<NotSelected title="Dryer" />}
                        {/* ==== */}
                    </div>
                    <div className='grid grid-cols-2 rounded-xl overflow-hidden'>
                        <button onClick={()=>setType('washer')} type='button' className={`${type === 'washer' ?  'bg-b11 ':'bg-b3 text-white'}  p-4 w-full font-bold `}>
                            Washer
                        </button>
                        <button onClick={()=>setType('dryer')} type='button' className={`${type === 'dryer' ? 'bg-b11':'bg-b3 text-white'} p-4 w-full font-medium`}>
                            Dryers
                        </button>
                    </div>

                    <div className=''>
                        <Filter type={type} />
                    </div>
                </div>
                <div className='text-b16 flex flex-wrap gap-5 justify-between shadow-[0px_-4px_40px_0px_rgba(0,0,0,0.10)] p-10 bg-white rounded-b-3xl'>
                    <div className='flex flex-wrap items-center gap-6'>
                        <div>
                            <span className='font-semibold'>
                                Selected Items
                            </span>
                            <div className='flex gap-3 items-center'>
                                <span className='font-medium'>
                                    {WASHER && DRYER ? '2 Items':'1 Item'} 
                                </span>
                                <div className='h-[18px] w-[1px] bg-[rgba(17,16,16,0.20)]'></div>
                                <button onClick={()=>dispatch(resetLaundary())} type='button' className='text-red-600 font-medium'>
                                    Reset
                                </button>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                           {WASHER ? <Card title="Washer" image={WASHER.media} />:<Card title="Washer" not={true} />}
                           {DRYER ? <Card title="Dryer" image={DRYER.media} />:<Card title="Washer" not={true} />}
                        </div>
                    </div>
                    <div className='flex items-end flex-wrap gap-5 md:gap-10'>
                        <div>
                            <h3 className='text-xl font-semibold mb-4 text-black'>Subtotal</h3>
                            <p className='text-32px text-black font-semibold'>
                                ${SUB_TOTAL}
                            </p>
                        </div>
                        <div>
                            <button onClick={e=>addToCart(e)} type="button" className='text-white py-4 px-8 flex gap-2 items-center justify-center text-center w-full bg-b7 rounded-lg'>
                             <AiOutlineShoppingCart className='text-2xl' />
                             Add Selected Items To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompleteLaundary