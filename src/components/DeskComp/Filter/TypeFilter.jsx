import React from 'react';
import DropDown from '@/components/DeskComp/Filter/DropDown';

const TypeFilter = ({ title, filters, setFilt, filt }) => {
  const totalProductCount = filters.reduce((sum, item) => sum + item.productCount, 0);

  const handleType = (e, cat) => {
    e.preventDefault();
    if (cat === 'all') {
      delete filt.category;
      delete filt.rating;
      setFilt((prev) => {
        return { ...prev };
      });
    } else {
      setFilt((prev) => {
        return { ...prev, category: cat };
      });
    }
  };

  return (
    <>
      <DropDown title={title}>
        <>
          <div className="flex text-sm hover:underline">
            <h4 onClick={(e) => handleType(e, 'all')} className="font-bold">
              All
            </h4>
            <div className="flex w-full justify-end text-xs">
              <span>({totalProductCount})</span>
            </div>
          </div>
          {filters
            ? filters.map((item, index) =>
                item.productCount > 0 ? (
                  <span key={index} onClick={(e) => handleType(e, item.slug)}>
                    <div className="flex text-sm hover:underline">
                      <h4 className="w-full">{item.title}</h4>
                      <div className="flex w-full justify-end text-xs">
                        <span>({item.productCount})</span>
                      </div>
                    </div>
                  </span>
                ) : null
              )
            : null}
        </>
      </DropDown>
    </>
  );
};

export default TypeFilter;
