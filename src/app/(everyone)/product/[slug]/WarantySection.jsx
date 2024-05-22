'use client';
import React, { useState } from 'react';
import WarantyCard from './WarantyCard';

const WarantySection = () => {
  const [products, setProducts] = useState([
    { icon: 'shield-security.webp', title: 'Neu Shield Warranty', description: 'Facilisis sodales sollicitudin mi porttitor tellus non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet.' },
    { icon: 'dollar.webp', title: 'Financing Option Available', description: 'Facilisis sodales sollicitudin mi porttitor tellus non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet sodales sollicitudin mi porttitor tellus. Nunc volutpat non ornare pellentesque in nam sem. Elementum porttitor nunc bibendum laoreet.' },
  ]);
  return (
    <div id="compare" className="bg-b8">
      <div className="maincontainer py-10 lg:py-16 xl:py-20 2xl:py-120px">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {products.map((item, index) => (
            <WarantyCard key={index} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WarantySection;
