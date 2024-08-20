import React from 'react';
import Image from 'next/image';
import connect from '@/lib/db';
import TeamMember from '@/models/teamMembers';

const GetTeamMembers = async () => {
  await connect();

  const teamMembers = await TeamMember.find({});
  return teamMembers;
};

const AboutCeo = async () => {
  const members = await GetTeamMembers();

  return (
    <>
      {members.length > 0 ? (
        <div className="maincontainer py-10 lg:py-16 xl:py-20 2xl:py-120px">
          <h2 className="mb-10 text-center text-2xl font-bold lg:mb-16 xl:mb-20 xl:text-[32px] 2xl:mb-120px">Meet The Team</h2>

          <div className="meetteam grid grid-cols-2 justify-center gap-6 lg:grid-cols-3 lg:gap-7 3xl:gap-20">
            {members.map((team, index) => (
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
      ) : null}
    </>
  );
};

export default AboutCeo;
