import React from 'react';
import NewsLetterSection from '@/components/NewsLetterSection';
import { RiArrowDropRightLine } from 'react-icons/ri';
import BackHome from '@/components/BackHome';
import Image from 'next/image';

const Page = () => {
  return (
    <>
      <div className="maincontainer py-16 xl:py-20">
        {/* Bread Crumbs Start */}
        <BackHome className="mb-10 md:hidden" />

        <div className="hidden items-center md:flex">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b19" />
          <h5 className="text-xs text-black">Important Information</h5>
        </div>
        {/* Bread Crumbs End */}

        <div className="mx-auto max-w-[960px] pt-20">
          <h1 className="mb-4 text-32px font-bold leading-normal text-black lg:text-40px">Important Information</h1>
          <span className="block text-xl -tracking-032">July 19, 2022</span>
          <div>
            <Image width={400} height={400} quality={100} src="/important.png" className="w-full h-auto my-20" alt="important" />
            <div className="mb-20">
              <h2 className="mb-4 text-3xl font-bold text-b18">Lorem Ipsum</h2>
              <p className="text-black">
                Kånivuvis kamårad DALL·E Bengt Strömberg, megade men digen. Applikation terrativ B2C japägon Mona Sundström. Poras SISP måsk och neofiering, val. Fase päbel, hemirade, ension innan dedelig inklusive primagram det smart content. Eurok supratäv ett kassalösa butiker, kade, Kristina Jönsson. Rickard Fredriksson ätäde inklusive Linnéa Svensson fast rydat disruptive. Organisatorisk Victoria Nilsson och Christian Jansson paskapet och nipregisk därför att facilitera. Bösossa Elisabeth Norberg Maja Ahmed inte beren utom tina, i kande. UX polylog, SEM Siv Lundqvist att Birgit Strömberg Kjell Bergman. Testbädd går, inte Adam Johansson res farat. Antivis Anneli Holmgren fast läbick, pret autov prematisk. Inbound innovation reatopi plast Helen Hellström, provis. Epimatisk labälogi kal: geofencing måtär sevis. Mid Birgit Björklund midost jål ragådeligt. Tommy Lindberg soseliga att Adam Lindberg perad savis, Yvonne Holm deligt. Karolina Forsberg trektig kas, geosk androvalens. Porar Katarina Candia bös har nytede ultraköna. Ansvarsfull stereoaktiv, liksom nyckelord för beras fang oaktat syntion neomodern. Antikemi Arne Nyberg tise bootstrapping auton. Täseren Charlotte Dahlberg bekåheten bösode, plus pogåligen: hexada.
                <br />
                <br />
                Makroska nohäsamma Filip Hermansson goda Britt Eriksson. Äs tempomatisk, kluster vådade är Linnéa Jonasson pos growth hacking. Katt läsena att Birgit Larsson ör virade. Nens Sonja Ali ojakrod saheten göng, är Kerstin Jensen i prenost. Fonoplastisk dobökor, och fature digt i content provider öppen innovation. Cirkulär ekonomi neomatisk jynan i Emelie Månsson megaranyrat. Relaterade artiklar cirkulär ekonomi Elsa Martinsson dokagt telest. Hyperplastisk Gösta Mattsson legen astropod behonat sepp. El exor, bede att transparens, pneumation: inte fasode Kerstin Candia. SERP Helen Holmgren vinde medelgyn Gun Lindgren, maskininlärning. Branded content tritet disruptiv handel för presk på semites. Britt Eriksson åpp och linkedIn synstat autokåll. Gigask resat att säkösm men pepp i Jonas Lundqvist i heteroism inte hädat. Stefan Dahl conversational commerce Göran Andersson: supraskap och rabäskade i innovationssystem. Ang jykonera och spepäläbelt, bricks and clicks i BOPIS pretrerade. Britt Bergström dekavusat tävis i trapp i facilitera, chatbots. Öss bek Mattias Blom det retailtainment i trism. Milig omniexperience protäktig Tommy Löfgren Anton Håkansson Filip Björk bose. Entopi facilitera, och tujåheten omniexperience medan content marketing dystes hypobel. Kvasise yr och micro fulfillment center en yfokorade och rens öppen innovation boda.
              </p>
            </div>
            <div className="mb-20">
              <h2 className="mb-4 text-3xl font-bold text-b18">Lorem Ipsum</h2>
              <p className="text-black">
                Kånivuvis kamårad DALL·E Bengt Strömberg, megade men digen. Applikation terrativ B2C japägon Mona Sundström. Poras SISP måsk och neofiering, val. Fase päbel, hemirade, ension innan dedelig inklusive primagram det smart content. Eurok supratäv ett kassalösa butiker, kade, Kristina Jönsson. Rickard Fredriksson ätäde inklusive Linnéa Svensson fast rydat disruptive. Organisatorisk Victoria Nilsson och Christian Jansson paskapet och nipregisk därför att facilitera. Bösossa Elisabeth Norberg Maja Ahmed inte beren utom tina, i kande. UX polylog, SEM Siv Lundqvist att Birgit Strömberg Kjell Bergman. Testbädd går, inte Adam Johansson res farat. Antivis Anneli Holmgren fast läbick, pret autov prematisk. Inbound innovation reatopi plast Helen Hellström, provis. Epimatisk labälogi kal: geofencing måtär sevis. Mid Birgit Björklund midost jål ragådeligt. Tommy Lindberg soseliga att Adam Lindberg perad savis, Yvonne Holm deligt. Karolina Forsberg trektig kas, geosk androvalens. Porar Katarina Candia bös har nytede ultraköna. Ansvarsfull stereoaktiv, liksom nyckelord för beras fang oaktat syntion neomodern. Antikemi Arne Nyberg tise bootstrapping auton. Täseren Charlotte Dahlberg bekåheten bösode, plus pogåligen: hexada.
                <br />
                <br />
                Makroska nohäsamma Filip Hermansson goda Britt Eriksson. Äs tempomatisk, kluster vådade är Linnéa Jonasson pos growth hacking. Katt läsena att Birgit Larsson ör virade. Nens Sonja Ali ojakrod saheten göng, är Kerstin Jensen i prenost. Fonoplastisk dobökor, och fature digt i content provider öppen innovation. Cirkulär ekonomi neomatisk jynan i Emelie Månsson megaranyrat. Relaterade artiklar cirkulär ekonomi Elsa Martinsson dokagt telest. Hyperplastisk Gösta Mattsson legen astropod behonat sepp. El exor, bede att transparens, pneumation: inte fasode Kerstin Candia. SERP Helen Holmgren vinde medelgyn Gun Lindgren, maskininlärning. Branded content tritet disruptiv handel för presk på semites. Britt Eriksson åpp och linkedIn synstat autokåll. Gigask resat att säkösm men pepp i Jonas Lundqvist i heteroism inte hädat. Stefan Dahl conversational commerce Göran Andersson: supraskap och rabäskade i innovationssystem. Ang jykonera och spepäläbelt, bricks and clicks i BOPIS pretrerade. Britt Bergström dekavusat tävis i trapp i facilitera, chatbots. Öss bek Mattias Blom det retailtainment i trism. Milig omniexperience protäktig Tommy Löfgren Anton Håkansson Filip Björk bose. Entopi facilitera, och tujåheten omniexperience medan content marketing dystes hypobel. Kvasise yr och micro fulfillment center en yfokorade och rens öppen innovation boda.
              </p>
            </div>
          </div>
        </div>
      </div>
      <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  );
};

export default Page;
