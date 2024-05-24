'use client';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Washer from './Product/CompleteLaundry/Washer';
import Drayer from './Product/CompleteLaundry/Drayer';
import Filter from './Product/CompleteLaundry/Filter';
import { FaQuestion } from 'react-icons/fa';
import { BsArrowRightShort } from 'react-icons/bs';
import Image from 'next/image';

const CompleteLaundary = ({ closeModal, subCategory }) => {
  const [type, setType] = useState(subCategory);
  const WASHER = '';
  const DRYER = '';
  const SUB_TOTAL = 20;

  const cartId = '';
  const [loading, setLoading] = useState(false);
  const ordInfo = '';
  const [orderInfo, setOrderInfo] = useState(ordInfo ? ordInfo : { type: 'pickup', location: 'Georgetown, Tx', shipping: 'Free' });

  const addToCart = async (e) => {
    e.preventDefault();
    if (WASHER && DRYER) {
      closeModal();
    }
  };

  const NotSelected = ({ title }) => {
    return (
      <div className="flex h-full w-full flex-col items-center gap-4">
        <h4 className="text-xl font-semibold">{title}</h4>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-b3 py-10">
          <div className="flex flex-col items-center space-y-3">
            <FaQuestion className="mb-4 text-4xl" />
            <div className="flex justify-center">
              <span className="flex items-center rounded-md bg-b7 px-4 py-3 text-xs font-bold text-white">
                <span>Choose A {title}</span>
                <BsArrowRightShort className="text-2xl" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Card = ({ image, title, not }) => {
    return (
      <div className="space-y-2 text-center">
        {not ? (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-b3">
            <FaPlus className="text-b3" />
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-b3">
            <Image width={400} height={400} quality={100} src={image} alt="p1" className="h-10 w-10 object-contain" />
          </div>
        )}
        <span className="text-sm font-medium text-b16">{title}</span>
      </div>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 !m-0 h-screen w-full overflow-y-auto bg-black/40 px-12 lg:px-20">
      <div className="mx-auto my-10 max-w-[1440px] rounded-3xl bg-white">
        <div className="relative mx-auto grid h-auto grid-cols-1 gap-60px  p-10 lg:p-14 3xl:p-60px ">
          <button type="button" onClick={closeModal} className="absolute -right-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-b3 p-1 text-white">
            <IoCloseOutline className="text-3xl" />
          </button>
          <div className="grid h-full w-full grid-cols-1 items-center justify-center gap-7 lg:grid-cols-[1fr_auto_1fr]">
            {/* Washer */}
            {WASHER ? <Washer /> : <NotSelected title="Washer" />}
            {/* ==== */}
            <div>
              <FaPlus className="mx-auto text-b3" />
            </div>
            {/* Drayer */}
            {DRYER ? <Drayer /> : <NotSelected title="Dryer" />}
            {/* ==== */}
          </div>
          <div className="grid grid-cols-2 overflow-hidden rounded-xl">
            <button onClick={() => setType('washer')} type="button" className={`${type === 'washer' ? 'bg-b11 ' : 'bg-b3 text-white'}  w-full p-4 font-bold `}>
              Washer
            </button>
            <button onClick={() => setType('dryer')} type="button" className={`${type === 'dryer' ? 'bg-b11' : 'bg-b3 text-white'} w-full p-4 font-medium`}>
              Dryers
            </button>
          </div>

          <div>
            <Filter type={type} />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-5 rounded-b-3xl bg-white p-10 text-b16 shadow-[0px_-4px_40px_0px_rgba(0,0,0,0.10)]">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="font-semibold">Selected Items</span>
              <div className="flex items-center gap-3">
                <span className="font-medium">{WASHER && DRYER ? '2 Items' : '1 Item'}</span>
                <div className="h-[18px] w-[1px] bg-[rgba(17,16,16,0.20)]"></div>
                <button onClick={() => dispatch(resetLaundary())} type="button" className="font-medium text-red-600">
                  Reset
                </button>
              </div>
            </div>
            <div className="flex gap-5">
              {WASHER ? <Card title="Washer" image={WASHER.media} /> : <Card title="Washer" not={true} />}
              {DRYER ? <Card title="Dryer" image={DRYER.media} /> : <Card title="Washer" not={true} />}
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-5 md:gap-10">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-black">Subtotal</h3>
              <p className="text-32px font-semibold text-black">${SUB_TOTAL}</p>
            </div>
            <div>
              <button onClick={(e) => addToCart(e)} type="button" className="flex w-full items-center justify-center gap-2 rounded-lg bg-b7 px-8 py-4 text-center text-white">
                <AiOutlineShoppingCart className="text-2xl" />
                Add Selected Items To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteLaundary;
