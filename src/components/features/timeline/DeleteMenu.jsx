import React from "react";
import { Dropdown, Menu } from "antd";
import { useAtom } from 'jotai';
import { timelineAtom, deleteItem } from "@atoms/atom";

const DeleteMenu = ({ action, children }) => {
  const id = action.id;
  const [Timeline, setTimeline] = useAtom(timelineAtom);
  
  const handleDeleteItem = (e) => {
    setTimeline(deleteItem(Timeline, id))
  }
  
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item
            onClick={handleDeleteItem}
          >
            削除
          </Menu.Item>
        </Menu>
      }
      trigger={["contextMenu"]}
    >
      {children}
    </Dropdown>
  );
}

export default DeleteMenu;