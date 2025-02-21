import React, { useState } from "react";
import Button from "@common/button";
import { Tooltip, Modal } from "antd";
import { useAtom } from 'jotai';
import { timelineAtom } from '@atoms/atom';
import { useFfmpeg } from "./useFfmpeg";
import './modal.less';

const RenderButton = ({className}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useAtom(timelineAtom);
  const videoRef = React.useRef(null);
  const messageRef = React.useRef(null);
  const { load, loaded, transcode } = useFfmpeg({videoRef:videoRef, messageRef:messageRef});
  
  const handleRender = () => {
    setIsModalOpen(true);
    console.log(data);
    const videoUrls = data[0].actions.map((action) => action.data.src);
    console.log(videoUrls);
    (async function () {
      await load();
      console.log(loaded);
      transcode();
    }())
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
          className={`bg-zinc-600 text-white ${className}`}
        >
          レンダリング
        </Button>
      </Tooltip>
      <Modal
        title="レンダリング結果"
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