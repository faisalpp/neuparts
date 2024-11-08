import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Tag from '@/components/svgs/Tag';
import ProductCard from '@/components/Product/ProductCard';
import { addToFavoriteUser, removeFromFavoriteUser } from '@/app/GlobalRedux/slices/Favorite';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ApplianceGrid = ({ isGrid, product }) => {
  const [thumbnail, setThumbnail] = useState(product?.thumbnail ? product.thumbnail : '/no-image.webp');

  const [favLoad, setFavLoad] = useState(false);
  const UserId = useSelector((state) => state.auth.id);
  const Favorites = useSelector((state) => state.favorite.items) || [];

  const handleFavorites = async (e) => {
    e.preventDefault();
    setFavLoad(true);
    if (UserId) {
      const resp = await dispatch(addToFavoriteUser({ userId: UserId, productId: product._id }));
      if (resp.payload.success) {
        toast.success('Product added into favorites!');
      } else {
        toast.error('Adding to favorite failed!');
      }
      setFavLoad(false);
    } else {
      toast.info('Login required!');
      setFavLoad(false);
    }
  };

  const RemoveFavorite = async (e) => {
    e.preventDefault();
    setFavLoad(true);
    if (UserId) {
      const getFav = Favorites.find((fav) => fav.favId === product._id);
      const resp = await dispatch(removeFromFavoriteUser({ _id: getFav._id }));
      if (resp.payload.success) {
        toast.success('Product removed from favorites!');
      } else {
        toast.error('Removing favorite failed!');
      }
      setFavLoad(false);
    } else {
      toast.info('Login required!');
      setFavLoad(false);
    }
  };

  return (
    <>
      {isGrid ? (
        <ProductCard product={product} />
      ) : (
        <div className="flex w-full items-center space-x-2 rounded-2xl border-[1px] border-gray-200 px-2 py-5 lg:space-x-10 lg:px-8 lg:py-10">
          {/* <div className="relative w-44 coxs:w-52"> */}
          <Link href={`/product/${product.slug}`}>
            <Image width={400} height={400} quality={100} onErrorCapture={() => setThumbnail('/no-image.webp')} src={thumbnail} alt={product.title} className="h-auto w-[124px] object-contain md:h-60 md:w-60 md:p-4 maxxs:w-[80px]" />
          </Link>
          {/* </div> */}

          <div className="flex w-[60%] flex-col gap-3 px-1 lg:px-5 3xl:w-[55%]">
            {Favorites.some((fav) => fav.favId === product._id) ? (
              <button onClick={(e) => RemoveFavorite(e)} className="my-2 flex w-full text-b3 hover:underline">
                <AiFillHeart className={`h-6 w-6 ${favLoad ? 'animate-bounce text-red-500' : null}`} /> Favorite
              </button>
            ) : (
              <button type="button" onClick={(e) => handleFavorites(e)} className="my-2 flex w-full text-b3 hover:underline">
                <AiOutlineHeart className={`h-6 w-6 ${favLoad ? 'animate-bounce' : null}`} /> Add to favorites
              </button>
            )}
            <Link href={`/product/${product.slug}`}>
              <h3 className="line-clamp-2 text-sm font-semibold lg:text-lg 3xl:text-xl">{product.title}</h3>
            </Link>

            <div className="flex items-center gap-1 coxs:gap-2 maxxs:flex-wrap">
              <span className="w-[74px] text-xs font-semibold leading-4 text-b1 sm:w-[87.1px] sm:text-sm">
                Part <br /> Number
              </span>
              <Tag />
              <div className="inline-flex rounded-full border border-black px-3 py-1 text-xs font-medium text-b1">{product.part_number}</div>
            </div>
            <div className="flex items-center gap-1 coxs:gap-2 maxxs:flex-wrap">
              <span className="text-xs font-semibold text-b1 sm:text-sm">Price Range</span>
              <Tag />
              <div className="inline-flex rounded-full bg-b3 px-1 py-1 text-xs font-medium text-white sm:px-3">
                ${product.sale_price} - ${product.regular_price}
              </div>
            </div>
            <Link href={`/product/${product.slug}/buying-options`} className="flex items-center font-semibold text-b3 underline maxsm:text-sm">
              {product.partCount} Buying Options →
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplianceGrid;
