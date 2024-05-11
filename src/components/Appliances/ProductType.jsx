import React from 'react';
import DropDown from './DropDown/DropDown';
import Link from 'next/link';

const ProductSection = ({ productstype, onClose, isFilter }) => {
  const handleFilterClick = (event) => {
    event.stopPropagation();
  };
  const modalClass = isFilter ? 'maxlg:flex top-0 maxlg:bottom-0' : 'maxlg:-bottom-[420px] maxlg:opacity-0 maxlg:pointer-events-none';

  const CosRatingMenu = ({ menu, k }) => (
    <ul className="flex flex-col gap-3">
      {k
        ? menu[k].map((item, index) => (
            <li key={index}>
              <Link href={item.link} className="text-sm text-b22">
                {item.name}
              </Link>
            </li>
          ))
        : null}
    </ul>
  );
  return (
    <div className={`items-end duration-300 lg:sticky lg:top-10 lg:h-full lg:w-[320px] maxlg:fixed maxlg:left-0 maxlg:right-0 maxlg:z-50 maxlg:bg-black/20 ${modalClass}`} onClick={onClose}>
      <div className="w-full rounded-2xl border border-gray-300 lg:h-auto lg:px-6 lg:pb-6 lg:pt-2 maxlg:max-h-[398px] maxlg:overflow-y-auto maxlg:rounded-tl-2xl maxlg:rounded-tr-2xl maxlg:bg-white maxlg:pb-10 [&>div]:maxlg:px-10" onClick={handleFilterClick}>
        <div className="top-0 z-50 flex items-center justify-end border-b lg:hidden lg:pb-4 maxlg:sticky maxlg:bg-white maxlg:py-4 maxlg:shadow-md">
          <button onClick={onClose} className="rounded px-2 py-1 text-sm font-semibold duration-300 hover:bg-black/5 lg:hidden">
            Close
          </button>
        </div>
        {productstype
          ? productstype.map((product, index) => (
              <DropDown title={Object.keys(product)} color="text-b22" key={index}>
                <CosRatingMenu menu={product} k={Object.keys(product)} />
              </DropDown>
            ))
          : null}
      </div>
    </div>
  );
};

export default ProductSection;
