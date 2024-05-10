import React from 'react';
import ProductType from './ProductType';
import ProductCard from './ProductCard';
import RelatedProducts from './RelatedProducts';
import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';
import FilterSvg from '../../svgs/FilterSvg';
import { AiOutlineArrowRight } from 'react-icons/ai';
import CarotSvg from '../../svgs/CarotSvg';

const ProductSection = ({ menu, data, category }) => {
  const [isFilter, setIsFilter] = useState(false);
  const handleCloseFilter = () => {
    setIsFilter(false);
  };

  return (
    <div>
      <div className="maincontainer flex h-full justify-center gap-4 py-10 lg:gap-8 maxlg:flex-col">
        {/* FIlter Button For Mobile Screen */}
        <div className="flex items-center gap-2">
          <button className="ml-auto flex w-full items-center justify-center gap-2 rounded-lg border border-b3 px-3 py-3 text-sm font-semibold lg:hidden" onClick={() => setIsFilter(true)}>
            All Categories <CarotSvg />
          </button>
          <button className="ml-auto flex w-full items-center justify-center gap-2 rounded-lg border border-b3 px-3 py-3 text-sm font-semibold lg:hidden" onClick={() => setIsFilter(true)}>
            <FilterSvg /> Filters
          </button>
        </div>
        {/* End FIlter Button */}
        <ProductType productstype={menu} onClose={handleCloseFilter} isFilter={isFilter} />

        <div className="flex h-full w-full flex-col gap-60px">
          {/* Cosmatic Rating */}

          {data.map((section) => (
            <>
              {section.cardStyle === 'rating-card' ? (
                <div>
                  <h3 className="mt-10 text-2xl font-bold text-b18 lg:text-base lg:font-semibold maxlg:text-center">{section.title}</h3>
                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {section.sectionItemsId.map((product, index) => (
                      <NavLink key={index} to={`/appliances/?category=${category.toLowerCase().replace(/\s/g, '-').replace('&', '%26')}&rating=${product.rating}`}>
                        <ProductCard key={product.title} title={product.title} image={product.image} rating={product.rating} />
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Product Styles */}
              {section.cardStyle === 'general-card' ? (
                <div>
                  <RelatedProducts title={section.title} />
                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {section.sectionItemsId.map((product, index) => (
                      <NavLink key={index} to={`/appliances/?category=${category.toLowerCase()}&${section.type}=${product.title.toLowerCase().replace(/\s/g, '-')}`}>
                        <ProductCard key={product.title} title={product.title} image={product.image} />
                      </NavLink>
                    ))}
                  </div>
                  <Link href="" className="mt-6 flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-b3 px-4 py-3 text-base font-medium text-b3 duration-300 hover:gap-2 lg:hidden">
                    <span>View More</span>
                    <AiOutlineArrowRight className="text-base" />
                  </Link>
                </div>
              ) : null}
              {section.cardStyle === '2xn-card' ? (
                <div>
                  <RelatedProducts title={section.title} />
                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
                    {section.sectionItemsId.map((product, index) => (
                      <NavLink key={index} to={`/appliances/?category=${category.toLowerCase()}&${section.type}=${product.title.toLowerCase().replace(/\s/g, '-')}`}>
                        <ProductCard key={product.title} title={product.title} image={product.image} />
                      </NavLink>
                    ))}
                  </div>
                  <Link href="" className="mt-6 flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-b3 px-4 py-3 text-base font-medium text-b3 duration-300 hover:gap-2 lg:hidden">
                    <span>View More</span>
                    <AiOutlineArrowRight className="text-base" />
                  </Link>
                </div>
              ) : null}

              {section.cardStyle === 'brand-card' ? (
                <div>
                  <RelatedProducts title={section.title} />
                  <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {section.sectionItemsId.map((product, index) => (
                      <NavLink key={index} to={`/appliances/?category=${category.toLowerCase()}&${section.type}=${product.title.toLowerCase().replace(/\s/g, '-')}`}>
                        <ProductCard key={product.title} brandname={product.title} brandimage={product.image} />
                      </NavLink>
                    ))}
                  </div>
                  <Link href="" className="mt-6 flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-b3 px-4 py-3 text-base font-medium text-b3 duration-300 hover:gap-2 lg:hidden">
                    <span>View More</span>
                    <AiOutlineArrowRight className="text-base" />
                  </Link>
                </div>
              ) : null}

              {section.cardStyle === 'color-card' ? (
                <div>
                  <RelatedProducts title={section.title} />
                  <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {section.sectionItemsId.map((product, index) => (
                      <NavLink key={index} to={`/appliances/?category=${category.toLowerCase()}&${section.type.replace(/\&/, 'and')}=${product.title.toLowerCase().replace(/\s/g, '-')}`}>
                        <ProductCard key={product.title} colorname={product.title} colorimage={product.image} />
                      </NavLink>
                    ))}
                  </div>
                  <Link href="" className="mt-6 flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-b3 px-4 py-3 text-base font-medium text-b3 duration-300 hover:gap-2 lg:hidden">
                    <span>View More</span>
                    <AiOutlineArrowRight className="text-base" />
                  </Link>
                </div>
              ) : null}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
