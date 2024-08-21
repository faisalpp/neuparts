import ApplianceSection from '@/components/ApplianceSection';
import BrandsSlider from '@/components/BrandsSlider';
import GallerySection from '@/components/GallerySection';
import HeroSection from '@/components/HeroSection';
import MapSection from '@/components/MapSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import PupularParts from '@/components/PupularParts';
import ChooseUs from '@/components/ChooseUs';
import connect from '@/lib/db';
import Category from '@/models/productcategory';
import ProductType from '@/models/producttype';
import HomeGallery from '@/models/homeGallery';

const getHome = async () => {
  await connect();

  const categories = await Category.find().sort({ createdAt: -1 });
  const parttypes = await ProductType.find().sort({ createdAt: -1 });
  const homeGallery = await HomeGallery.find().sort({ createdAt: -1 });

  return { categories: categories, parttypes: parttypes,homeGallery:homeGallery };
};

const Page = async () => {
  const productsData = await getHome();

  return (
    <>
      <HeroSection />
      <BrandsSlider />
      {productsData ? <ApplianceSection data={productsData.categories} title="Shop By Appliance Category" linktitle="View All Appliance Categories" /> : null}
      {productsData ? <ApplianceSection data={productsData.parttypes} Style="!pt-5" title="Shop By Parts Category" linktitle="View All Parts Categories" /> : null}
      <PupularParts />
      <ChooseUs />
      {productsData ? <GallerySection data={productsData.homeGallery} /> : null}
      <MapSection />
      <SatisfiedSection page="home-page" title="Join Thousands of our Satisfied Customers." />
      <NewsLetterSection backimage="/hero-bg.webp" />
    </>
  );
};

export default Page;
