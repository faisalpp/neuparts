import ApplianceSection from '@/components/ApplianceSection';
import BrandsSlider from '@/components/BrandsSlider';
import GallerySection from '@/components/GallerySection';
import HeroSection from '@/components/HeroSection';
import MapSection from '@/components/MapSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import PupularParts from '@/components/PupularParts';
import ChooseUs from '@/components/ChooseUs';

const getHome = async () => {
  const res = await fetch(`${process.env.NEXT_BASE_API}/api/front/home`);
  const data = await res.json();
  return data;
};

const Page = async () => {
  const productsData = await getHome();

  return (
    <>
      <HeroSection />
      <BrandsSlider />
      {productsData && <ApplianceSection data={productsData.categories} title="Shop By Appliance Category" linktitle="View All Appliance Categories" />}
      {productsData && <ApplianceSection data={productsData.parttyoes} Style="!pt-5" title="Shop By Parts Category" linktitle="View All Parts Categories" />}
      {productsData && <PupularParts data={productsData.productsparts} />}
      <ChooseUs />
      <GallerySection />
      <MapSection />
      <SatisfiedSection page="home-page" title="Join Thousands of our Satisfied Customers." />
      <NewsLetterSection backimage="/hero-bg.webp" />
    </>
  );
};

export default Page;
