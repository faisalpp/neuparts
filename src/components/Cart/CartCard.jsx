import React,{useState} from 'react'
import StockSvg from '../../svgs/StockSvg'
import ToolTip from '../ToolTip'
import { AiFillStar } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {ChangeCartItemType,RemoveFromCart} from '../../store/cartSlice'
import { useDispatch, useSelector } from 'react-redux';

const CartCard = ({order,type,indx,changeType}) => {

    const StarIconPrinter = ({ numberOfTimes }) => {
        const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
          <AiFillStar key={index} className='text-b7 text-lg' /> // Render the star icon component for each iteration
        ));
    
        return <div className='flex mt-2 items-center' >{starIcons}</div>; // Render the array of star icons
      };
     
      const dispatch = useDispatch()
      const cartId = useSelector((state)=>state.cart.cartId)



      const total = useSelector((state)=>state.cart.total);
      const cartCount = useSelector((state)=>state.cart.cartCount);

      const [delLoading,setDelLoading] = useState(false)

      const RemoveCartItemData = async (e, index,cId,pId,oId, typ,pPrice,cCount,cTotal) => {
        e.preventDefault()
        
        setDelLoading({index:index,type:typ})
        const data = { cartId:cId ,pId,type:typ,price:pPrice,count:cCount,total:cTotal,objId:oId}
        const res = await dispatch(RemoveFromCart(data));
        if (res.payload.status === 200) {
          setDelLoading({index:'',type:''})
          Toast(res.payload.msg,'success',1000)
        }else {
          setDelLoading({index:'',type:''})
          Toast(res.payload.message,'error',1000)
        }
      }

      const PRICE = order.salePrice ? order.salePrice : order.regPrice;

    return (
        <div className='relative grid grid-cols-1 md:grid-cols-[160px_1fr] gap-5 3xl:gap-10 p-4 sm:p-6 rounded-2xl border border-[0px_10px_60px_0px_rgba(0,0,0,0.10)] shadow-[0px_10px_60px_0px_rgba(0,0,0,0.10)]'>
            <div>
                <img src="/cart/mycart.webp" className='w-40 h-40' alt="" />
            </div>
            <div className='flex items-start gap-2'>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-b18 text-sm sm:text-base md:text-lg lg:text-xl md:leading-6 font-semibold'>{order.title}</h3>
                    <div className='flex  gap-2 maxmd:justify-between items-center'>
                        <div className='py-[10px] bg-b13 px-4 rounded-full text-white inline-flex gap-2 items-center'>
                            <StockSvg />
                            <span className=' font-semibold text-[12.408px] sm:text-sm'>In Stock</span>
                        </div>
                        <span className='text-[12.408px] font-medium text-[rgba(0,0,0,0.64)]'>
                            Only 2 left
                        </span>
                    </div>
                    <div className='flex maxlg:flex-col justify-between gap-2 lg:items-center'>
                        <div className='flex maxsm:flex-wrap gap-4 items-center'>
                            <span className='text-xl text-b3 font-semibold'>
                                ${order.salePrice ? order.salePrice : order.regPrice}
                            </span>
                            {order.isSale ? <span className='text-lg text-b25'>
                                <strike>
                                    ${order.regPrice}
                                </strike>
                            </span>:null}
                            {order.isSale ? <span className='flex items-center whitespace-nowrap px-3 py-2 bg-b4 text-sm font-semibold rounded-full'>
                            - {(100 - (order.salePrice / order.regPrice) * 100).toFixed(0)}%
                            </span>:null}
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='flex gap-1 items-center'>
                                <span className='text-[rgba(36,36,36,0.50)] text-sm font-semibold'>
                                    Cosmetic Rating
                                </span>
                                <span>
                                    <ToolTip color="text-b3" />
                                </span>
                            </div>
                            <div className='inline-flex items-center'>
                                <StarIconPrinter numberOfTimes={order.rating}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full justify-end' >
                    {delLoading.index === indx && delLoading.type === type ? <button type='button' className='maxcosm:absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 p-2 bg-b8 rounded-full'>
                        <RiDeleteBin6Line className='text-red-500 text-base' />
                    </button>:<button type='button' onClick={e=>RemoveCartItemData(e, indx,cartId,order.pid, order._id,type,PRICE,cartCount,total)} className='maxcosm:absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 p-2 bg-b8 rounded-full'>
                        <RiDeleteBin6Line className='text-b3 text-base' />
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default CartCard