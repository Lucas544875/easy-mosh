import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => (
  <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#27272a', padding: '0 20px' }}>
    <Link to="/" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
      Easy Mosh
    </Link>
    <Menu mode="horizontal" theme="dark" style={{ background: 'transparent', borderBottom: 'none' }}>
      <Menu.Item key="edit">
        <Link to="/">
          編集
        </Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link to="/about">
          使い方
        </Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default AppHeader;
