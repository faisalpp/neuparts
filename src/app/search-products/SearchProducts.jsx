'use client'
import React, { useEffect } from 'react'
import ProductCard3 from '@/components/ProductCard3'
import ProductFilter from '@/components/Product/FIlter'
import { useState } from 'react'
import { RiArrowDropRightLine } from 'react-icons/ri';
import { FaBars } from 'react-icons/fa';
import { BsGrid, BsChevronDown } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SearchProducts = () => {
    const [categoriesFilters, setCategoriesFilters] = useState([])
    const [ratingFilters, setRatingFilters] = useState([])
    const [saleFilter, setSaleFilter] = useState({})
    const [regularFilter, setRegularFilter] = useState({})
    const [products, setProducts] = useState([])
    const [isGrid, setIsGrid] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const [params, setParams] = useState({})

    useEffect(() => {
        // Create a URLSearchParams object from the query string
        const queryParams = new URLSearchParams(router.search);
        // Create an object to store the query parameters
        const queryParamsObject = {};

        // Iterate through the query parameters and store them in the object
        for (const [key, value] of queryParams.entries()) {
            queryParamsObject[key] = value;
        }

        const isSale = { isSale: false }
        setParams({ ...isSale, ...queryParamsObject })
    }, [router.search])

    const handleCloseFilter = () => {
        setIsFilter(false);
    };

    return (
        <>
            {/* Bread Crumbs Start */}
            <div className='flex items-center mt-5 py-5 maincontainer' >
                <div className='flex items-center' ><h5 className='text-xs text-blue-400' >Home</h5><RiArrowDropRightLine className='text-xl text-gray-500' /><h5 className='text-xs text-gray-400' >Products</h5></div>
                <div className='flex items-center space-x-5 w-full justify-end' ><BsGrid className='cursor-pointer' onClick={() => setIsGrid(true)} /><FaBars className='cursor-pointer' onClick={() => setIsGrid(false)} /></div>
                <button className='ml-5 text-sm font-semibold flex gap-2 items-center lg:hidden' onClick={() => setIsFilter(true)}>
                    Filters <BsChevronDown className='text-xs stroke-1' />
                </button>
            </div>
            {/* Bread Crumbs End */}

            <div className='flex justify-center gap-12 xl:gap-x-60px maincontainer' >

                {/* Filters Start */}
                <ProductFilter query={params} setQuery={setParams} saleFilter={saleFilter} regularFilter={regularFilter} categoriesFilters={categoriesFilters} ratingFilters={ratingFilters} onClose={handleCloseFilter} isFilter={isFilter} />
                {/* Filters End */}

                <div className={`grid ${isGrid ? 'lg:grid-cols-3 grid-cols-1 lg:gap-x-2' : 'grid-cols-1'} gap-y-5 mb-10 w-full`} >
                    {loading ? <div className='flex items-center justify-center w-full' ><Image width={400} height={400} alt="loader" src="/loader2.gif" className="w-20 h-20" /></div> : null}
                    {products?.length === 0 ? <div className='flex items-center justify-center w-full' ><Image width={400} height={400} alt="Not fpound" src="/not-found.webp" className='w-40 h-40' /></div> : null}
                    {products?.length > 0 && !loading ? products.map((product, index) => <ProductCard3 key={index} product={product} isGrid={isGrid} />) : null}

                </div>

            </div>
        </>
    )
}

export default SearchProducts
