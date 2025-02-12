import React, { useState } from 'react';
import { Button, Modal, Slider } from 'antd';
import MyButton from "@common/button";

const SrcCardModal = ({ videoSrc }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState([0, 100]); // 初期値: [開始, 終了]

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
      <Modal
        title="動画の区間選択"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col items-center w-full">
          {/* プレビューエリア */}
          <div className="flex justify-between w-full mb-4">
            <video src={videoSrc} controls width="45%" preload="metadata" style={{ border: '1px solid #ccc' }} />
            <video src={videoSrc} controls width="45%" preload="metadata" style={{ border: '1px solid #ccc' }} />
          </div>

          {/* スライダー */}
          <div className="w-full px-4">
            <Slider
              range
              min={0}
              max={100}
              step={1}
              value={values}
              onChange={(newValues) => setValues(newValues)}
            />
          </div>
          <div className="mt-2">開始: {values[0]} | 終了: {values[1]}</div>
        </div>
      </Modal>
    </>
  );
};

export default SrcCardModal;
