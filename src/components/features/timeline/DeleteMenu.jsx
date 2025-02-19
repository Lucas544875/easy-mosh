import React from "react";
import { Dropdown, Menu } from "antd";

const menu = (
  <Menu>
    <Menu.Item>削除</Menu.Item>
  </Menu>
);

const TimelineItemDeleteMenu = ({ children }) => {
  return (
    <Dropdown
      overlay={menu}
      trigger={["contextMenu"]}
    >
      {children}
    </Dropdown>
  );
}

export default TimelineItemDeleteMenu;