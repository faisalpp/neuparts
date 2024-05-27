'use client';
import { useEffect } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart, AiOutlineTag } from 'react-icons/ai';
import { IoBagCheckOutline, IoCloseOutline, IoSettingsOutline } from 'react-icons/io5';
import { useState } from 'react';
import FaqAccordion from '@/components/FaqAccordion';
import ToolTip from '@/components/ToolTip';
import MoreImagesModal from '@/components/MoreImagesModal';
import StickyNavbar from '@/components/DeskComp/Navbar/StickyNavbar';
import CustomModal from '@/components/Modal/CustomModal';
import Loader from '@/components/Loader/Loader';
import LoopSection from '@/components/LoopSection';
import { format, getDate } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import FourStar from '@/components/svgs/FourStar';
import GasSvg from '@/components/svgs/GasSvg';
import ProductCompatible from '@/components/Product/ProductCompatible';
import MoreParts from './MoreParts';
import Rotate360Product from './Rotate360Product';
import ConditionReview from './ConditionReview';
import ProductSlider from './ProductSlider';
import CompatibleAppliance from './CompatibleAppliance';
import CompareModel from './CompareModel';
import BuyingOtherOptions from './BuyingOtherOptions';
import WarantySection from './WarantySection';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const Product = ({ slug }) => {
  // Get slug form url
  const [quantity, setQuantity] = useState(1);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [date, setDate] = useState({});

  const [deliveryPoints, setDeliveryPoints] = useState([
    { title: 'NeuShield <br /> 30-Day Warranty', image: '/svgs/shield-security.webp' },
    { title: 'Same Day Shipping on orders received before 1pm CST', image: '/svgs/local_shipping2.webp' },
    { title: 'Hassle Free 30 Day Returns', image: '/svgs/calendar_clock.webp' },
    { title: 'Fast 2-Day Shipping Available', image: '/svgs/package_2.webp' },
  ]);

  const router = useRouter();

  // const [product, setProduct] = useState([]);
  const [product, setProduct] = useState({
    productType: 'parent',
    title: 'Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for long text',
    slug: 'whirlpool-refrigerator-master',
    category: 'refrigerators',
    feature: 'ice-makers',
    type: 'french-door-refrigerator',
    color: 'white',
    brand: 'general-electronics',
    fuelType: '',
    regPrice: 250,
    salePrice: 200.5,
    isSale: true,
    rating: 3,
    stock: 82,
    modelNo: '123456',
    itemId: '654321',
    keyFeatures: [
      {
        title: '1st Feature',
        description: 'This is Refrigerator First Feature.',
        media: {
          file: 'image',
          type: 'url',
          data: '/popular-parts.webp',
          preview: '',
        },
      },
      {
        title: '2nd Feature',
        description: 'This second feature.',
        media: {
          file: 'image',
          type: 'url',
          data: '/popular-parts.webp',
          preview: '',
        },
      },
    ],
    featureVideo: {
      type: 'url',
      data: 'https://youtube.com/embed/IXgTwfaRiX8',
      prevImg: 'https://img.youtube.com/vi/IXgTwfaRiX8/mqdefault.jpg',
    },
    threeSixty: {
      type: 'url',
      data: 'https://teal-evangelia-50.tiiny.site',
      prevImg: 'https://img.youtube.com/vi/teal-evangelia-50.tiiny.site/mqdefault.jpg',
    },
    media: [
      {
        file: 'image',
        type: 'url',
        data: '/popular-parts.webp',
        preview: '/popular-parts.webp',
      },
      {
        file: 'image',
        type: 'url',
        data: '/popular-parts.webp',
        preview: '/popular-parts.webp',
      },
      {
        file: 'image',
        type: 'url',
        data: '/popular-parts.webp',
        preview: '/popular-parts.webp',
      },
      {
        file: 'image',
        type: 'url',
        data: '/popular-parts.webp',
        preview: '/popular-parts.webp',
      },
      {
        file: 'image',
        type: 'url',
        data: '/popular-parts.webp',
        preview: '/popular-parts.webp',
      },
      {
        file: 'image',
        type: 'url',
        data: '/popular-parts.webp',
        preview: '/popular-parts.webp',
      },
    ],
    bulletDescription: ['demo 1', 'demo 2', 'demo 3', 'demo 4', 'demo 5'],
    tags: [
      {
        id: 1,
        icon: '',
        name: '3 Door French Door',
        selected: true,
      },
      {
        id: 2,
        icon: 'rack',
        name: '3rd Rack',
        selected: false,
      },
      {
        id: 3,
        icon: '',
        name: '4 DOOR FLEX QUATRO',
        selected: false,
      },
      {
        id: 4,
        icon: '',
        name: '4 DOOR FLEX',
        selected: false,
      },
      {
        id: 5,
        icon: '',
        name: '4 DOOR FRENCH DOOR',
        selected: false,
      },
    ],
    description: '<p>thsi description</p>',
    specification: '<p>this is specification</p>',
    deliveryInfo: '<p>this is delivery info</p>',
    metaTitle: 'this meta title',
    metaDescription: 'this is meta description',
    metaKeywords: 'demo, refrigerator',
    subCategory: '',
  });
  const [otherProducts, setOtherProducts] = useState([
    {
      slug: 'test',
      title: 'Upper Rack for Dish Washers',
      condition: 'new',
      quantity: 1,
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
    {
      slug: 'whirlpool-refrigerator-master',
      title: 'Upper Rack for Dish Washers',
      condition: 'new-open-box',
      quantity: 0,
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
    {
      slug: 'whirlpool-refrigerator-master',
      title: 'Upper Rack for Dish Washers',
      condition: 'used',
      quantity: 2,
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
    {
      slug: 'whirlpool-refrigerator-master',
      title: 'Upper Rack for Dish Washers',
      condition: 'used',
      quantity: 2,
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      image: '/popular-parts.webp',
    },
  ]);

  const addToCart = async (e) => {
    router.push('/mycart');
    e.preventDefault();
  };

  useEffect(() => {
    GetProduct();
  }, []);

  const [mediaViewer, setMediaViewer] = useState({
    file: 'image',
    type: 'url',
    data: '/popular-parts.webp',
    preview: '/popular-parts.webp',
  });
  const [isFav, setIsFav] = useState(false);

  const GetProduct = async () => {};

  const [showNavbar, setShowNavbar] = useState(false);

  const handleScroll = () => {
    setShowNavbar(window.pageYOffset > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [imgModal, setImgModal] = useState(false);

  // All Modal

  const [openModal, setOpenModal] = useState('');

  const handleCloseModal = () => {
    setOpenModal('');
  };

  const moreImg = product.media ? product.media.find((item) => item.file === 'image') : null;

  // Tags Elements Extended End

  const handlePickupDate = () => {
    const currentDate = new Date();
    const dayOfWeek = format(currentDate, 'EEEE');
    const date = getDate(currentDate);
    const month = format(currentDate, 'MMMM');
    setDate({ day: dayOfWeek, date: date, month: month });
  };

  useEffect(() => {
    // if(pickupInfo.location !== pickupLocation){
    handlePickupDate();
    // }
  }, []);

  //  const [isFav,setIsFav] = useState(false)
  const [favLoad, setFavLoad] = useState(false);

  const handleFavorites = async (e) => {
    e.preventDefault();
  };

  const removeFavorite = async (e) => {
    e.preventDefault();
  };

  const [relatedProducts, setRelatedProducts] = useState([]);

  const GetRecentAppliances = async () => {};

  useEffect(() => {
    if (product.length > 0) {
      GetRecentAppliances();
    }
  }, [product]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* StickyNavabr */}
          <StickyNavbar addCart={addToCart} product={product} state={showNavbar} />

          <MoreImagesModal medias={product.media} state={imgModal} setState={setImgModal} />

          {/* All Modal */}
          <CustomModal subCategory={product.subCategory} openmodal={openModal} closeModal={handleCloseModal} />
          {/* End */}
          {/* Bread Crumbs Start */}
          <div className="maincontainer flex items-center py-10">
            <div className="flex items-center">
              <h5 className="text-xs text-b3">Home</h5>
              <RiArrowDropRightLine className="text-xl text-gray-500" />
              <h5 className="text-xs text-b3">Part Categories</h5>
              <RiArrowDropRightLine className="text-xl text-gray-500" />
              <h5 className="text-xs text-b3">Dishwashers</h5>
              <RiArrowDropRightLine className="text-xl text-gray-500" />
              <h5 className="text-xs text-b3">Racks & Trays</h5>
              <RiArrowDropRightLine className="text-xl text-gray-500" />
              <h5 className="text-xs text-gray-500">Lower Rack</h5>
            </div>
          </div>
          {/* Bread Crumbs End */}
          <div id="product-information" className="maincontainer mb-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:sticky lg:top-44 lg:col-span-5">
              <div className="flex gap-2 md:gap-5">
                <div className="flex h-full min-w-[70px] flex-col space-y-2 2xl:min-w-100px">
                  {product.media
                    ? product.media.slice(0, 4).map((media, index) => (
                        <>
                          <div key={index} className="relative grid h-[70px] w-[70px] cursor-pointer place-items-center rounded-lg border-[1px] border-gray-300 px-2 py-1 2xl:h-100px 2xl:w-100px" onClick={() => setMediaViewer({ file: media.file, data: media.data, thumbnail: media.preview ? media.preview : '' })}>
                            <Image width={200} height={200} quality={100} src={media.data} className="w-10 2xl:w-20" alt="product" />
                          </div>
                        </>
                      ))
                    : null}
                  {product.media?.length > 4 ? (
                    <div className="relative h-[70px] w-[70px] cursor-pointer rounded-lg border-[1px] border-blue-400 px-2 py-1 2xl:h-100px 2xl:w-100px">
                      <div onClick={() => setImgModal(true)} className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-b3/70 font-semibold text-white">
                        +4
                      </div>
                      <Image width={200} height={200} quality={100} src={moreImg ? moreImg.data : null} className="h-16 w-10 2xl:w-20" alt="product" />
                    </div>
                  ) : null}
                </div>
                <div className="relative flex w-full items-center justify-center rounded-lg border-[1px] border-gray-300 px-2 py-10 lg:h-96 2xl:h-auto 2xl:py-14">
                  {mediaViewer.file === 'image' ? <Image width={200} height={200} quality={100} src={mediaViewer.data} alt="" className="h-auto w-48" /> : null}
                  {/* {mediaViewer.file === 'video' && mediaViewer.type === 'url' ? <Iframe style="w-full h-full" src={mediaViewer.data} title="Modal Video" icon="text-5xl" frameId={`video-frame-modal-${(Math.random() * 100) / 5}`} divId={`video-frame-modal-wrapper-${(Math.random() * 100) / 5}`} thumbnail={mediaViewer.thumbnail} /> : null}
                  {mediaViewer.file === 'video' && mediaViewer.type === 'upload' ? <video className="h-2/3 w-11/12 rounded-2xl" controls src={mediaViewer.data} /> : null} */}
                </div>
              </div>
              <div className="mt-10 flex flex-col items-center justify-center gap-y-3">
                {product.description ? <FaqAccordion parser="true" title="Appliance Description" parent="w-full [&>div]:py-4 [&>div]:px-6 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0" icon="text-xl" textStyle="font-bold text-sm" child="[&>p]:text-sm !mt-0" answer={product.description} chevrown /> : null}
                {product.specification ? <FaqAccordion parser="true" title="Specifications" parent="w-full [&>div]:py-4 [&>div]:px-6 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0" icon="text-xl" textStyle="font-bold text-sm" child="[&>p]:text-sm !mt-0" answer={product.specification} chevrown /> : null}
                {product.deliveryInfo ? <FaqAccordion parser="true" title="Delivery Info" parent="w-full [&>div]:py-4 [&>div]:px-6 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0" icon="text-xl" textStyle="font-bold text-sm" child="[&>p]:text-sm !mt-0" answer={product.deliveryInfo} chevrown /> : null}
              </div>
            </div>

            <div className="mt-4 flex flex-col space-y-5 px-1 lg:col-span-7 lg:mt-0 lg:px-0">
              <h2 className="line-clamp-2 text-2xl font-bold leading-8 lg:w-full">{product.title}</h2>
              <div className="flex w-full items-center justify-between">
                <Link href={`/products/buying-options/?modelNo=${product.modelNo}`} className="cursor-pointer text-xs font-bold text-b3 underline lg:w-80 lg:text-sm">
                  View More Buying Options ↓
                </Link>
              </div>
              <div className="flex gap-5 whitespace-nowrap sm:items-center maxsm:flex-col">
                <div className="flex items-center gap-5">
                  <h4 className="text-xl font-bold text-b3 lg:text-3xl ">${product.isSale ? product.salePrice : product.regPrice}</h4>
                  {product.isSale ? <strike className="text-lg">${product.regPrice}</strike> : null}
                </div>
                <div className="flex items-center gap-5 sm:w-full sm:justify-between lg:flex-wrap">
                  {product.isSale ? <span className="flex rounded-2xl bg-b4 px-3 py-2 text-[10px] font-semibold text-black lg:text-xs">${product.regPrice - product.salePrice} Savings</span> : null}
                  {isFav ? (
                    <button onClick={(e) => removeFavorite(e)} className="flex items-center justify-end text-b3 hover:underline">
                      <AiFillHeart className={`${favLoad ? 'animate-bounce' : null}`} />
                      <span>Favorite</span>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => handleFavorites(e)} className="flex items-center justify-end text-b3 hover:underline">
                      <AiOutlineHeart className={`${favLoad ? 'animate-bounce' : null}`} />
                      <span>Add to favorites</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-5 lg:mt-4 lg:space-x-5">
                <div className="flex items-center gap-2">
                  <h4 className="w-max text-base font-semibold text-b16/50">
                    Part <br /> Number
                  </h4>
                  <IoSettingsOutline className="ml-2 text-base text-b16/50" />
                </div>
                <span className="text-base font-semibold text-b1">LGWM0L2CRV2T2</span>
              </div>
              <div className="mt-2 flex items-center space-x-5 lg:mt-4 lg:space-x-5">
                <div className="flex items-center gap-1">
                  <h4 className="w-max text-base font-semibold text-b16/50">Condition</h4>
                  <ToolTip color="text-b16/50" />
                </div>
                <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                  <FourStar />
                  New
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-5 rounded-lg border border-b3 bg-b3/10 p-4 lg:mt-4 lg:space-x-5">
                <div className="flex items-center gap-1">
                  <h4 className="w-max pr-3 text-base font-semibold text-b16/50">Type</h4>
                  <AiOutlineTag className="ml-2 h-5 w-5 text-b3" />
                </div>
                <span className="text-base font-semibold text-b1">Aftermarket Replacement Part</span>
              </div>
              {product.isSale ? (
                <div className="mt-2 hidden items-center gap-4 lg:flex">
                  <div className="flex text-sm font-semibold text-b16/50">
                    <h4>Discount</h4>
                  </div>
                  <div className="w-52 rounded-lg bg-gray-200">
                    <span className="flex h-3 w-40 rounded-lg bg-gradient-to-r from-b4 to-b7"></span>
                  </div>
                  <div className="flex items-center justify-center rounded-full bg-b7 px-5 py-2 text-white">
                    <GasSvg /> 30% Off
                  </div>
                </div>
              ) : null}
              <div className="rounded-lg p-4 shadow-[0px_4px_24px_rgba(0,0,0,0.08)]">
                <div className="mb-4 flex flex-wrap items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label htmlFor="" className="text-xs">
                      Quantity
                    </label>
                    <div className="relative w-24">
                      <button type="button" onClick={() => setQuantity(quantity - 1)} className={`absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-full text-sm font-medium leading-3 text-white ${quantity === 1 ? 'pointer-events-none bg-b3/25 text-gray-400' : 'bg-b3'}`}>
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <input type="number" value={quantity} className="remove-arrow h-10 w-24 rounded-full bg-[#F3F3F3] px-8 text-center text-sm font-semibold text-black outline-none hover:border-b3/90" />
                      <button type="button" onClick={() => setQuantity(quantity + 1)} className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-b3 text-sm font-medium leading-3 text-white">
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {product.stock > 0 ? (
                    <div className="flex items-center rounded-full bg-b13 px-3 py-2 text-xs text-white">
                      <IoBagCheckOutline className="mr-1 text-sm" />2 in stock In Georgetown, TX
                    </div>
                  ) : (
                    <div className="flex items-center rounded-full bg-red-500 px-3 py-2 text-xs text-white">
                      <IoCloseOutline className="mr-1 text-sm" />
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" disabled={error || product.stock === 0 ? true : false} onClick={addToCart} className="button-hover flex h-full w-full items-center justify-center rounded-lg py-4 font-medium text-white">
                    <AiOutlineShoppingCart className="text-lg" />
                    <span className="ml-2 flex items-center font-medium">Add To Cart {loading2 ? <Image width={200} height={200} quality={100} alt="loader" src="/loader-bg.gif" className="ml-2 h-4 w-4" /> : null}</span>
                  </button>
                  <button type="button" disabled={error || product.stock === 0 ? true : false} onClick={addToCart} className="flex h-full w-full items-center justify-center rounded-lg bg-[#071822] py-4 font-medium text-white hover:bg-[#071822]/90">
                    <Image width={100} height={100} className="h-6 w-5 object-contain" alt="Sell" src="/svgs/sell.webp" />
                    <span className="ml-2 flex items-center font-medium">Buy Now {loading2 ? <Image width={200} height={200} quality={100} alt="loader" src="/loader-bg.gif" className="ml-2 h-4 w-4" /> : null}</span>
                  </button>
                </div>
              </div>

              {/* Product Compatibilty */}
              <ProductCompatible />

              <div className="flex flex-wrap items-center gap-2">
                {deliveryPoints.map((item, index) => (
                  <div key={index} className="flex h-full max-w-52 items-center space-x-3 rounded-lg border-[1px] border-b3 px-3 py-2 text-left">
                    <Image width={200} height={200} quality={100} className="h-auto w-full max-w-[18px]" src={item.image} alt={item.title} />
                    <span className="text-[10px] font-medium" dangerouslySetInnerHTML={{ __html: item.title }}></span>
                  </div>
                ))}
              </div>

              {/* Other Product Section */}
              <BuyingOtherOptions slug={slug} otherProducts={otherProducts} modelNo={product.modelNo} />
            </div>
          </div>

          {/* 360 Degree Product Section */}
          <Rotate360Product />

          <CompatibleAppliance />

          {/* <MoreParts /> */}

          {/* Review */}
          <ConditionReview />

          {/* <ProductSlider /> */}

          <CompareModel />

          <LoopSection />

          <WarantySection />
        </>
      )}
    </>
  );
};

export default Product;
