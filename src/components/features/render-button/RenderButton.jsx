import React, { useState } from "react";
import MyButton from "@common/button";
import { Tooltip, Modal, Button } from "antd";
import { useAtom } from 'jotai';
import { timelineAtom, sortTimeline } from '@atoms/atom';
import { useFfmpeg } from "./useFfmpeg";
import './modal.less';

const RenderButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useAtom(timelineAtom);
  const videoRef = React.useRef(null);
  const messageRef = React.useRef(null);
  const { mergeVideos, isProcessing } 
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
    videoRef.current.src = '';
    console.log('ok');
  }

  const handleCancel = () => {}

  const handleClose = () => {
    setIsModalOpen(false);
    videoRef.current.src = '';
  }

  return(   
    <>
      <Tooltip title="整列してレンダリング">
        <MyButton
          onClick={handleRender}
          className={`bg-zinc-600 text-white absolute bottom-4 right-4`}
        >
          レンダリング
        </MyButton>
      </Tooltip>
      <Modal
        title="レンダリング中"
        visible={isModalOpen}
        onOk={handleOk}
        // onCancel={handleCancel}
        className='modal'
        closable={false}
        footer={
          <>
            <Button key="back" onClick={handleClose}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={handleOk} disabled={isProcessing}>
              Download
            </Button>
          </>
        }
      >
        <video
          className="bg-black result-video"
          ref = {videoRef}
          controls
        />
        <p>レンダリング中…</p>
        <p ref = {messageRef}></p>
      </Modal>
    </>
  )
}

export default RenderButton;