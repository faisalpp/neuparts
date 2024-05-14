'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const AboutCeo = () => {
  const [members, setMembers] = useState([
    {
      image: '/team/Antonio.webp',
      name: 'Antonio',
      designation: 'CEO',
    },
    {
      image: '/team/Antonio.webp',
      name: 'Antonio',
      designation: 'CEO',
    },
    {
      image: '/team/Antonio.webp',
      name: 'Antonio',
      designation: 'CEO',
    },
    {
      image: '/team/Antonio.webp',
      name: 'Antonio',
      designation: 'CEO',
    },
    {
      image: '/team/Antonio.webp',
      name: 'Antonio',
      designation: 'CEO',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const GetMembers = async () => {};

  useEffect(() => {
    GetMembers();
  }, []);

  return (
    <>
      <div className="maincontainer py-10 lg:py-16 xl:py-20 2xl:py-120px">
        <h2 className="mb-10 text-center text-2xl font-bold lg:mb-16 xl:mb-20 xl:text-[32px] 2xl:mb-120px">Meet The Team</h2>

        <div className="meetteam grid grid-cols-2 flex-wrap justify-center gap-x-2 gap-y-10 md:flex md:gap-10 3xl:justify-start 3xl:gap-20 3xl:px-[60px]">
          {members.map((team, index) => (
            <figure key={index} className="w-[150px] rounded-[20px] border border-transparent p-5 duration-300 hover:border-b20 hover:shadow-s1 md:w-[200px]">
              <Image width={400} height={400} quality={100} className="mx-auto h-28 w-28 rounded-full md:h-40 md:w-40" src={team.image} alt={team.name} />
              <div className="pt-[10px]">
                <figcaption className="text-center font-medium">
                  <h3 className="mb-3 font-bold text-b18 md:text-[22px]">{team.name}</h3>
                  <span className="block text-b3 maxmd:text-xs">{team.designation}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutCeo;
