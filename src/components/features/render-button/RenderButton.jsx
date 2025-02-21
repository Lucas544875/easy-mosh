import React, { useState } from "react";
import Button from "@common/button";
import { Tooltip, Modal } from "antd";
import { useAtom } from 'jotai';
import { timelineAtom, sortTimeline } from '@atoms/atom';
import { useFfmpeg } from "./useFfmpeg";
import './modal.less';

const RenderButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useAtom(timelineAtom);
  const videoRef = React.useRef(null);
  const messageRef = React.useRef(null);
  const { load, loaded, transcode, mergeVideos } 
    = useFfmpeg({
      videoRef:videoRef,
      messageRef:messageRef
    });
  
  const handleRender = () => {
    setIsModalOpen(true);
    const actions = data[0].actions;
    setData(sortTimeline(data));
    mergeVideos(actions);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  return(   
    <>
      <Tooltip title="整列してレンダリング">
        <Button 
          onClick={handleRender}
          className={`bg-zinc-600 text-white absolute bottom-4 right-4`}
        >
          レンダリング
        </Button>
      </Tooltip>
      <Modal
        title="レンダリング中"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className='modal'
      >
        <video
          className="bg-black result-video"
          ref = {videoRef}
          controls
        />
        <p ref = {messageRef}></p>
      </Modal>
    </>
  )
}

export default RenderButton;