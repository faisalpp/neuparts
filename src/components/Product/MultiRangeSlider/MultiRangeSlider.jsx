import React, { useCallback, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './multiRangeSlider.css';
import DropDown from '@/components/DeskComp/Filter/DropDown';
import { useRouter } from 'next/navigation';

const MultiRangeSlider = ({ min, max }) => {
  const router = useRouter();
  const defaultMinval = 200;
  const defaultMaxval = 8000;
  const [minVal, setMinVal] = useState(defaultMinval);
  const [maxVal, setMaxVal] = useState(defaultMaxval);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  let queryParams;
  const handleButtonCLick = () => {
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search);
      queryParams = getPriceQueryParams(queryParams, 'min', minVal);
      queryParams = getPriceQueryParams(queryParams, 'max', maxVal);

      const path = window.location.pathname + '?' + queryParams.toString();
      router.push(path);
    }
  };

  const getPriceQueryParams = (queryParams, key, value) => {
    const hasValueParams = queryParams.has(key);
    if (value && hasValueParams) {
      queryParams.set(key, value);
    } else if (value) {
      queryParams.append(key, value);
    } else if (hasValueParams) {
      queryParams.delete(key);
    }
    return queryParams;
  };

  useEffect(() => {
    setTimeout(() => {
      handleButtonCLick();
    }, 1500);
  }, [minVal, maxVal]);

  return (
    <DropDown title="Price">
      <div className="relative w-full pb-8" id="priceSlider">
        <div className="mb-5 flex w-full items-center gap-2">
          <input
            type="number"
            value={minVal}
            onKeyDown={(event) => {
              const value = Math.min(Math.max(+event.target.value, min), max);
              setMinVal(value);
            }}
            className="m-0 w-[45%] rounded-md border border-[#C9C9C9] px-4 py-2 text-b16 outline-none"
          />
          <span>-</span>
          <input
            type="number"
            value={maxVal}
            onKeyDown={(event) => {
              const value = Math.min(Math.max(+event.target.value, min), max);
              setMaxVal(value);
            }}
            className="m-0 w-[45%] rounded-md border border-[#C9C9C9] px-4 py-2 text-b16 outline-none"
          />
        </div>
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={10}
            value={minVal}
            ref={minValRef}
            onChange={(event) => {
              const value = Math.min(+event.target.value, maxVal - 1);
              setMinVal(value);
              event.target.value = value.toString();
            }}
            className={classnames('thumb thumb--zindex-3', {
              'thumb--zindex-5': minVal > max - 100,
            })}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            ref={maxValRef}
            onChange={(event) => {
              const value = Math.max(+event.target.value, minVal + 1);
              setMaxVal(value);
              event.target.value = value.toString();
            }}
            className="thumb thumb--zindex-4"
          />

          <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
            <div className="absolute left-1 right-1 top-4 flex justify-between text-xs">
              <div className="">{min}</div>
              <div className="">99</div>
              <div className="">999</div>
              <div className="">{max}</div>
            </div>
          </div>
        </div>
      </div>
    </DropDown>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
