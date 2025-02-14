import React, { useState, useRef } from 'react';
import { Modal, Slider, Radio } from 'antd';
import MyButton from "@common/button";
import "./modal.less";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const options = [
  { label: 'copy', value: 'copy' },
  { label: 'I-substitute', value: 'I-substitute' },
  { label: 'P-duplicate', value: 'P-duplicate' },
];

const SrcCardModal = ({ videoSrc }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rangeValues, setRangeValues] = useState([0, 0]);
  const [duration, setDuration] = useState(100);
  const startPreviewVideoRef = useRef(null);
  const endPreviewVideoRef = useRef(null);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const handleLoadedMetadata = (e) => {
    const videoDuration = e.target.duration;
    setDuration(videoDuration);
    setRangeValues([0, videoDuration]);
  };

  const handleSliderChange = (newValues) => {
    setRangeValues(newValues);
    if (startPreviewVideoRef.current) {
      startPreviewVideoRef.current.currentTime = newValues[0];
    }
    if (endPreviewVideoRef.current) {
      endPreviewVideoRef.current.currentTime = newValues[1];
    }
  };

  return (
    <>
      <MyButton className="bg-zinc-500" onClick={showModal}>
        タイムラインに追加
      </MyButton>
      <Modal
        title="タイムラインに追加する動画の区間を選択"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className='modal'
      >
        <div className="flex flex-col items-center w-full gap-4">
          {/* モード選択 */}
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
              ref={startPreviewVideoRef}
              src={videoSrc}
              width="45%" 
              preload="metadata" 
              className='bg-black'
              onLoadedMetadata={handleLoadedMetadata}
            />
            <video 
              ref={endPreviewVideoRef}
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
              max={duration}
              step={0.1}
              value={rangeValues}
              onChange={handleSliderChange}
              tipFormatter={(value) => formatTime(value)}
            />
          </div>
          <div>
            <div className="mt-2 inline">
              {formatTime(rangeValues[0])}~{formatTime(rangeValues[1])}
            </div>
            <div className="inline" style={{ color: '#bbb' }}>
              /{formatTime(duration)}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SrcCardModal;
