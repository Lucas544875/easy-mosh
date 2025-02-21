import React, { useState } from "react";
import MyButton from "@common/button";
import { Tooltip, Modal, Button } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
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
  }

  const handleCancel = () => {}

  const handleClose = () => {
    setIsModalOpen(false);
    videoRef.current.src = '';
  }

  return(   
    <>
      <Tooltip title="間隔を削除してレンダリング">
        <MyButton
          onClick={handleRender}
          className={`bg-zinc-600 text-white absolute bottom-4 right-4`}
        >
          レンダリング
        </MyButton>
      </Tooltip>
      <Modal
        title={isProcessing ? "レンダリング中" : "レンダリング結果"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className='modal'
        closable={false}
        footer={
          <>
            <Button key="back" onClick={handleClose}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={handleOk} disabled={isProcessing}>
              <a href={videoRef.current.src} download="output.mp4">
                Download
              </a>
            </Button>
          </>
        }
      >
        <video
          className="bg-black result-video"
          ref = {videoRef}
          controls
        />
        <p>レンダリング中…
          <LoadingOutlined />
        </p>
        <p ref = {messageRef}></p>
      </Modal>
    </>
  )
}

export default RenderButton;