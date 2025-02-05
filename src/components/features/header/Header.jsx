import React from 'react';
import Button from '@common/button';

const Header = () => (
  <header className="flex justify-between items-center p-4 bg-slate-800 border-b text-white">
    <div className="text-lg font-bold">ロゴ</div>
    <nav className="flex space-x-4">
      <Button>編集</Button>
      <Button>使い方</Button>
    </nav>
  </header>
)

export default Header;