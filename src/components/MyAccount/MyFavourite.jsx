'use client';
import React, { useState, useEffect } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import ProductCard from '@/components/MyAccount/ProductCard';
import BtnLoader from '@/components/Loader/BtnLoader';
import Image from 'next/image';

const MyFavourite = () => {
  const userId = '';
  const [favorites, setFavorites] = useState([]);
  const [favLoader, setFavLoader] = useState(false);

  const GetFavorite = async () => {
    // setFavLoader(true)
    // const res = await GetFavorites({userId:userId})
    // if(res.status === 200){
    // setFavLoader(false)
    // setFavorites(res.data.favorites)
    // }else{
    // setFavLoader(false)
    // }
  };

  useEffect(() => {
    GetFavorite();
  }, []);

  return (
    <>
      <MyAccount>
        {favLoader ? (
          <div className="flex items-center justify-center">
            <BtnLoader />
          </div>
        ) : (
          <MyFavouriteData data={favorites} refresh={GetFavorite} />
        )}
      </MyAccount>
    </>
  );
};

export default MyFavourite;

const MyFavouriteData = ({ data, refresh }) => {
  return (
    <>
      {data?.length > 0 ? (
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:gap-10 2xl:grid-cols-3">
          {data.map((item, index) => (
            <ProductCard key={index} data={item} reload={refresh} />
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <Image width={400} height={400} quality={100} alt="Not Found" src="/not-found.webp" className="h-auto w-32" />
        </div>
      )}
    </>
  );
};

export { MyFavouriteData };
