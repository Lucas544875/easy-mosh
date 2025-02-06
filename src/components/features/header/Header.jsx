import React from 'react';
import HeaderButton from './HeaderButton';

const Header = () => (
  <header className="flex justify-between items-center p-4 bg-slate-800 border-b text-white">
    <div className="text-lg font-bold">
      ロゴ
    </div>
    <nav className="flex space-x-4">
      <HeaderButton to={"/"}>編集</HeaderButton>
      <HeaderButton to={"/about"}>使い方</HeaderButton>
    </nav>
  </header>
)

export default Header;