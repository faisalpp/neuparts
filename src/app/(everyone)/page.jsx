import ApplianceSection from '@/components/ApplianceSection';
import BrandsSlider from '@/components/BrandsSlider';
import GallerySection from '@/components/GallerySection';
import HeroSection from '@/components/HeroSection';
import MapSection from '@/components/MapSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import PupularParts from '@/components/PupularParts';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandsSlider />
      <ApplianceSection title="Shop By Appliance Category" />
      <ApplianceSection Style="!pt-5" title="Shop By Parts Category" />
      <PupularParts />
      <GallerySection />
      <MapSection />
      <SatisfiedSection apiSectionName="home-page-footer-review" title="Join Thousands of our Satisfied Customers." />
      <NewsLetterSection backimage="/hero-bg.webp" />
    </>
  );
}
