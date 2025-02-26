import React from "react";
import { Dropdown, Menu } from "antd";
import { useAtom } from 'jotai';
import { timelineAtom, deleteItem, copyItem } from "@atoms/atom";
import "./delete-menu.less";
import videoControl from "../videoControl";

const DeleteMenu = ({ action, children }) => {
  const id = action.id;
  const [Timeline, setTimeline] = useAtom(timelineAtom);
  
  const handleDeleteItem = (e) => {
    // プレビューを正常終了する処理
    const src = (action).data.src;
    videoControl.delete(src)
    // プレビューを正常終了したら、以下の処理を実行
    setTimeline(deleteItem(Timeline, id))
  }
  
  const handleCopyItem = (e) => {
    setTimeline(copyItem(Timeline, id))
  }

  return (
    <Dropdown
      overlay={
        <div className="delete-menu">
          <Menu>
            <Menu.Item
              onClick={handleCopyItem}
            >
              コピー
            </Menu.Item>
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