'use client';
import { useEffect } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { AiFillStar, AiOutlineDollarCircle, AiOutlineSearch, AiFillCloseCircle, AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { IoBagCheckOutline, IoCloseOutline, IoSettingsOutline } from 'react-icons/io5';
import { GoDotFill } from 'react-icons/go';
import { BsTruck, BsShopWindow, BsStarHalf, BsArrowRightShort } from 'react-icons/bs';
import { useState } from 'react';
import OtherProductCard from '@/components/OtherProductCard';
import FaqAccordion from '@/components/FaqAccordion';
import HiwSection from '@/components/HiwSection';
import NewProductCards from '@/components/NewProductCards';
import PaymentOptions from '@/components/PaymentOptions';
import ProductFeatures from '@/components/ProductFeatures';
import LaunderySet from '@/components/LaunderySet';
import MapSection from '@/components/MapSection';
import InspectionScoreSection from '@/components/InspectionScoreSection';
import ModelBuyingOptionsSection from '@/components/ModelBuyingOptionsSection';
// next
import ProductFaqSection from '@/components/ProductFaqSection';
import CosmaticSlider from '@/components/CosmaticSlider';
import ToolTip from '@/components/ToolTip';
import MoreImagesModal from '@/components/MoreImagesModal';
import StickyNavbar from '@/components/DeskComp/Navbar/StickyNavbar';
import CustomModal from '@/components/Modal/CustomModal';
import TruckSvg from '@/components/svgs/TruckSvg';
import Loader from '@/components/Loader/Loader';
import { format, getDate } from 'date-fns';
import Popup from '@/components/Popup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FourStar from '@/components/svgs/FourStar';
import GasSvg from '@/components/svgs/GasSvg';
import MoreParts from './MoreParts';

const Product = ({ slug }) => {
  // Get slug form url
  const route = useRouter();
  const ordInfo = '';
  const [orderInfo, setOrderInfo] = useState(ordInfo ? ordInfo : { type: 'pickup', location: 'Georgetown, Tx', shipping: 'Free' });
  const [zip, setZip] = useState('');
  const [changeZip, setChangeZip] = useState(true);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // const [product, setProduct] = useState([]);
  const [product, setProduct] = useState({
    productType: 'parent',
    title: 'Whirlpool Refrigerator Master',
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
  const [threeStar, setThreeStar] = useState([]);
  const [fourStar, setFourStar] = useState([]);
  const [fiveStar, setFiveStar] = useState([]);

  const cartId = '';

  const PRODUCTS = [];

  const addToCart = async (e) => {
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

  const CheckFavorite = async () => {};

  const [childKeyFeatures, setChildKeyFeatures] = useState({});
  const GetProduct = async () => {};

  const [zipLoading, setZipLoading] = useState(false);

  const Submit = async () => {};

  useEffect(() => {
    if (zip.length === 5) {
      Submit();
    }
  }, [zip]);

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

  const handleOpenModal = (modal) => {
    setOpenModal(modal);
  };

  const handleCloseModal = () => {
    setOpenModal('');
  };

  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-lg text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="mt-2 flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  const moreImg = product.media ? product.media.find((item) => item.file === 'image') : null;

  // Tags Elements Extended Start
  const ExtendTag = ({ name, selected }) => {
    return (
      <>
        {name === 'top-refrigerator-bottom-freezer' ? (
          <div className="flex h-fit w-fit cursor-pointer flex-col items-center rounded-md border-[1px] border-[rgba(0,0,0,0.15)] px-2 py-2 hover:shadow-md">
            <h5 className="text-[9px] font-medium">TOP REFRIGERAOTR</h5>
            <span className="flex h-[1px] w-full bg-[rgba(0,0,0,0.15)]"></span>
            <h5 className="text-[9px] font-medium">BOTTOM FREEZER</h5>
          </div>
        ) : null}
        {name === 'top-freezer-bottom-refrigerator' ? (
          <div className="flex h-fit w-fit cursor-pointer flex-col items-center rounded-md border-[1px] border-[rgba(0,0,0,0.15)] px-2 py-2 hover:shadow-md">
            <h5 className="text-[9px] font-medium">TOP FREEZER</h5>
            <span className="flex h-[1px] w-full bg-[rgba(0,0,0,0.15)]"></span>
            <h5 className="text-[9px] font-medium">BOTTOM REFRIGERAOTR</h5>
          </div>
        ) : null}
      </>
    );
  };
  // Tags Elements Extended End

  const [date, setDate] = useState({});

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

  const isUser = '';
  const userId = '';
  const isAdmin = '';
  const adminId = '';
  const handleFavorites = async (e) => {
    e.preventDefault();
  };

  const removeFavorite = async (e) => {
    e.preventDefault();
  };

  const [isBulletPopup, setIsBulletPopup] = useState(false);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const GetRecentAppliances = async () => {};

  useEffect(() => {
    if (product.length > 0) {
      GetRecentAppliances();
    }
  }, [product]);
  return (
    <>
      <Popup state={isBulletPopup} setState={setIsBulletPopup}>
        <div className="w-full">
          <div className="flex w-full justify-center">
            <h3 className="text-center font-semibold">Description</h3>
          </div>
          <div className="flex h-52 w-full overflow-x-hidden overflow-y-scroll px-5">
            <ul className="mt-5 flex list-disc flex-col space-y-2 text-sm">
              {product.bulletDescription?.length > 0
                ? product.bulletDescription?.map((bullet, index) => (
                    <li key={index} className="text-base font-normal">
                      {bullet}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </Popup>
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
                            {/* {media.file === 'image' ? (
                              <>
                                <div onClick={() => setMediaViewer({ file: media.file, type: media.type, data: media.data, thumbnail: media.preview ? media.preview : '' })} className="absolute h-16 w-10 cursor-pointer bg-transparent"></div>
                                <Image width={200} height={200} quality={100} src={media.data} className="w-10 2xl:w-20" alt="product" />
                              </>
                            ) : null} */}
                            {/* {media.file === 'video' && media.type === 'url' ? (
                              <>
                                <div onClick={() => setMediaViewer({ file: media.file, type: media.type, data: media.data, thumbnail: media.preview ? media.preview : '' })} className="absolute z-10 h-10 w-10 cursor-pointer bg-transparent"></div>
                                <Iframe style="w-10 2xl:w-20 h-10" thumbRounded="false" src={media.data} title="Modal Video" icon="text-xl" frameId={`video-frame-general-modal-${(Math.random() * 100) / 5}`} divId={`general-video-frame-modal-wrapper-${(Math.random() * 100) / 5}`} thumbnail={media.preview} />
                              </>
                            ) : null}
                            {media.file === 'video' && media.type === 'upload' ? (
                              <>
                                <div onClick={() => setMediaViewer({ file: media.file, type: media.type, data: media.data, thumbnail: media.preview ? media.preview : '' })} className="absolute h-10 w-10 cursor-pointer bg-transparent"></div>
                                <video className="w-10 rounded-2xl 2xl:w-20" controls src={media.data} />
                              </>
                            ) : null} */}
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
              <h2 className="text-2xl font-bold leading-8 md:text-3xl lg:w-full xl:text-[2rem]">{product.title}</h2>
              <div className="flex w-full items-center justify-between">
                <div className="flex w-full">
                  {product.stock > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="flex items-center rounded-full bg-b13 px-3 py-2 text-xs text-white">
                        <IoBagCheckOutline className="mr-1 text-sm" />
                        In Stock
                      </span>
                      <span className="text-xs text-b16/65">Only 2 left</span>
                    </div>
                  ) : (
                    <span className="flex items-center rounded-full bg-red-500 px-3 py-2 text-xs text-white">
                      <IoCloseOutline className="mr-1 text-sm" />
                      Out of Stock
                    </span>
                  )}
                </div>
                <Link href={`/products/buying-options/?modelNo=${product.modelNo}`} className="cursor-pointer text-xs font-bold text-b3 underline lg:w-80 lg:text-sm">
                  View More Buying Options
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
                    <button onClick={(e) => handleFavorites(e)} className="flex items-center justify-end text-b3 hover:underline">
                      <AiOutlineHeart className={`${favLoad ? 'animate-bounce' : null}`} />
                      <span>Add to favorites</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-5 lg:mt-4 lg:space-x-5">
                <div className="flex items-center gap-2">
                  <h4 className="w-max text-xs font-semibold text-b16/50 lg:text-sm">
                    Part <br /> Number
                  </h4>
                  <IoSettingsOutline className="ml-2 text-base text-b16/50" />
                </div>
                <span className="text-lg font-bold text-b1 xl:text-xl">LGWM0L2CRV2T2</span>
              </div>
              <div className="mt-2 flex items-center space-x-5 lg:mt-4 lg:space-x-5">
                <div className="flex items-center gap-1">
                  <h4 className="w-max text-xs font-semibold text-b16/50 lg:text-sm">Condition</h4>
                  <ToolTip color="text-b16/50" />
                </div>
                <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                  <FourStar />
                  New
                </div>
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

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="" className="text-xs">
                    Quantity
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenModal('1')} className="flex w-fit items-center space-x-3 rounded-lg border-[1px] border-b3 px-3 py-2 text-left">
                    <Image width={200} height={200} quality={100} className="h-auto w-full max-w-[18px]" src="/shield.webp" alt="" />
                    <span className="w-40 text-sm font-bold">
                      NeuShield 1 <br /> Year Warranty
                    </span>
                  </button>
                  <button onClick={() => handleOpenModal('1')} className="flex w-fit items-center space-x-3 rounded-lg border-[1px] border-b3 px-3 py-2 text-left">
                    <TruckSvg />
                    <span className="w-40 text-sm font-bold">
                      Available for <br /> Delivery/Pickup
                    </span>
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button type="button" disabled={error || product.stock === 0 ? true : false} onClick={addToCart} className="button-hover flex h-full w-full items-center justify-center rounded-lg py-4 font-bold text-white">
                  <AiOutlineShoppingCart className="text-lg" />
                  <span className="ml-2 flex items-center font-bold">Add To Cart {loading2 ? <Image width={200} height={200} quality={100} alt="loader" src="/loader-bg.gif" className="ml-2 h-4 w-4" /> : null}</span>
                </button>
                <button type="button" disabled={error || product.stock === 0 ? true : false} onClick={addToCart} className="flex h-full w-full items-center justify-center rounded-lg bg-[#071822] py-4 font-bold text-white hover:bg-[#071822]/90">
                  <AiOutlineShoppingCart className="text-lg" />
                  <span className="ml-2 flex items-center font-bold">Buy Now {loading2 ? <Image width={200} height={200} quality={100} alt="loader" src="/loader-bg.gif" className="ml-2 h-4 w-4" /> : null}</span>
                </button>
              </div>

              {/* Other Product Section */}
              <div className=" rounded-lg py-5">
                <div class="mb-3 flex items-center justify-between">
                  <h6 className="font-bold">Product Buying Options</h6>
                  <Link href={`/products/buying-options/?modelNo=${product.modelNo}`} className="flex items-center text-sm text-b3 hover:underline">
                    View All <BsArrowRightShort />
                  </Link>
                </div>
                <div className="mt-4 flex grid-cols-3 flex-col items-center space-y-4 lg:mt-0 lg:grid lg:gap-x-5 lg:space-y-0">
                  {threeStar ? <OtherProductCard slug={slug} product={threeStar} rating={3} /> : <OtherProductCard slug={slug} disabled="true" disabledImg={moreImg} rating={3} />}
                  {fourStar ? <OtherProductCard slug={slug} product={fourStar} rating={4} /> : <OtherProductCard slug={slug} disabled="true" disabledImg={moreImg} rating={4} />}
                  {fiveStar ? <OtherProductCard slug={slug} product={fiveStar} rating={5} /> : <OtherProductCard slug={slug} disabled="true" disabledImg={moreImg} rating={5} />}
                </div>
              </div>
            </div>
          </div>

          {/* 360 Degree Product Section */}
          <div className="rounded-3xl border border-b14">
            <div id="360-view" className="maincontainer flex flex-col items-center gap-5 py-10 lg:py-14 xl:py-20 ">
              <h4 className="text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl">360° View of This Appliance</h4>
              <div className="relative mb-5 mt-5 w-full">
                <Image width={400} height={400} quality={100} src="/popular-parts.webp" alt="product" className="mx-auto h-auto w-[17rem]" />
                <div className="absolute -bottom-5 left-0 right-0">
                  <Image width={400} height={400} quality={100} src="/360angle.webp" alt="product" className="mx-auto h-auto w-80" />
                </div>
              </div>
              <p className="font-normal">
                Rotate <b>360°</b> to see the product from all angles
              </p>
              <div className="border-gray-[rgba(0,0,0,0.08)] flex w-full rounded-2xl border-2 md:w-2/3 xl:w-1/2">
                <div className="flex w-full flex-col items-center border-r-[1px] border-gray-300">
                  <h5 className="w-full border-b-[1px] border-gray-300 py-4 text-center text-sm font-semibold sm:text-base">#ID</h5>
                  <h5 className="flex w-full items-center justify-center gap-1 border-b border-gray-300 py-4 text-center text-sm sm:text-base">
                    <span className="font-semibold">Cosmetic Rating </span>
                    <ToolTip color="text-b3" />
                  </h5>
                  <h5 className="flex w-full items-center justify-center border-b border-gray-300 py-4 text-center text-sm font-semibold sm:text-base">Model Number</h5>
                  <h5 className="flex w-full items-center justify-center gap-1 py-4 text-center text-sm font-semibold sm:text-base">
                    <span>Warranty</span> <ToolTip color="text-b3" />
                  </h5>
                </div>
                <div className="flex w-full flex-col items-center border-l-[1px] border-white">
                  <h5 className="w-full border-b-[1px] border-gray-300 py-4 text-center font-normal">#12354567876</h5>
                  <div className="flex w-full items-center justify-center border-b border-gray-300 py-[15px]">
                    <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                      <FourStar />
                      New
                    </div>
                  </div>
                  <div className="w-full border-b-[1px] border-gray-300 py-4 text-center font-normal">WF45B6300AC</div>
                  <div className="flex w-full items-center justify-center space-x-2 border-gray-300 py-3">
                    <div className="flex items-center justify-center space-x-1 rounded-md border border-gray-300 py-1 pl-2 pr-2 sm:pr-8">
                      <Image width={200} height={200} quality={100} className="h-6 w-6" src="/nueshield.webp" alt="nueshield" />
                      <span className="w-full break-words text-xs font-medium ">
                        NeuShield <br /> 1 Year Warranty
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shop With Confidnce */}
              <div className="mx-auto mt-6 flex max-w-[930px] flex-col gap-4 rounded-3xl border-2 border-b3 bg-b3/5 p-5 sm:p-8 lg:mt-10">
                <h3 className="text-xl font-medium sm:text-2xl">Shop With Confidence.</h3>
                <p className="">The item in the pictures above is the item you will receive. Scratch and dent appliances are all unique, so we include 360° pictures and videos for every item we stock. Rotate the picture to Inspect the appliance&apos;s cosmetic condition.</p>
              </div>
            </div>
          </div>

          <MoreParts />

          {/* Review */}
          <div className="maincontainer flex flex-col bg-white py-10 lg:py-14 xl:py-20">
            <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-b8 py-8">
              <div className="mt-2 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                <FourStar />
                New
              </div>
              <h3 className="text-[22px]">
                <span className="font-bold">Condition:</span> <span className="font-medium">Brand New</span>{' '}
              </h3>
              <p className="text-[22px] font-medium">What To Expect</p>
              {product.rating === 3 ? <p className="px-10 text-center text-sm">If you are shopping for bargains you are in the right place! 3-star rated appliances get you an open box appliance that works perfectly, with moderate cosmetic damage like scratches or dents at the largest discounted price we offer. Customers purchasing 3 star appliances capitalize on our deepest discounts in exchange for larger cosmetic blemishes while still obtaining a 100% functional appliance.</p> : null}
              {product.rating === 4 ? <p className="px-10 text-center text-sm">Our 4 Star line is for Austin&apos;s savviest shoppers! 4-star rated appliances get you an open box appliance that works perfectly, with minor to moderate cosmetic damage like scratches or dents at a great discount. Customers purchasing 4 star cosmetic Cosmetic Rating appliances are generally more accepting of more minor cosmetic blemishes for a deeper discount on the item while still obtaining a 100% functional appliance.</p> : null}
              {product.rating === 5 ? <p className="px-10 text-center text-sm">If your shopping our 5 star appliances then you understand the value of a good deal! 5-star rated appliances get you an open box appliance that works perfectly, with very minor to no cosmetic damage like scratches or dents at a great discount. Our customers purchasing 5 star Cosmetic Cosmetic Rating appliances are generally looking for like new or new appliances while capitalizing on an open box discount vs a &quot;Scratch or Dent&quot; discounted appliance while still obtaining a 100% functional appliance.</p> : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
