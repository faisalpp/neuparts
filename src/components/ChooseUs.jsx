import React from 'react';
import MapCards from '@/components/HowItworks/MapCards';

const ChooseUs = () => {
  return (
    <div className="bg-b8">
      <div className="maincontainer flex flex-col justify-center py-10 lg:py-16 xl:py-20 2xl:py-120px">
        <h2 className="mb-4 text-center text-2xl font-bold lg:text-3xl xl:text-4xl">Why Choose NeuPart?</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-2 xl:grid-cols-3">
          <MapCards white={true} icon="auto_awesome.webp" title="Fast Local Delivery & Installation" description="Facilisis sodales sollicitudin mi porttitor tellus non ornare pellentesque in nam sem porttitor nunc bibendum laoreet sodales sollicit." />
          <MapCards white={true} icon="auto_build.webp" title="Shop From Home" description="Facilisis sodales sollicitudin mi porttitor tellus non ornare pellentesque in nam sem porttitor nunc bibendum laoreet sodales sollicit." />
          <MapCards white={true} icon="auto_magic_exchange.webp" title="Up to Date LIVE Inventory!" description="Facilisis sodales sollicitudin mi porttitor tellus non ornare pellentesque in nam sem porttitor nunc bibendum laoreet sodales sollicit." />
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
