import React from "react";
import { Dropdown, Menu } from "antd";
import { useAtom } from 'jotai';
import { timelineAtom, deleteItem } from "@atoms/atom";
import "./delete-menu.less";

const DeleteMenu = ({ action, children }) => {
  const id = action.id;
  const [Timeline, setTimeline] = useAtom(timelineAtom);
  
  const handleDeleteItem = (e) => {
    setTimeline(deleteItem(Timeline, id))
  }
  
  return (
    <Dropdown
      overlay={
        <div className="delete-menu">
          <Menu>
            <Menu.Item
              onClick={handleDeleteItem}
              className="danger-item"
            >
              削除
            </Menu.Item>
          </Menu>
        </div>
      }
      trigger={["contextMenu"]}
    >
      {children}
    </Dropdown>
  );
}

export default DeleteMenu;