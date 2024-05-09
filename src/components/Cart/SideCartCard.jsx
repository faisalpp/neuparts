import React,{useState} from 'react'
import ToolTip from '../ToolTip'
import { AiFillStar } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';


const SideCartCard = (props) => {

    const StarIconPrinter = ({ numberOfTimes }) => {
        const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
            <AiFillStar key={index} className='text-b7 text-sm' /> // Render the star icon component for each iteration
        ));

        return <div className='flex mt-2 items-center' >{starIcons}</div>; // Render the array of star icons
    };
    
    const [price,setPrice] = useState(props.item.isSale ? props.item.salePrice : props.item.regPrice )
    
    return (
        <div className='flex justify-start mt-3 gap-3 w-full' >
            <img src={props.item.image} className='w-16 h-16' alt='' />
            <div className='flex flex-col justify-center gap-2 w-full' >
                <p className='text-sm font-semibold line-clamp-2' >{props.item.title}</p>
                <div className='flex items-center space-x-5'>
                    <div className='flex gap-2 items-center'>
                        <div className='flex gap-1 items-center'>
                            <span className='text-black/50 text-xs font-semibold'>
                                Cosmetic <br /> Rating
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <span>
                                <ToolTip dimension='w-4 h-4' color="text-b3" />
                            </span>
                            <StarIconPrinter numberOfTimes={props.item.rating} />
                        </div>
                    </div>
                    <div className='space-x-1'>
                        <strike className='text-b25 text-xs'>
                            ${props.item.regPrice}
                        </strike>
                        <span className='font-semibold text-b3 text-sm'>
                            ${props.item.salePrice}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                
                <button type='button' onClick={(e) => props.RemoveFromCart(e,props.indx,props.item.pid,price)} >
                    {props.delState === props.indx ? <RiDeleteBin6Line className='text-xl text-red-500 animate-bounce' /> : <RiDeleteBin6Line className='text-xl text-b3' />}
                </button>
            </div>
        </div>
    )
}

export default SideCartCard