import React from 'react';
import DatamoshEditor from '@features/datamosh-editor/DatamoshEditor';
import Header from '@features/header/Header';

const Home = () => (
  <div className="flex flex-col h-screen w-screen">
    <Header />
    <DatamoshEditor />
  </div>
)

export default Home;
