import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import MyButton from "@common/button";

const SrcCardModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <MyButton className="bg-zinc-500" onClick={showModal}>
        タイムラインに追加
      </MyButton>
      <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default SrcCardModal;