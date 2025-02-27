import React from 'react';
import Header from '@features/header/Header';
import Description from '@features/description/Description';

const About = () => (
  <div className="flex flex-col h-full w-screen bg-zinc-900 text-white">
    <Header />
    <div className='flex flex-row justify-center'>
      <div className='lg:w-1/2'>
        <Description />
      </div>
    </div>
  </div>
)

export default About;
