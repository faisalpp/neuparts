import ApplianceSection from '@/components/ApplianceSection';
import AustinLoveSection from '@/components/AustinLoveSection';
import BrandsSlider from '@/components/BrandsSlider';
import CosmaticStarSection from '@/components/CosmaticStarSection';
import GallerySection from '@/components/GallerySection';
import HeroSection from '@/components/HeroSection';
import HiwSection from '@/components/HiwSection';
import HomeImagesSection from '@/components/HomeImagesSection';
import LoopSection from '@/components/LoopSection';
import MapSection from '@/components/MapSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import RatingProductSection from '@/components/RatingProductSection';
import ReviewSection from '@/components/ReviewSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import TourSection from '@/components/TourSection';
import WwslSection from '@/components/WwslSection';
import dynamic from 'next/dynamic';
const D3CardSection = dynamic(() => import('@/components/D3CardSection'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandsSlider />
      <WwslSection />
      <HomeImagesSection />
      <CosmaticStarSection />
      <HiwSection />
      <AustinLoveSection />
      <D3CardSection />
      <ReviewSection />
      <LoopSection />
      <ApplianceSection />
      <MapSection />
      <RatingProductSection />
      <TourSection />
      <GallerySection />
      <SatisfiedSection apiSectionName="home-page-footer-review" title="Join Thousands of our Satisfied Customers." />
      <NewsLetterSection backimage="/new.webp" />
    </>
  );
}
