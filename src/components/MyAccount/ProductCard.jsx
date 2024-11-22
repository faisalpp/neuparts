'use client';
import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import Image from 'next/image';
import FourStar from '@/components/svgs/FourStar';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import CustomModal from '@/components/Modal/CustomModal';
import { BiLoaderAlt } from "react-icons/bi";
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux';
import { removeFromFavoriteUser } from '@/app/GlobalRedux/slices/Favorite';

const ProductCard = ({Id, product, reload }) => {

  const [favLoad, setFavLoad] = useState(false);
  const dispatch = useDispatch()

  const removeFavorite = async (e) => {
    e.preventDefault();
    setFavLoad(true)
    const resp = await dispatch(removeFromFavoriteUser({_id:Id}))
    if(resp.payload.success){
      reload()
      toast.success('Product removed from favorites!')
    }else{
      toast.error('Removing favorite failed!')
    }
    setFavLoad(false) 
  };

  const conditions = [
    {
      title: 'New',
      slug: 'new',
      class: 'bg-dark-light-cyan',
      description: 'This appliance replacement part is brand new. We partner with manufacturers and distributor to offer our customers the best price possible for our appliance parts. We stock many new parts for many appliance manufacturers including: Samsung, Whirlpool, Electrolux, Maytag, Roper, Amana, Ge, Frigidaire, LG, Haier, Kenmore, Viking, Hisense and many more!',
      lists: ['This appliance replacement part is brand new.', 'We partner with manufacturers and distributor to offer our customers the best price possible for our appliance parts.', 'We stock many new parts for many appliance manufacturers including: Samsung, Whirlpool, Electrolux, Maytag, Roper, Amana, Ge, Frigidaire, LG, Haier, Kenmore, Viking, Hisense and many more!'],
    },
    {
      title: 'Like New / Open Box',
      slug: 'like-new-open-box',
      class: 'bg-dark-light-cyan',
      description: 'Like New / Open Box appliance parts may not arrive in their original packaging. COSMETICALLY  these parts are similar to a new parts however, some very minor Cosmetic damage may exist from their “Open Box” state.  Any moderate or major COSMETIC damage would be indicated and represented in a lower condition grade. All Like New / Open Box parts are MECHANICALLY  inspected and tested to verify their functionality is 100% within manufacturer specifications. Like New / Open Box parts are a great way to save money, we liquidate these parts at big discounts compared to new parts. Expect to have a similar condition to a new part at a larger discount. ',
      lists: ['Like New / Open Box appliance replacement parts may not arrive in their original packaging', '<b>COSMETICALLY</b>  these parts are similar to a new parts however, some very minor Cosmetic damage may exist from their “Open Box” state.', 'Any moderate or major <b>COSMETIC</b> damage would be indicated and represented in a lower condition grade.', 'All Like New / Open Box parts are <b>MECHANICALLY</b> inspected and tested to verify their functionality is 100% within manufacturer specifications.', 'Like New / Open Box parts are a great way to save money, we liquidate these parts at big discounts compared to new parts.', 'Expect to have a similar condition to a new part at a larger discount.'],
    },
    {
      title: 'Certified Refurbished',
      slug: 'certified-refurbished',
      class: 'bg-dark-cyan',
      description: 'Certified Refurbished appliance parts are typically previously used parts that have been inspected refurbished to manufacturer specifications if needed. COSMETICALLY  these parts may show signs of wear or use.  These parts will not include major COSMETIC damage.  All Certified Refurbished parts are MECHANICALLY inspected and tested to verify their functionality is 100% within manufacturer specifications. Certified Refurbished appliance parts are a great way to save money, we liquidate these parts at big discounts compared to new parts. Expect to have a similar condition to a new part at a larger discount. ',
      lists: ['Certified Refurbished appliance parts are typically previously used parts that have been inspected refurbished to manufacturer specifications if needed.', '<b>COSMETICALLY</b> these parts may show signs of wear or use.', 'These parts will not include major <b>COSMETIC</b> damage.', 'All Certified Refurbished parts are MECHANICALLY inspected and tested to verify their functionality is 100% within manufacturer specifications.', 'Certified Refurbished appliance parts are a great way to save money, we liquidate these parts at big discounts compared to new parts.', 'Expect to have a similar condition to a new part at a larger discount.'],
    },
    {
      title: 'Used • Grade A',
      slug: 'used-part-a-condition-grade',
      class: 'bg-[#FF9A3E]',
      description: 'Our A Grade Used parts are the bargain shopper’s best friend. We save our customer big bucks with our used Parts. We grade the COSMETIC appearance of each used part A, B, C, or D. A being the best cosmetic rating and D being the worst. The lower the grade, the bigger the discount! All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications. Our grading system is based on their COSMETIC appearance (how they look) not on their functionality. Each Used part comes with its own set of pictures so you can see any signs of use or imperfections. Expect to see very little to no signs of use or other Cosmetic imperfections. Although they may show signs of cosmetic wear, they will function like new.',
      lists: ['Our A Grade Used parts are the bargain shopper’s best friend.', 'We grade the COSMETIC appearance of each used part A, B, C, or D.', 'The lower the grade, the bigger the discount!', 'All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications.', 'Our grading system is based on their COSMETIC appearance (how they look) not on their functionality.', 'Each Used part comes with its own set of pictures so you can see any signs of use or imperfections.', 'Expect to see very little to no signs of use or other Cosmetic imperfections.', 'Although they may show signs of cosmetic wear, they will function like new.'],
    },
    {
      title: 'Used • Grade B',
      slug: 'used-part-b-condition-grade',
      class: 'bg-[#FF9A3E]',
      description: 'Used B Grade Parts are an incredible value and one of the core reasons why our customers love what we do. We save our customer big bucks with our used Parts. We grade the COSMETIC appearance of each used part A, B, C, or D. A being the best cosmetic rating and D being the worst. The lower the grade, the bigger the discount! All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications. Our grading system is based on their COSMETIC appearance (how they look) not on their functionality. Each Used part comes with its own set of pictures so you can see any signs of use or imperfections. Expect to see very little to medium signs of use or other Cosmetic imperfections. Although they may show signs of cosmetic wear, they will function like new.',
      lists: ['Used B Grade Parts are an incredible value and one of the core reasons why our customers love what we do.', 'We grade the COSMETIC appearance of each used part A, B, C, or D.', 'The lower the grade, the bigger the discount!', 'All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications.', 'Our grading system is based on their COSMETIC appearance (how they look) not on their functionality.', 'Each Used part comes with its own set of pictures so you can see any signs of use or imperfections.', 'Expect to see very little to medium signs of use or other Cosmetic imperfections.', 'Although they may show signs of cosmetic wear, they will function like new.'],
    },
    {
      title: 'Used • Grade C',
      slug: 'used-part-c-condition-grade',
      class: 'bg-[#FF9A3E]',
      description: 'If you’re looking to save money, Used C grade appliance parts are a great tool to do so. We save our customer big bucks with our used Parts. We grade the COSMETIC appearance of each used part A, B, C, or D. A being the best cosmetic rating and D being the worst. The lower the grade, the bigger the discount! All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications. Our grading system is based on their COSMETIC appearance (how they look) not on their functionality. All Used parts are verified to work as intended based on Manufacturer specifications. Each Used part comes with its own set of pictures so you can see any signs of use or imperfections. Expect to see Medium to Heavy signs of use or other Cosmetic imperfections. Although they may show signs of cosmetic wear, they will function like new.',
      lists: ['Used C grade appliance parts are a great tool to save money.', 'We grade the COSMETIC appearance of each used part A, B, C, or D.', 'The lower the grade, the bigger the discount!', 'All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications.', 'Our grading system is based on their COSMETIC appearance (how they look) not on their functionality.', 'All Used parts are verified to work as intended based on Manufacturer specifications.', 'Each Used part comes with its own set of pictures so you can see any signs of use or imperfections.', 'Expect to see Medium to Heavy signs of use or other Cosmetic imperfections.', 'Although they may show signs of cosmetic wear, they will function like new.'],
    },
    {
      title: 'Used • Grade D',
      slug: 'used-part-d-condition-grade',
      class: 'bg-[#FF9A3E]',
      description: 'These parts include the deepest discounts we have available. We save our customer big bucks with our used Parts. We grade the COSMETIC appearance of each used part A, B, C, or D. A being the best cosmetic rating and D being the lowest. The lower the grade, the bigger the discount! All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications. Our grading system is based on their COSMETIC appearance (how they look) not on their functionality. All Used parts are verified to work as intended based on Manufacturer specifications. Each Used part comes with its own set of pictures so you can see any signs of use or imperfections. Expect to see Heavy signs of use or other Cosmetic imperfections. Although they may show signs of cosmetic wear, they will function like new.',
      lists: ['These parts include the deepest discounts we have available.', 'We grade the COSMETIC appearance of each used part A, B, C, or D.', 'The lower the grade, the bigger the discount!', 'All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications.', 'Our grading system is based on their COSMETIC appearance (how they look) not on their functionality.', 'All Used parts are verified to work as intended based on Manufacturer specifications.', 'Each Used part comes with its own set of pictures so you can see any signs of use or imperfections.', 'Expect to see Heavy signs of use or other Cosmetic imperfections.', 'Although they may show signs of cosmetic wear, they will function like new.'],
    },
  ];

  const ConditionData = (cond) => {
    return conditions.find((item) => item.slug === (cond ? cond : product.condition));
  };

  const [openModal, setOpenModal] = useState(false);
  const [activeCondition, setActiveCondition] = useState({});

  const handleCloseModal = (cond) => {
    setOpenModal(!openModal);
    if (cond) {
      setActiveCondition(ConditionData(cond));
    }
  };

  const [thumbnail,setThumbnail] = useState(product?.thumbnail ? product.thumbnail : '/no-image.webp')

  return (
    <>
    <CustomModal data={activeCondition} openModal={openModal} closeModal={handleCloseModal} />
      <div className={`relative flex flex-col overflow-hidden rounded-2xl border border-b14 bg-white maxmd:mx-auto maxmd:max-w-[267px]`}>
        {favLoad ? <div className='absolute w-full h-full flex items-center justify-center bg-white/60 z-20' ><BiLoaderAlt className="animate-spin text-2xl text-black" /></div> : null}
        <span className="absolute right-0 top-0 z-20 mr-1 mt-2 rounded-2xl bg-b4 px-4 py-2 text-xs font-bold">{(100 - (product.sale_price / product.regular_price) * 100).toFixed(0)}% Off</span>
        <div className="flex w-full justify-center px-3 pt-10 lg:px-5 xl:px-5">
          <Image width={400} height={500} onErrorCapture={()=>setThumbnail('/no-image.webp')} src={thumbnail} className=" xl:w-54 h-auto w-[160px] lg:w-52" alt="refrigrator" />
        </div>
        {/* Remove Item */}
        <button type="button" onClick={(e) => removeFavorite(e)} className="absolute left-4 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-b3 md:h-8 md:w-8">
          <IoCloseSharp className="text-lg text-white md:text-xl" />
        </button>

        <div className="mx-5 my-5 flex flex-col gap-y-3 xl:mx-[37.41px]">
          <p className="text-line-camp font-reg text-sm font-semibold !leading-5 xl:text-base">{product.title}</p>
          <div className="flex">
            <span className="font-semibold text-b3">${product.is_sale ? product.sale_price : product.regular_price}</span>
            {product.is_sale ? (
              <div className="flex w-full items-center justify-end space-x-2">
                <strike className="text-[rgba(17,16,16,0.64)] maxmd:text-sm">${product.regular_price}</strike>
                <span className="rounded-xl bg-b4 px-2 py-1 text-[10px] font-semibold md:text-xs">- {(100 - (product.sale_price / product.regular_price) * 100).toFixed(0)}%</span>
              </div>
            ) : null}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1">
              <h4 className="text-xs font-semibold text-b15 md:text-sm">Condition</h4>
              <QuestionMarkCircleIcon onClick={() => handleCloseModal(product.condition)} strokeWidth={2} className={`h-5 w-5 cursor-pointer text-b16/50 hover:text-b3`} />
            </div>
            <div className="flex items-center">
              {/* <StarIconPrinter numberOfTimes={product.rating} /> */}
            </div>
            <div className={`inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase text-white ` + ConditionData().class}>
                  {ConditionData().slug === 'new' && <FourStar />}
                  {ConditionData().title}
             </div>
          </div>
          <div className="flex items-center space-x-10">
            <div className="flex text-xs font-semibold text-b15 md:text-sm">
              <h4>Discount</h4>&nbsp;%
            </div>
            <div className="grow rounded-lg bg-gray-100">
              <span className="flex h-2 w-20 rounded-lg bg-gradient-to-r from-b4 to-b7"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
