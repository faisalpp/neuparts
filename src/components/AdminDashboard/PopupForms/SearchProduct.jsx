import React, { useState } from 'react';
import TextInput from '../../TextInput/TextInput';
import Popup from '../Popup';
import Table from '../Table/Table';
import Link from 'next/link';
import Toast from '../../../utils/Toast';
import { BiSearchAlt2 } from 'react-icons/bi';
import { searchOrderByTitleOrModel } from '../../../api/admin/order';
import BtnLoader from '../../Loader/BtnLoader';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../../../store/adminSlice';
import { setSubTotal } from '../../../store/adminCart';

const SearchProduct = ({ sstate, setsState, SelectProduct }) => {
  const [searchResult, setSearchResult] = useState([]);
  const SearchRow = ({ id, image, title, model, salePrice, regularPrice, stock, type, rating, isSale }) => {
    const dispatch = useDispatch();
    const cartId = useSelector((state) => state?.admin?.cart?._id);

    const AddProduct = async (e) => {
      e.preventDefault();
      const res = await dispatch(AddToCart({ cartId: cartId, productId: id }));
      // console.log(res.payload.price)
      if (res.payload.status === 200) {
        dispatch(setSubTotal(res.payload.price));
        Toast('Product Added!', 'success', 1000);
        setSearchResult([]);
        setsState(false);
      } else if (res.payload.status === 500) {
        Toast(res.res.payload.data.message, 'error', 1000);
      } else {
        Toast('Internal Server Error!', 'error', 1000);
      }
    };

    return (
      <tr className="border-b border-l border-r border-b6 text-xs font-semibold">
        <td className="flex justify-center whitespace-nowrap px-5 py-3">
          <img src={image.find((item) => item.file === 'image').data} className="w-10" />
        </td>
        <td className="px-5 py-3">
          <Link href={`/product/${title.toLowerCase().replace(/\s/g, '-')}`} className="text-b6 underline">
            {title}
          </Link>
        </td>
        <td className="whitespace-nowrap px-5 py-3">#{model}</td>
        <td className="whitespace-nowrap px-5 py-3 capitalize ">{type}</td>
        <td className="whitespace-nowrap px-5 py-3 text-b7 ">${salePrice}</td>
        <td className="whitespace-nowrap px-5 py-3 text-b7 ">${regularPrice}</td>
        <td className="whitespace-nowrap px-5 py-3">{stock}</td>
        <td className="whitespace-nowrap px-5 py-3 text-red-500">
          {stock > 0 ? (
            <button type="button" onClick={(e) => AddProduct(e)} className="rounded-md bg-b6 px-3 py-1 text-white">
              +
            </button>
          ) : (
            <span type="button" className="rounded-md bg-red-500 px-3 py-1 text-[10px] text-white">
              Out of Stock
            </span>
          )}
        </td>
      </tr>
    );
  };

  const NoRow = ({ message }) => {
    return (
      <tr className="border-b border-l border-r border-b6 text-xs font-semibold">
        <td className="px-2 py-2">{message}</td>
      </tr>
    );
  };

  const [errors, setErrors] = useState([]);
  const [sTitle, setStitle] = useState('');
  const [sModel, setSmodel] = useState('');

  const [loading, setLoading] = useState({ type: '', status: false });

  const searchProduct = async (e, query, type) => {
    e.preventDefault();
    if (query === '') {
      Toast('Query Required!', 'error', 1000);
      return;
    }
    setLoading({ type: type, status: true });
    const res = await searchOrderByTitleOrModel({ query: query, type: type });
    if (res.status === 200) {
      setLoading({ type: '', status: false });
      setSearchResult(res.data.result);
    } else {
      setLoading({ type: '', status: false });
      Toast(res.data.message, 'error', 1000);
    }
  };

  return (
    <Popup zindex="z-[99]" width="w-9/12" state={sstate} setState={setsState}>
      <div className="flex w-full flex-col items-center space-y-3">
        <h3 className="font-semibold">Add Product</h3>
        <div className="flex w-full items-center space-x-2">
          <div className="mt-5 flex w-full items-center space-x-1">
            <TextInput disabled={sModel !== '' ? true : false} value={sTitle} onChange={(e) => setStitle(e.target.value)} width="full" title="Search By Title" iscompulsory="false" type="text" error={errors && errors.includes('Title is Required!') ? true : false} errormessage="Title is Required!" placeholder="Whirlpool Refrigerator" />
            <button type="button" onClick={(e) => searchProduct(e, sTitle, 'title')} className="mt-6 h-10 rounded-lg bg-b6 px-2 py-1 text-sm text-white">
              {loading.status && loading.type === 'title' ? <BtnLoader style="w-4" /> : <BiSearchAlt2 />}
            </button>
          </div>
          <div className="mt-5 flex h-fit w-full items-center space-x-1">
            <TextInput disabled={sTitle !== '' ? true : false} width="full" title="Search By Model #" value={sModel} onChange={(e) => setSmodel(e.target.value)} iscompulsory="false" type="text" error={errors && errors.includes('Title is Required!') ? true : false} errormessage="Title is Required!" placeholder="8342-D10M02Y2024" />
            <button type="button" onClick={(e) => searchProduct(e, sModel, 'model')} className="mt-6 h-10 rounded-lg bg-b6 px-2 py-1 text-sm text-white">
              {loading.status && loading.type === 'model' ? <BtnLoader style="w-4" /> : <BiSearchAlt2 />}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Search Results</h3>
          <div className="hf-72 mt-1 flex flex-col overflow-x-hidden overflow-y-scroll rounded-md border-[1px] border-b31 px-2">
            {/* Seach Result Card Start */}
            <Table head={['Image', 'Title', 'Model #', 'Type', 'Sale Price', 'Regular Price', 'Stock', 'Action']}>{searchResult?.length > 0 ? searchResult?.map((product) => <SearchRow rating={product.rating} id={product._id} image={product.media} title={product.title} model={product.modelNo} regularPrice={product.regPrice} salePrice={product.salePrice} type={product.productType} stock={product.stock} isSale={product.isSale} />) : <NoRow message="No Products Found!" />}</Table>
            {/* Seach Result Card End */}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default SearchProduct;
