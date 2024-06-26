'use client';
import React, { useState } from 'react';
import DropDown from '@/components/DeskComp/Filter/DropDown';
import { Checkbox } from '@material-tailwind/react';

const SaleFilter = ({ sale, setFilt }) => {
  const [saleChk, setSaleChk] = useState(true);
  const [regChk, setRegChk] = useState(false);

  const handleSaleChk = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      setSaleChk(true);
      setRegChk(false);
      setFilt((prev) => {
        return { ...prev, isSale: true };
      });
    } else {
      setSaleChk(false);
      setFilt((prev) => {
        return { ...prev, isSale: false };
      });
    }
  };

  const handleRegChk = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      setRegChk(true);
      setSaleChk(false);
      setFilt((prev) => {
        return { ...prev, isSale: false };
      });
    } else {
      setRegChk(false);
      setFilt((prev) => {
        return { ...prev, isSale: true };
      });
    }
  };

  return (
    <>
      <DropDown title="On Sale">
        <>
          {/* Item Start */}
          {sale?.length > 0 ? (
            <div className="flex items-center">
              <div className="label-p-0 flex items-center gap-2">
                <Checkbox name="sale" ripple={false} checked={true} onChange={(e) => handleSaleChk(e)} className="checked:bg-b3 checked:text-white" />
                <span className="flex w-max text-sm">Yes</span>
              </div>
              <div className="flex w-full justify-end text-xs">
                <span>({sale.length > 0 ? sale[0].count : null})</span>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* Item End */}
          {/* Item Start */}
          {/* {reg?.length > 0 ? (
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Checkbox name="sale" ripple={false} checked={regChk} onChange={(e) => handleRegChk(e)} className="checked:bg-b3 checked:text-white" />
                <span className="flex w-max text-sm">No</span>
              </div>
              <div className="flex w-full justify-end text-xs">
                <span>({reg.length > 0 ? reg[0].count : 0})</span>
              </div>
            </div>
          ) : (
            ''
          )} */}
          {/* Item End */}
        </>
      </DropDown>
    </>
  );
};

export default SaleFilter;
