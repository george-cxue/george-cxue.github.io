'use client';

import React from 'react';
import Image from 'next/image';
import box from 'public/media/home/box.jpg';
import car from 'public/media/home/car.jpg';
import friends from 'public/media/home/friends.jpg';
import pc from 'public/media/home/pc.jpg';
import icecream from 'public/media/home/icecream.jpg';
import philly from 'public/media/home/philly.jpg';
import github from 'public/media/icons/github.svg';
import instagram from 'public/media/icons/instagram.svg';
import linkedin from 'public/media/icons/linkedin.svg';
import spotify from 'public/media/icons/spotify.svg';

function Home() {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8">Hey, I&apos;m George 🙋🏻</h1>
      <p className="prose prose-neutral dark:prose-invert">
        I&apos;m a student at The University of Pennsylvania pursuing a BSE in Computer Science. My most recent venture was at Cybrary, a cybersecurity startup, working as a
        software engineering intern. Through computer science I hope develop a problem-solving mindset that will allow me to pursue any interests or goals of mine.
      </p>
      <div className="columns-2 sm:columns-3 gap-4 my-8">
        <div className="relative h-40 mb-4">
          <Image alt="Philly skyline" src={philly} fill sizes="(max-width: 768px) 213px, 33vw" priority className="rounded-lg object-cover" />
        </div>
        <div className="relative h-80 mb-4 sm:mb-0">
          <Image
            alt="Me eating icecream :D"
            src={friends}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-[-16px] sm:object-center"
          />
        </div>
        <div className="relative h-40 sm:h-80 sm:mb-4">
          <Image
            alt="Me standing in front of a pretty cool car!"
            src={car}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-top sm:object-center"
          />
        </div>
        <div className="relative h-40 mb-4 sm:mb-0">
          <Image alt="Picture with my pledge class" src={pc} fill sizes="(max-width: 768px) 213px, 33vw" priority className="rounded-lg object-cover" />
        </div>
        <div className="relative h-40 mb-4">
          <Image alt="This is a cool music box that I saw in Boston" src={box} fill sizes="(max-width: 768px) 213px, 33vw" priority className="rounded-lg object-cover" />
        </div>
        <div className="relative h-80">
          <Image alt="Me eating some match icecream :p" src={icecream} fill sizes="(min-width: 768px) 213px, 33vw" priority className="rounded-lg object-cover" />
        </div>
      </div>
      <p className="prose prose-neutral dark:prose-invert">
        This will be my second year at Penn and I&apos;m really looking forward to making the most out of time here. I love photography, music, various sports, eating food, and
        pumping iron in the gym. One of my goals is to take more photos and videos in an attempt to document my life.
      </p>
      <div className="mt-16 flex justify-start space-x-12">
        <a href="https://www.linkedin.com/in/george-xue/">
          <Image alt="" src={linkedin} className="white-icon" />
        </a>
        <a href="https://github.com/george-cxue">
          <Image alt="" src={github} className="white-icon" />
        </a>
        <a href="https://open.spotify.com/user/8hpon00msyzahilm1d9jm8mwn">
          <Image alt="" src={spotify} className="white-icon" />
        </a>
        <a href="https://www.instagram.com/george_x97/">
          <Image alt="" src={instagram} className="white-icon" />
        </a>
      </div>
    </section>
  );
}

export default Home;
