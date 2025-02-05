import React from 'react';
import DatamoshEditor from '@features/datamosh-editor/DatamoshEditor';
import Header from '@features/header/Header';

function App() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <DatamoshEditor />
    </div>
  );
}

export default App;
