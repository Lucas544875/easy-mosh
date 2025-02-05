import React from 'react';
import DatamoshEditor from '@features/datamosh-editor/DatamoshEditor';
import Header from '@features/header/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <DatamoshEditor />
    </div>
  );
}

export default App;
