import React from 'react';
import Header from '@features/header/Header';
import Description from '@features/description/Description';

const About = () => (
  <div className="flex flex-col h-screen w-screen bg-zinc-900 text-white">
    <Header />
    <div className='p-4'>
      <Description />
    </div>
  </div>
)

export default About;
