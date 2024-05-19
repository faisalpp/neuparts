import ApplianceSection from '@/components/ApplianceSection';
import BrandsSlider from '@/components/BrandsSlider';
import GallerySection from '@/components/GallerySection';
import HeroSection from '@/components/HeroSection';
import MapSection from '@/components/MapSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import PupularParts from '@/components/PupularParts';
import ChooseUs from '@/components/ChooseUs';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandsSlider />
      <ApplianceSection category="appliance" title="Shop By Appliance Category" linktitle="View All Appliance Categories" />
      <ApplianceSection category="parts" Style="!pt-5" title="Shop By Parts Category" linktitle="View All Parts Categories" />
      <PupularParts />
      <ChooseUs />
      <GallerySection />
      <MapSection />
      <SatisfiedSection apiSectionName="home-page-footer-review" title="Join Thousands of our Satisfied Customers." />
      <NewsLetterSection backimage="/hero-bg.webp" />
    </>
  );
}
