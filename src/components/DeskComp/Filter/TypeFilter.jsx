import React from 'react';
import DropDown from '@/components/DeskComp/Filter/DropDown';

const TypeFilter = ({ filters, setFilt, filt }) => {
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
      <DropDown title="Appliance Type">
        <>
          <div className="flex text-sm hover:underline">
            <h6 onClick={(e) => handleType(e, 'all')}>All</h6>
            <div className="flex w-full justify-end text-xs">
              <span>({totalProductCount})</span>
            </div>
          </div>
          {filters
            ? filters.map((item, index) =>
                item.productCount > 0 ? (
                  <span key={index} onClick={(e) => handleType(e, item.slug)}>
                    <div className="flex text-sm hover:underline">
                      <h6 className="w-full ">{item.title}</h6>
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
