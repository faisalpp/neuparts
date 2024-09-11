'use client';
import React, { useState, useEffect } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import ProductCard from '@/components/MyAccount/ProductCard';
import { BiLoaderAlt } from "react-icons/bi";
import BtnLoader from '@/components/Loader/BtnLoader';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const MyFavourite = () => {
  const UserId = useSelector((state)=>state.auth.id)

  const [favorites, setFavorites] = useState([]);
  const [favLoader, setFavLoader] = useState(false);

  const GetFavorite = async () => {
    setFavLoader(true)
    fetch('/api/front/favorite', {method: 'POST',headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId:UserId}),
    }).then((res)=> res.json())
    .then((data)=>{
      console.log(data.favorites)
      setFavorites(data.favorites)
      setFavLoader(false)
    }).catch((error)=>{
      setFavLoader(false)
    })
  };

  useEffect(() => {
    GetFavorite();
  }, []);

  return (
    <>
      <MyAccount>
        {favLoader ? (
          <div className="flex items-center justify-center h-full">
            <BiLoaderAlt className='text-4xl animate-spin' />
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
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:gap-10 2xl:grid-cols-3">
          {data.map((item, index) => (
            <ProductCard key={index} Id={item._id} product={item.item} reload={refresh} />
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
