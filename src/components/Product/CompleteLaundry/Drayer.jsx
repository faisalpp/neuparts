import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsArrowRightShort } from 'react-icons/bs'
import { FaQuestion } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ToolTip from '../../ToolTip'

const Drayer = () => {

    const DRYER = useSelector((state)=>state.laundary?.dryer)
    

    const StarIconPrinter = ({ numberOfTimes }) => {
        const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
          <AiFillStar key={index} className='text-b7 text-lg' /> // Render the star icon component for each iteration
        ));
    
        return <div className='flex mt-2 items-center' >{starIcons}</div>; // Render the array of star icons
    };

    const ExtendTag = ({name}) => {
        return (
            <>
            {name === "top-refrigerator-bottom-freezer" ? <div className='flex flex-col hover:shadow-md cursor-pointer items-center border-[1px] border-[rgba(0,0,0,0.15)] rounded-md px-2 py-2 w-fit h-fit' ><h5 className='text-[9px] font-medium' >TOP REFRIGERAOTR</h5><span className='flex h-[1px] w-full bg-[rgba(0,0,0,0.15)]' ></span><h5 className='text-[9px] font-medium' >BOTTOM FREEZER</h5></div>:null}
            {name === "top-freezer-bottom-refrigerator"?<div className='flex flex-col hover:shadow-md cursor-pointer items-center border-[1px] border-[rgba(0,0,0,0.15)] rounded-md px-2 py-2 w-fit h-fit' ><h5 className='text-[9px] font-medium' >TOP FREEZER</h5><span className='flex h-[1px] w-full bg-[rgba(0,0,0,0.15)]' ></span><h5 className='text-[9px] font-medium' >BOTTOM REFRIGERAOTR</h5></div>:null}
            </>
            )
       }

    return (
        <>
        {DRYER ? 
        <div className='flex flex-col gap-4 items-center w-full' >
            <h4 className='text-xl font-semibold' >Dryer</h4>
            <div className='py-6 pr-7 2xl:pr-12 bg-white border-[1px] border-b3 rounded-xl w-full' >
                <div className='flex flex-col 2xl:flex-row xl:flex-row gap-4 xl:gap-0 items-start w-full'>
                    <div className='max-w-[195px] w-full h-[209px]'>
                        <img src={DRYER.media} className='w-full h-full object-contain' alt='' />
                    </div>
                    <div className='grid grid-cols-1 2xl:pl-7 2xl:p-0 gap-4 w-full' >
                        <p className='font-semibold line-clamp-1 leading-5 mb-2' >{DRYER.title}</p>
                        <div className='flex items-center gap-x-5' >
                            <span className='font-semibold text-xl text-b3' >${DRYER.isSale ? DRYER.salePrice : DRYER.regPrice}</span>
                            {DRYER.isSale ?<strike className="text-b23" >${DRYER.regPrice}</strike>:null}
                            {DRYER.isSale ? <span className='flex bg-b4 text-xs text-b16 px-2 py-1 font-semibold rounded-full' >-{(100 - (DRYER.salePrice / DRYER.regPrice) * 100).toFixed(0)}%</span>:null}
                        </div>
                        <div className='flex items-center gap-5 2xl:gap-[10px] xl:gap-[5px]' >
                            <div className='flex items-center gap-1' >
                                <h4 className='lg:text-sm text-xs font-semibold w-max text-b15' >Cosmetic Rating</h4>
                                <ToolTip color="text-b15/80" />
                            </div>
                            <div className='flex items-center'>
                               <StarIconPrinter numberOfTimes={DRYER.rating} /> 
                            </div>
                        </div>
                        <div className='flex items-center gap-5 2xl:gap-10 xl:gap-4' >
                            <h4 className='lg:text-sm text-xs font-semibold text-b15' >Appliance Brand</h4>
                            <h4 className='lg:text-sm text-xs font-medium w-max text-black capitalize' >{DRYER.brand}</h4>
                        </div>
                        <div className='lg:flex hidden items-center 2xl:gap-x-14 gap-6 ' >
                            <div className='flex font-semibold text-sm text-b15' ><h4>Discount</h4>&nbsp;%</div>
                            <div className='w-full bg-gray-100 rounded-lg' ><span className='flex rounded-lg bg-gradient-to-r from-b4 to-b7 w-32 h-2' ></span></div>
                        </div>
                        <ul className='flex flex-col gap-y-3 text-black  w-full' >
                            {/* <li>. Lorem ipsum dolor alter miler amigos</li> */}
                            {DRYER?.bulletDescription?.length > 0 ?
                             DRYER?.bulletDescription.slice(0,3).map((bullet)=><li className="text-[11px]" >{bullet}</li>)
                            :null}
                        </ul>
                        <div className='flex flex-col'>
                            <h5 className='text-sm xl:text-xs font-semibold' >Dryer Options</h5>
                            <div className='flex flex-wrap gap-2 mt-2' >
                            {DRYER.tags ? DRYER.tags.map((item,index)=> <> 
                            {item.selected?<ExtendTag id={item.id} name={item.el} selected={item.selected} />:null}
                            {item.selected ? <div key={index} className={`flex items-center cursor-pointer hover:shadow-md space-x-1 border-[1px] border-[rgba(0,0,0,0.15)]} rounded-md px-3 py-2 w-fit h-fit`} >{item.icon !== '' ?<img src={`/tags/${item.icon}.png`} className='h-6 w-6' />:null}<span><h5 className='text-[10px] font-medium' >{item.name}</h5></span></div>:null}
                            </>):null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :
        <div className='flex flex-col gap-4 items-center w-full h-full' >
        <h4 className='text-xl font-semibold' >Dryer</h4>
        <div className='flex flex-col items-center justify-center py-10 border-dashed border-2 border-b31 rounded-xl h-full w-full' >
            <div className='flex flex-col items-center space-y-3' >
                <FaQuestion className='text-4xl mb-4' />
                <div className='flex justify-center' ><Link to="" className='flex items-center bg-b7 text-xs px-4 py-3 rounded-md text-white font-bold' ><span className='' >Choose A Dryer</span><BsArrowRightShort className='text-2xl' /></Link></div>
            </div>
        </div>
    </div>
        }
        </>
    )
}

export default Drayer