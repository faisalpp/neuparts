import React from 'react'
import ModelBuyingOptionCard from './ModelBuyingOptionCard'
import ModelBuyingOptionCardDisabled from './ModelBuyingOptionCardDisabled'
import { AiFillStar, AiOutlineDollarCircle } from 'react-icons/ai'
import { FaFire } from 'react-icons/fa'
import { FiLink2 } from 'react-icons/fi'
import { NavLink, useParams } from 'react-router-dom'

const ModelBuyingOptionsSection = ({threeStar,fourStar,fiveStar,modelNo,title,disabledImg,rating}) => {

  return (
    <>

      <div id='compare' className='py-14 xl:py-20 items-center w-full 3xl:max-w-1680px px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-[180px] mx-auto' >
        <h4 className='text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-center' >Buying Options for Model Number {modelNo}</h4>


        <div>
          <div className='flex flex-col justify-center pt-14 xl:pt-20 items-center w-full' >

            <div className='flex border border-gray-200 w-full rounded-md h-full' >


              {/* Specifications */}
              <div className='hidden lg:flex flex-col items-center justify-end h-12/12 whitespace-nowrap mb-[90px]' >

                <div className='flex flex-col gap-7 px-6 2xl:pl-6 pr-12' >
                  <h6 className='text-sm xl:text-base font-bold' >Cosmetic Ratings</h6>
                  <h6 className='text-sm xl:text-base font-bold' >Price</h6>
                  <h6 className='text-sm xl:text-base font-bold' >Model Number</h6>
                  <h6 className='text-sm xl:text-base font-bold' >ID #</h6>
                  <h6 className='text-sm xl:text-base font-bold' >Cosmetic Condition</h6>
                  <h6 className='text-sm xl:text-base font-bold' >Mechanical Test</h6>
                  <h6 className='text-sm xl:text-base font-bold' >Inspections</h6>
                  <h6 className='text-sm xl:text-base font-bold' >Warranty</h6>
                  <h6 className='text-sm xl:text-base font-bold' >Class</h6>
                </div>

              </div>

              <div className='flex flex-col border border-t-0 border-r-0 border-b-0 w-full border-gray-200' >

                <div className='py-3'>
                  <div className='flex justify-center text-[#111010] text-sm w-full font-semibold' ><h5>{title}</h5></div>
                </div>

                <div className='flex maxlg:flex-wrap justify-center border-t' >
                  {threeStar ? <ModelBuyingOptionCard image={threeStar.media} slugg={threeStar.slug} price={threeStar.isSale ? threeStar.salePrice : threeStar.regPrice} modelNo={threeStar.modelNo} itemId={threeStar.itemId} rating={threeStar.rating} cosmaticcondition="Moderate Cosmetic Damage" bestValue={<span className='flex items-center bg-b9 rounded-2xl px-4 py-1 text-xs xl:text-sm' ><AiOutlineDollarCircle className='mr-1' /> Best Value</span>} />:<ModelBuyingOptionCardDisabled image={disabledImg} price={600} modelNo={123456} itemId={654321} rating={3} cosmaticcondition="Moderate Cosmetic Damage" bestValue={<span className='flex items-center bg-b32/60 rounded-2xl px-4 py-1 text-xs xl:text-sm' ><AiOutlineDollarCircle className='mr-1' /> Best Value</span>} />}
                  {fourStar ?<ModelBuyingOptionCard image={fourStar.media} slugg={fourStar.slug} price={fourStar.isSale ? fourStar.salePrice : fourStar.regPrice} modelNo={fourStar.modelNo} itemId={fourStar.itemId} rating={fourStar.rating} cosmaticcondition="Minor Cosmetic Damage" bestValue={<span className='flex items-center bg-b3 rounded-2xl px-4 py-1 text-xs xl:text-sm' ><FaFire className='mr-1' />Most Popular</span>} />:<ModelBuyingOptionCardDisabled image={disabledImg} price={800} modelNo={123456} itemId={654321} rating={4} cosmaticcondition="Minor Cosmetic Damage" bestValue={<span className='flex items-center bg-b32/60 rounded-2xl px-4 py-1 text-xs xl:text-sm' ><FaFire className='mr-1' />Most Popular</span>} />}
                  {fiveStar ?<ModelBuyingOptionCard image={fiveStar.media} slugg={fiveStar.slug} price={fiveStar.isSale ? fiveStar.salePrice : fiveStar.regPrice} modelNo={fiveStar.modelNo} itemId={fiveStar.itemId} rating={fiveStar.rating} cosmaticcondition="Very Minor- No Cosmetic" bestValue={<span className='flex items-center bg-b7 rounded-2xl px-4 py-1 text-xs xl:text-sm' ><AiFillStar className='mr-1 text-white' />Premium Condition</span>} />: <ModelBuyingOptionCardDisabled image={disabledImg} price={1200} modelNo={123456} itemId={654321} rating={5} cosmaticcondition="Very Minor- No Cosmetic" bestValue={<span className='flex items-center bg-b32/60 rounded-2xl px-4 py-1 text-xs xl:text-sm' ><AiFillStar className='mr-1 text-white' />Premium Condition</span>} /> }
                </div>


              </div>

            </div>
          </div>
        </div>
        <div className='py-5 text-center' ><NavLink to={`/products/buying-options/?modelNo=${modelNo}`} className='text-b7 font-semibold mt-5 flex items-center justify-center mx-auto gap-1'><FiLink2 stroke-width="3" /> View More Buying Options</NavLink></div>
      </div>
    </>
  )
}

export default ModelBuyingOptionsSection