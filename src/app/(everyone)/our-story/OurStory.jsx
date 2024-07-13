
import React from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import OurVision from '@/components/OurStory/OurVision';
import { RiArrowDropRightLine } from 'react-icons/ri';
import AboutCeo from '@/components/OurStory/AboutCeo';
import OurStorySection from '@/components/OurStory/OurStorySection';
import SatisfiedSection from '@/components/SatisfiedSection';
import MeetTeam from '@/components/OurStory/MeetTeam';
import MassiveAppliance from '@/components/OurStory/MassiveAppliance';
import NewsLetterSection from '@/components/NewsLetterSection';
// import Iframe from '@/components/Reusable/Ifram';
// import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const OurStory = () => {
  // const [video, setVideo] = useState({ url: 'https://www.youtube.com/embed/WQWVW4DUmZ0', type: 'iframe', thumbnail: '/g8.webp' });

  return (
    <>
      <div className="maincontainer pt-10 lg:pt-16 xl:pt-20">
        {/* Bread Crumbs Start */}
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b19" />
          <h5 className="text-xs text-black">Our Story</h5>
        </div>
        {/* Bread Crumbs End */}
        <ApplianceDetail title="Our Story" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phasellus non felis eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula." />
      </div>

      <OurVision BoxStyle="-left-10" image="/ourvision.webp" about="OUR VISION" title="Quis vitae pellentesque enim, nunc hendrerit enim metus ut magna. Pulvinar." description="Egestas nulla mauris elit at sed gravida. Donec neque nulla nisi nulla. Vel cras purus tempor ultricies amet. Bibendum sit sit." />

      <AboutCeo />

      <OurVision BoxStyle="-left-8" order="lg:order-2" image="/ourvalue.webp" about="OUR VALUE" title="Libero blandit fames tortor porta nunc, imperdiet donec. Semper sit pulvinar sed." description="Egestas nulla mauris elit at sed gravida. Donec neque nulla nisi nulla. Vel cras purus tempor ultricies amet. Bibendum sit sit." />

      <OurStorySection />
      {/* Video Section */}
      {/* <div className="mx-auto w-full 3xl:max-w-1680px">
        {video && video.type === 'iframe' ? <Iframe icon="text-8xl" thumbnail={video.thumbnail} thumbRounded="false" divId={`our-story-section-${video.type}`} frameId="our-story-section" style="w-full h-[250px] md:h-[700px] 2xl:h-[920px]" src={video.url} title="Introducing our Next Generation of High End Kitchen Appliances | Miele" /> : null}
        {video && video.type !== 'iframe' ? <video controls autoPlay className="h-[250px] w-full object-cover md:h-[700px] 2xl:h-[920px]" src={video.url} /> : null}
      </div> */}

      {/* Team */}
      <MeetTeam />

      <MassiveAppliance title="Shop Massive Discount Appliances" sliderstyle="sm:mx-2 3xl:mx-5" />

      {/* Client Reviews */}
      <div className="mb-3 xl:mb-10"></div>
      <SatisfiedSection page="our-story" title="Join Thousands of Satisfied Customers." />

      <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  );
};

export default OurStory;
