import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import CosmatingRatingSlider from './Product/CosmatingRatingSlider';
import Link from 'next/link';

const CompleteLaundary = ({ closeModal }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 !m-0 h-screen w-full overflow-y-auto bg-black/40 px-12 lg:px-20 xl:px-12 2xl:px-20">
      <div className="mx-auto my-10 max-w-[1440px] rounded-3xl bg-white">
        <div className="relative mx-auto grid h-auto grid-cols-1 gap-6 px-4 py-10 sm:p-10 ">
          <button type="button" onClick={closeModal} className="absolute -right-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-b3 p-1 text-white">
            <IoCloseOutline className="text-3xl" />
          </button>
          <h2 className="text-center text-xl font-bold text-black lg:text-2xl xl:text-3xl 2xl:text-4xl">Cosmetic Rating: What does it mean?</h2>
          <p className="mx-auto w-full max-w-[929px] text-center font-bold leading-6 text-black">All condition appliances are tested and confirmed to operate like new. We grade our scratch and dent appliances based on their cosmetic appearance. These scores refer to how the appliance looks not how they function.</p>
          {/* <CosmatingRatingSlider /> */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:mt-14 xl:grid-cols-3 xl:gap-[10px]">
            <CosmatingRatingSlider title="Cosmetic Rating" codmetics="Moderate" dicount="Massive" stars={3} type={1} discount={1} />
            <CosmatingRatingSlider title="Cosmetic Rating" codmetics="Minor" dicount="Huge" stars={4} type={2} discount={2} />
            <CosmatingRatingSlider title="Cosmetic Rating" codmetics="Very Minor-None" dicount="Great" stars={5} type={3} discount={3} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <button type="button" onClick={closeModal} className="w-36 rounded-md bg-b3 p-3 text-center font-semibold text-white">
              OK
            </button>
            <Link href="" className="w-36 rounded-md p-4 text-center font-semibold text-b3">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteLaundary;
