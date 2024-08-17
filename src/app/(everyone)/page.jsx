import ApplianceSection from '@/components/ApplianceSection';
import BrandsSlider from '@/components/BrandsSlider';
import GallerySection from '@/components/GallerySection';
import HeroSection from '@/components/HeroSection';
import MapSection from '@/components/MapSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import PupularParts from '@/components/PupularParts';
import ChooseUs from '@/components/ChooseUs';

const Page = async () => {
  return (
    <>
      <HeroSection />
      <BrandsSlider />
      <ApplianceSection type="categories" title="Shop By Appliance Category" linktitle="View All Appliance Categories" />
      <ApplianceSection type="parttyoes" Style="!pt-5" title="Shop By Parts Category" linktitle="View All Parts Categories" />
      <PupularParts type="productsparts" />
      <ChooseUs />
      <GallerySection />
      <MapSection />
      <SatisfiedSection page="home-page" title="Join Thousands of our Satisfied Customers." />
      <NewsLetterSection backimage="/hero-bg.webp" />
    </>
  );
};

export default Page;
