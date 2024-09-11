'use client';
import { useEffect } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart, AiOutlineTag } from 'react-icons/ai';
import { IoBagCheckOutline, IoCloseOutline, IoSettingsOutline } from 'react-icons/io5';
import { BiLoaderAlt } from 'react-icons/bi';
import { useState } from 'react';
import FaqAccordion from '@/components/FaqAccordion';
import ToolTip from '@/components/ToolTip';
import MoreImagesModal from '@/components/MoreImagesModal';
import StickyNavbar from '@/components/DeskComp/Navbar/StickyNavbar';
import Loader from '@/components/Loader/Loader';
import LoopSection from '@/components/LoopSection';
import Link from 'next/link';
import Image from 'next/image';
import FourStar from '@/components/svgs/FourStar';
import GasSvg from '@/components/svgs/GasSvg';
import ProductCompatible from '@/components/Product/ProductCompatible';
import CustomModal from '@/components/Modal/CustomModal';
import MoreParts from './MoreParts';
import Rotate360Product from './Rotate360Product';
import ConditionReview from './ConditionReview';
import CompatibleAppliance from './CompatibleAppliance';
import CompareModel from './CompareModel';
import BuyingOtherOptions from './BuyingOtherOptions';
import WarantySection from './WarantySection';
import { MinusIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/app/GlobalRedux/slices/CartSlice';
import { useRouter } from 'next/navigation';
import {addToFavoriteUser,removeFromFavoriteUser} from '@/app/GlobalRedux/slices/Favorite'
import {toast} from 'react-toastify'


const Product = ({ slug }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const conditions = [
    {
      title: 'New',
      slug: 'new',
      class: 'bg-dark-light-cyan',
      description: 'This appliance replacement part is brand new. We partner with manufacturers and distributor to offer our customers the best price possible for our appliance parts. We stock many new parts for many appliance manufacturers including: Samsung, Whirlpool, Electrolux, Maytag, Roper, Amana, Ge, Frigidaire, LG, Haier, Kenmore, Viking, Hisense and many more!',
      lists: ['This appliance replacement part is brand new.', 'We partner with manufacturers and distributor to offer our customers the best price possible for our appliance parts.', 'We stock many new parts for many appliance manufacturers including: Samsung, Whirlpool, Electrolux, Maytag, Roper, Amana, Ge, Frigidaire, LG, Haier, Kenmore, Viking, Hisense and many more!'],
    },
    {
      title: 'New / Open Box',
      slug: 'new-open-box',
      class: 'bg-dark-light-cyan',
      description: 'Like New / Open Box appliance parts may not arrive in their original packaging. COSMETICALLY  these parts are similar to a new parts however, some very minor Cosmetic damage may exist from their “Open Box” state.  Any moderate or major COSMETIC damage would be indicated and represented in a lower condition grade. All Like New / Open Box parts are MECHANICALLY  inspected and tested to verify their functionality is 100% within manufacturer specifications. Like New / Open Box parts are a great way to save money, we liquidate these parts at big discounts compared to new parts. Expect to have a similar condition to a new part at a larger discount. ',
      lists: ['Like New / Open Box appliance replacement parts may not arrive in their original packaging', '<b>COSMETICALLY</b>  these parts are similar to a new parts however, some very minor Cosmetic damage may exist from their “Open Box” state.', 'Any moderate or major <b>COSMETIC</b> damage would be indicated and represented in a lower condition grade.', 'All Like New / Open Box parts are <b>MECHANICALLY</b> inspected and tested to verify their functionality is 100% within manufacturer specifications.', 'Like New / Open Box parts are a great way to save money, we liquidate these parts at big discounts compared to new parts.', 'Expect to have a similar condition to a new part at a larger discount.'],
    },
    {
      title: 'Certified Refurbished',
      slug: 'certified',
      class: 'bg-dark-cyan',
      description: 'Certified Refurbished appliance parts are typically previously used parts that have been inspected refurbished to manufacturer specifications if needed. COSMETICALLY  these parts may show signs of wear or use.  These parts will not include major COSMETIC damage.  All Certified Refurbished parts are MECHANICALLY inspected and tested to verify their functionality is 100% within manufacturer specifications. Certified Refurbished appliance parts are a great way to save money, we liquidate these parts at big discounts compared to new parts. Expect to have a similar condition to a new part at a larger discount. ',
      lists: ['Certified Refurbished appliance parts are typically previously used parts that have been inspected refurbished to manufacturer specifications if needed.', '<b>COSMETICALLY</b> these parts may show signs of wear or use.', 'These parts will not include major <b>COSMETIC</b> damage.', 'All Certified Refurbished parts are MECHANICALLY inspected and tested to verify their functionality is 100% within manufacturer specifications.', 'Certified Refurbished appliance parts are a great way to save money, we liquidate these parts at big discounts compared to new parts.', 'Expect to have a similar condition to a new part at a larger discount.'],
    },
    {
      title: 'Used • Grade A',
      slug: 'used-grade-a',
      class: 'bg-[#FF9A3E]',
      description: 'Our A Grade Used parts are the bargain shopper’s best friend. We save our customer big bucks with our used Parts. We grade the COSMETIC appearance of each used part A, B, C, or D. A being the best cosmetic rating and D being the worst. The lower the grade, the bigger the discount! All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications. Our grading system is based on their COSMETIC appearance (how they look) not on their functionality. Each Used part comes with its own set of pictures so you can see any signs of use or imperfections. Expect to see very little to no signs of use or other Cosmetic imperfections. Although they may show signs of cosmetic wear, they will function like new.',
      lists: ['Our A Grade Used parts are the bargain shopper’s best friend.', 'We grade the COSMETIC appearance of each used part A, B, C, or D.', 'The lower the grade, the bigger the discount!', 'All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications.', 'Our grading system is based on their COSMETIC appearance (how they look) not on their functionality.', 'Each Used part comes with its own set of pictures so you can see any signs of use or imperfections.', 'Expect to see very little to no signs of use or other Cosmetic imperfections.', 'Although they may show signs of cosmetic wear, they will function like new.'],
    },
    {
      title: 'Used • Grade B',
      slug: 'used-grade-b',
      class: 'bg-[#FF9A3E]',
      description: 'Used B Grade Parts are an incredible value and one of the core reasons why our customers love what we do. We save our customer big bucks with our used Parts. We grade the COSMETIC appearance of each used part A, B, C, or D. A being the best cosmetic rating and D being the worst. The lower the grade, the bigger the discount! All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications. Our grading system is based on their COSMETIC appearance (how they look) not on their functionality. Each Used part comes with its own set of pictures so you can see any signs of use or imperfections. Expect to see very little to medium signs of use or other Cosmetic imperfections. Although they may show signs of cosmetic wear, they will function like new.',
      lists: ['Used B Grade Parts are an incredible value and one of the core reasons why our customers love what we do.', 'We grade the COSMETIC appearance of each used part A, B, C, or D.', 'The lower the grade, the bigger the discount!', 'All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications.', 'Our grading system is based on their COSMETIC appearance (how they look) not on their functionality.', 'Each Used part comes with its own set of pictures so you can see any signs of use or imperfections.', 'Expect to see very little to medium signs of use or other Cosmetic imperfections.', 'Although they may show signs of cosmetic wear, they will function like new.'],
    },
    {
      title: 'Used • Grade C',
      slug: 'used-grade-c',
      class: 'bg-[#FF9A3E]',
      description: 'If you’re looking to save money, Used C grade appliance parts are a great tool to do so. We save our customer big bucks with our used Parts. We grade the COSMETIC appearance of each used part A, B, C, or D. A being the best cosmetic rating and D being the worst. The lower the grade, the bigger the discount! All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications. Our grading system is based on their COSMETIC appearance (how they look) not on their functionality. All Used parts are verified to work as intended based on Manufacturer specifications. Each Used part comes with its own set of pictures so you can see any signs of use or imperfections. Expect to see Medium to Heavy signs of use or other Cosmetic imperfections. Although they may show signs of cosmetic wear, they will function like new.',
      lists: ['Used C grade appliance parts are a great tool to save money.', 'We grade the COSMETIC appearance of each used part A, B, C, or D.', 'The lower the grade, the bigger the discount!', 'All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications.', 'Our grading system is based on their COSMETIC appearance (how they look) not on their functionality.', 'All Used parts are verified to work as intended based on Manufacturer specifications.', 'Each Used part comes with its own set of pictures so you can see any signs of use or imperfections.', 'Expect to see Medium to Heavy signs of use or other Cosmetic imperfections.', 'Although they may show signs of cosmetic wear, they will function like new.'],
    },
    {
      title: 'Used • Grade D',
      slug: 'used-grade-d',
      class: 'bg-[#FF9A3E]',
      description: 'These parts include the deepest discounts we have available. We save our customer big bucks with our used Parts. We grade the COSMETIC appearance of each used part A, B, C, or D. A being the best cosmetic rating and D being the lowest. The lower the grade, the bigger the discount! All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications. Our grading system is based on their COSMETIC appearance (how they look) not on their functionality. All Used parts are verified to work as intended based on Manufacturer specifications. Each Used part comes with its own set of pictures so you can see any signs of use or imperfections. Expect to see Heavy signs of use or other Cosmetic imperfections. Although they may show signs of cosmetic wear, they will function like new.',
      lists: ['These parts include the deepest discounts we have available.', 'We grade the COSMETIC appearance of each used part A, B, C, or D.', 'The lower the grade, the bigger the discount!', 'All used parts are inspected, tested, and ensured to operate 100% to Manufacturer Specifications.', 'Our grading system is based on their COSMETIC appearance (how they look) not on their functionality.', 'All Used parts are verified to work as intended based on Manufacturer specifications.', 'Each Used part comes with its own set of pictures so you can see any signs of use or imperfections.', 'Expect to see Heavy signs of use or other Cosmetic imperfections.', 'Although they may show signs of cosmetic wear, they will function like new.'],
    },
  ];

  // Get slug form url
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [partscount, setPartsCount] = useState(0);
  const [partproducts, setPartProducts] = useState({});
  const [buyingOptions, setBuyingOptions] = useState([]);

  const FetchProduct = async () => {
    fetch(`/api/front/product/single?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPartsCount(data.partCount);
          setProduct(data.product);
          setStock(data.product.stock);
          setPartProducts([...data.partproducts, ...data.partproducts]);
          setBuyingOptions(data.buyingOptions);
          setLoading(false);
        } else {
          router.push('/404');
        }
      });
  };

  useEffect(() => {
    FetchProduct();
  }, []);

  const cartId = useSelector((state) => state.cart.cartId);
  //add to cart
  const AddToCart = async () => {
    setCartLoading(true);
    const res = await dispatch(addToCart({ productId: product._id, cartId: cartId, quantity: quantity, cartRender: true }));
    if (res.payload.success) {
      setCartLoading(false);
      setStock(res.payload.stock);
    } else {
      setCartLoading(false);
    }
  };

  const [deliveryPoints, setDeliveryPoints] = useState([
    { title: 'NeuShield <br /> 30-Day Warranty', image: '/svgs/shield-security.webp' },
    { title: 'Same Day Shipping on orders received before 1pm CST', image: '/svgs/local_shipping2.webp' },
    { title: 'Hassle Free 30 Day Returns', image: '/svgs/calendar_clock.webp' },
    { title: 'Fast 2-Day Shipping Available', image: '/svgs/package_2.webp' },
  ]);

  const [mediaViewer, setMediaViewer] = useState({
    file: 'image',
    type: 'url',
    data: '/popular-parts.webp',
    preview: '/popular-parts.webp',
  });

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

  const UserId = useSelector((state)=>state.auth.id)
  const Favorites = useSelector((state)=>state.favorite.items)

  const [favLoad, setFavLoad] = useState(false);
  const [activeCondition, setActiveCondition] = useState({});

  const handleFavorites = async (e) => {
    e.preventDefault();
    setFavLoad(true)
    if(UserId){
      const resp = await dispatch(addToFavoriteUser({userId:UserId,productId:product._id}))
      if(resp.payload.success){
        toast.success('Product added into favorites!')
      }else{
        toast.error('Adding to favorite failed!')
      }
      setFavLoad(false)
    }else{
      toast.info('Login required!')
      setFavLoad(false)    
    }
  };

  const RemoveFavorite = async (e) => {
    e.preventDefault();
    setFavLoad(true)
    if(UserId){
      const getFav = Favorites.find((fav)=> fav.favId === product._id)
      const resp = await dispatch(removeFromFavoriteUser({_id:getFav._id}))
      if(resp.payload.success){
        toast.success('Product removed from favorites!')
      }else{
        toast.error('Removing favorite failed!')
      }
      setFavLoad(false) 
    }else{
      toast.info('Login required!')
      setFavLoad(false)    
    }
  };

  // Match condition
  const ConditionData = (cond) => {
    return conditions.find((item) => item.slug === (cond ? cond : product?.condition));
  };

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = (cond) => {
    setOpenModal(!openModal);
    if (cond) {
      setActiveCondition(ConditionData(cond));
    }
  };


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* StickyNavabr */}
          <div className="hidden lg:block">
            <StickyNavbar addCart={AddToCart} product={product} state={showNavbar} condition={ConditionData} />
          </div>

          <MoreImagesModal medias={product.images} state={imgModal} setState={setImgModal} />

          {/* All Modal */}
          <CustomModal data={activeCondition} openModal={openModal} closeModal={handleCloseModal} />
          {/* End */}
          {/* Bread Crumbs Start */}
          <div className="maincontainer flex items-center py-10">
            <div className="flex flex-wrap items-center">
              <h5 className="text-xs text-b3">Home</h5>
              <RiArrowDropRightLine className="text-xl text-gray-500" />
              <h5 className="text-xs text-b3">Part Categories</h5>
              <RiArrowDropRightLine className="text-xl text-gray-500" />
              <h5 className="text-xs text-b3">{product.category?.title}</h5>
              <RiArrowDropRightLine className="text-xl text-gray-500" />
              <h5 className="text-xs text-b3">{product.parttype?.title}</h5>
              <RiArrowDropRightLine className="text-xl text-gray-500" />
              <h5 className="text-xs text-gray-500">{product.title}</h5>
            </div>
          </div>
          {/* Bread Crumbs End */}
          <div id="product-information" className="maincontainer mb-10 grid grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:sticky lg:top-44 lg:col-span-5">
              {Favorites.some((fav)=> fav.favId === product._id) ? (
                <button onClick={(e) => RemoveFavorite(e)} className="my-2 flex w-full items-center justify-end text-b3 hover:underline md:hidden">
                  <AiFillHeart className={`h-6 w-6 ${favLoad ? 'animate-bounce text-red-500' : null}`} />
                </button>
              ) : (
                <button type="button" onClick={(e) => handleFavorites(e)} className="my-2 flex w-full items-center justify-end text-b3 hover:underline lg:hidden">
                  <AiOutlineHeart className={`h-6 w-6 ${favLoad ? 'animate-bounce' : null}`} />
                </button>
              )}
              <div className="flex gap-2 md:gap-5 maxmd:flex-col">
                <div className="flex h-full min-w-[70px] flex-col gap-2 2xl:min-w-100px maxmd:order-2 maxmd:flex-row">
                  {product.images
                    ? product.images.slice(0, 4).map((image, index) => (
                        <div key={index} className="relative grid h-60px w-[70px] cursor-pointer place-items-center rounded-lg border-[1px] border-gray-300 px-2 py-1 2xl:h-100px 2xl:w-100px xs:h-[70px]" onClick={() => setMediaViewer({ file: image, data: image, thumbnail: image })}>
                          <Image width={200} height={200} quality={100} src={image} className="w-10 2xl:w-20" alt="product" />
                        </div>
                      ))
                    : null}
                  {product.images?.length > 4 ? (
                    <div className="relative h-[70px] w-[70px] cursor-pointer rounded-lg border-[1px] border-blue-400 px-2 py-1 2xl:h-100px 2xl:w-100px">
                      <div onClick={() => setImgModal(true)} className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-b3/70 font-semibold text-white">
                        +4
                      </div>
                      <Image width={200} height={200} quality={100} src={product.images[4]} className="h-full w-full object-contain" alt="product" />
                    </div>
                  ) : null}
                </div>
                <div className="relative flex w-full items-center justify-center rounded-lg border-gray-300 px-2 py-10 lg:h-96 lg:border 2xl:h-auto 2xl:py-14 maxmd:order-1">
                  {mediaViewer.file === 'image' ? <Image width={200} height={200} quality={100} src={product.thumbnail ? product.thumbnail : ''} alt={product.title} className="h-auto w-48" /> : null}

                  {/* Compatible Badge */}
                  <Image width={400} height={400} quality={100} src="/compatible-badge.png" alt="Compatible Badge" className="absolute -left-[0.4rem] -top-[0.35rem] z-10 h-auto w-1/3" />

                  {/* NonCompatible Badge */}
                  {/* <Image width={400} height={400} quality={100} src="/noncompatible-badge.png" alt="Compatible Badge" className="absolute -left-[0.4rem] -top-[0.35rem] z-10 h-auto w-1/3" /> */}

                  {/* {mediaViewer.file === 'video' && mediaViewer.type === 'url' ? <Iframe style="w-full h-full" src={mediaViewer.data} title="Modal Video" icon="text-5xl" frameId={`video-frame-modal-${(Math.random() * 100) / 5}`} divId={`video-frame-modal-wrapper-${(Math.random() * 100) / 5}`} thumbnail={mediaViewer.thumbnail} /> : null}
                  {mediaViewer.file === 'video' && mediaViewer.type === 'upload' ? <video className="h-2/3 w-11/12 rounded-2xl" controls src={mediaViewer.data} /> : null} */}
                </div>
              </div>
              <div className="mt-10 hidden flex-col items-center justify-center gap-y-3 lg:flex">
                {product.description ? <FaqAccordion parser="true" title="Appliance Description" parent="w-full [&>div]:py-4 [&>div]:px-6 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0" icon="text-xl" textStyle="font-bold text-sm" child="[&>p]:text-sm !mt-0" answer={product.description} chevrown /> : null}
                {product.specification ? <FaqAccordion parser="true" title="Specifications" parent="w-full [&>div]:py-4 [&>div]:px-6 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0" icon="text-xl" textStyle="font-bold text-sm" child="[&>p]:text-sm !mt-0" answer={product.specification} chevrown /> : null}
                {product.delivery ? <FaqAccordion parser="true" title="Delivery Info" parent="w-full [&>div]:py-4 [&>div]:px-6 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0" icon="text-xl" textStyle="font-bold text-sm" child="[&>p]:text-sm !mt-0" answer={product.delivery} chevrown /> : null}
              </div>
            </div>

            <div className="mt-4 flex flex-col space-y-5 px-1 lg:col-span-7 lg:mt-0 lg:px-0">
              <h2 className="line-clamp-3 text-xl font-bold leading-8 md:line-clamp-2 md:text-2xl lg:w-full">{product.title}</h2>
              <div className="flex w-full items-center justify-between">
                <Link href={`/product/${product.slug}/buying-options`} className="cursor-pointer text-xs font-bold text-b3 underline lg:w-80 lg:text-sm">
                  View {partscount} More Buying Options ↓
                </Link>
              </div>
              <div className="flex gap-5 whitespace-nowrap sm:items-center">
                <div className="flex items-center gap-5">
                  <h4 className="text-2xl font-bold text-b3 lg:text-3xl ">${product.sale_price ? product.sale_price : product.regular_price}</h4>
                  {product.sale_price ? <strike className="text-lg">${product.regular_price}</strike> : null}
                </div>
                <div className="flex items-center gap-5 sm:w-full sm:justify-between lg:flex-wrap">
                  {product.sale_price ? <span className="flex rounded-2xl bg-b4 px-3 py-2 text-xs font-semibold text-black">${product.regular_price - product.sale_price} Savings</span> : null}
                  {Favorites.some((fav)=> fav.favId === product._id) ? (
                    <button onClick={(e) => RemoveFavorite(e)} className="hidden items-center justify-end text-b3 hover:underline md:flex">
                      <AiFillHeart className={`${favLoad ? 'animate-bounce text-red-500' : null}`} />
                      <span>My Favorite</span>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => handleFavorites(e)} className="hidden items-center justify-end text-b3 hover:underline md:flex">
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
                <span className="text-base font-semibold text-b1">{product.part_number}</span>
              </div>
              <div className="mt-2 flex items-center space-x-5 lg:mt-4 lg:space-x-5">
                <div className="flex items-center gap-1">
                  <h4 className="w-max text-base font-semibold text-b16/50">Condition</h4>
                  {/* <ToolTip color="text-b16/50" /> */}
                  <QuestionMarkCircleIcon onClick={() => handleCloseModal(product.condition)} strokeWidth={2} className={`h-5 w-5 cursor-pointer text-b16/50 hover:text-b3`} />
                </div>
                <div className={`inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase text-white ` + ConditionData().class}>
                  {ConditionData().slug === 'new' && <FourStar />}
                  {ConditionData().title}
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-5 rounded-lg border border-b3 bg-b3/10 p-2 md:p-4 lg:mt-4 lg:space-x-5">
                <div className="flex items-center gap-1">
                  <h4 className="w-max pr-3 text-base font-semibold text-b16/50">Type</h4>
                  <AiOutlineTag className="ml-2 h-5 w-5 text-b3" />
                </div>
                <span className="text-base font-semibold text-b1">{product.type}</span>
              </div>
              {product.sale_price ? (
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex text-sm font-semibold text-b16/50">
                    <h4>Discount</h4>
                    <span>%</span>
                  </div>
                  <div className="w-full rounded-lg bg-gray-200 md:w-52 maxmd:max-w-52">
                    <span className="flex h-3 w-2/4 rounded-lg bg-gradient-to-r from-b4 to-b7" style={{ width: `${((product.regular_price - product.sale_price) / product.regular_price) * 100}%` }}></span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-b7 px-3 py-1.5 text-white md:px-5 md:py-2 maxmd:text-sm">
                    <GasSvg /> {(((product.regular_price - product.sale_price) / product.regular_price) * 100).toFixed(1)}% Off
                  </div>
                </div>
              ) : null}
              <div className="rounded-lg p-3 shadow-[0px_4px_24px_rgba(0,0,0,0.08)] md:p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label htmlFor="" className="text-xs">
                      Quantity
                    </label>
                    <div className="relative w-24">
                      <button type="button" onClick={() => setQuantity(quantity - 1)} className={`absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-full text-sm font-medium leading-3 text-white ${quantity === 1 ? 'pointer-events-none bg-b3/25 text-gray-400' : 'bg-b3'}`}>
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <input type="number" value={quantity} readOnly className="remove-arrow h-10 w-24 rounded-full bg-[#F3F3F3] px-8 text-center text-sm font-semibold text-black outline-none hover:border-b3/90" />
                      <button type="button" onClick={() => setQuantity(quantity + 1)} className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-b3 text-sm font-medium leading-3 text-white">
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {stock > 0 ? (
                    <div className="flex items-center rounded-full bg-b13 px-3 py-2 text-xs text-white">
                      <IoBagCheckOutline className="mr-1 text-sm" />
                      {stock} in stock In Georgetown, TX
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
                  <button type="button" disabled={product.stock === 0 || cartLoading ? true : false} onClick={AddToCart} className="button-hover relative flex h-full w-full items-center justify-center rounded-lg py-4 font-medium text-white">
                    <AiOutlineShoppingCart className="text-lg" />
                    <span className="ml-2 flex items-center font-medium">Add To Cart {cartLoading ? <BiLoaderAlt className="absolute right-16 animate-spin text-2xl" /> : null}</span>
                  </button>
                  <button type="button" disabled={product.stock === 0 || buyLoading ? true : false} onClick={AddToCart} className="relative flex h-full w-full items-center justify-center rounded-lg bg-[#071822] py-4 font-medium text-white hover:bg-[#071822]/90">
                    <Image width={100} height={100} className="h-6 w-5 object-contain" alt="Sell" src="/svgs/sell.webp" />
                    <span className="ml-2 flex items-center font-medium">Buy Now {buyLoading ? <BiLoaderAlt className="absolute right-16 animate-spin text-2xl" /> : null}</span>
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
              <BuyingOtherOptions slug={slug} otherProducts={buyingOptions} defaultProduct={product} condition={ConditionData} handleCondition={handleCloseModal} />

              <div className="mt-10 hidden flex-col items-center justify-center gap-y-3 maxlg:flex">
                {product.description ? <FaqAccordion parser="true" title="Appliance Description" parent="w-full [&>div]:py-4 [&>div]:px-6 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0" icon="text-xl" textStyle="font-bold text-sm" child="[&>p]:text-sm !mt-0" answer={product.description} chevrown /> : null}
                {product.specification ? <FaqAccordion parser="true" title="Specifications" parent="w-full [&>div]:py-4 [&>div]:px-6 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0" icon="text-xl" textStyle="font-bold text-sm" child="[&>p]:text-sm !mt-0" answer={product.specification} chevrown /> : null}
                {product.delivery ? <FaqAccordion parser="true" title="Delivery Info" parent="w-full [&>div]:py-4 [&>div]:px-6 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0" icon="text-xl" textStyle="font-bold text-sm" child="[&>p]:text-sm !mt-0" answer={product.delivery} chevrown /> : null}
              </div>
            </div>
          </div>

          {/* 360 Degree Product Section */}
          <Rotate360Product product={product} condition={ConditionData} />

          {/* More Parts */}
          {partproducts.length > 0 && <MoreParts data={partproducts} />}

          <CompatibleAppliance partNo={product.part_number} />

          {/* Review */}
          <ConditionReview condition={ConditionData} />

          {/* <ProductSlider /> */}

          <CompareModel products={buyingOptions} condition={ConditionData} defaultProduct={product} slug={slug} />

          <LoopSection />

          <WarantySection />
        </>
      )}
    </>
  );
};

export default Product;
