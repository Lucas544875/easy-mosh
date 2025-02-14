import React, { useState } from 'react';
import { Button, Modal, Slider, Radio} from 'antd';
import MyButton from "@common/button";
import "./modal.less"

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const options = [
  {
    label: 'copy',
    value: 'copy',
  },
  {
    label: 'I-substitute',
    value: 'I-substitute',
  },
  {
    label: 'P-duplicate',
    value: 'P-duplicate',
  },
];

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
        className='modal'
      >
        <div className="flex flex-col items-center w-full gap-4">
          <Radio.Group
            block
            options={options}
            defaultValue="copy"
            optionType="button"
            buttonStyle="solid"
          />
          {/* プレビューエリア */}
          <div className="flex justify-between">
            <video 
              src={videoSrc}
              width="45%" 
              preload="metadata" 
              className='bg-black'
            />
            <video 
              src={videoSrc}
              width="45%" 
              preload="metadata" 
              className='bg-black'
            />
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
              tipFormatter={(value) => formatTime(value)}
            />
          </div>
          <div className="mt-2">開始: {formatTime(values[0])} | 終了: {formatTime(values[1])}</div>
        </div>
      </Modal>
    </>
  );
};

export default SrcCardModal;
