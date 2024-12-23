'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const AboutCeo = () => {
  const [members,setMembers] = useState([])
  const [loading,setLoading] = useState(true)

  const GetTeamMembers = async () => {
    fetch('/api/front/team-members')
    .then((res)=> res.json())
    .then((data)=>{setMembers(data.members);setLoading(false)})
    .catch((error)=>{
      setLoading(false)
      setMembers([])
    })
  };

  useEffect(()=>{
   GetTeamMembers()
  },[])

  const TeamSkelton = () => {
    return (
      <figure className="rounded-[20px] border border-transparent p-5 duration-300 hover:border-b20 hover:shadow-s1">
                <div className="mx-auto h-28 w-28 rounded-full md:h-40 md:w-40 bg-gray-200 animate-pulse" ></div>
                <div className="pt-[10px]">
                  <figcaption className="text-center font-medium">
                    <h3 className="font-bold text-b18 md:text-[22px] xl:text-28px bg-gray-200 h-5 rounded-xl animate-pulse"></h3>
                    <span className="mb-4 mt-3 inline-flex rounded-full bg-gray-200 px-4 py-2 text-gray-200 animate-pulse maxmd:text-xs">role</span>
                    <p className="text-xs text-gray-200 bg-gray-200 rounded-xl mt-2 md:text-sm maxmd:line-clamp-6 animate-pulse">bio</p>
                    <p className="text-xs text-gray-200 bg-gray-200 rounded-xl mt-2 md:text-sm maxmd:line-clamp-6 animate-pulse">bio</p>
                    <p className="text-xs text-gray-200 bg-gray-200 rounded-xl mt-2 md:text-sm maxmd:line-clamp-6 animate-pulse">bio</p>
                    <p className="text-xs text-gray-200 bg-gray-200 rounded-xl mt-2 md:text-sm maxmd:line-clamp-6 animate-pulse">bio</p>
                    <p className="text-xs text-gray-200 bg-gray-200 rounded-xl mt-2 md:text-sm maxmd:line-clamp-6 animate-pulse">bio</p>
                  </figcaption>
                </div>
              </figure>
    )
  }

  return (
    <>
        <div className="maincontainer py-10 lg:py-16 xl:py-20 2xl:py-120px">
         {members.length > 0 ? <h2 className="mb-10 text-center text-2xl font-bold lg:mb-16 xl:mb-20 xl:text-[32px] 2xl:mb-120px">Meet The Team</h2>:null}

          <div className="meetteam grid grid-cols-2 justify-center gap-6 lg:grid-cols-3 lg:gap-7 3xl:gap-20">
          {loading ? <>
              {Array.from({length:9}).map((_,i)=>
               <TeamSkelton key={i} />
              )}
              </>
              :
               members.map((team, index) => (
              <figure key={index} className="rounded-[20px] border border-transparent p-5 duration-300 hover:border-b20 hover:shadow-s1">
                <Image width={400} height={400} quality={100} className="mx-auto h-28 w-28 rounded-full md:h-40 md:w-40" src={team.avatar} alt={team.name} />
                <div className="pt-[10px]">
                  <figcaption className="text-center font-medium">
                    <h3 className="font-bold text-b18 md:text-[22px] xl:text-28px">{team.name}</h3>
                    <span className="mb-4 mt-3 inline-flex rounded-full bg-b3/10 px-4 py-2 text-b3 maxmd:text-xs">{team.role}</span>
                    <p className="text-xs text-b1 md:text-sm maxmd:line-clamp-6">{team.bio}</p>
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
