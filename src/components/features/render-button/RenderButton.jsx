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
  const { mergeVideos, isProcessing, rendoringTimeline, testProcess } 
    = useFfmpeg({
      videoRef:videoRef,
      messageRef:messageRef
    });
  
  const handleRender = () => {
    setIsModalOpen(true);
    const newData = sortTimeline(data);
    setData(newData);
    const actions = newData[0].actions;
    // console.log(actions);
    // mergeVideos(actions);
    rendoringTimeline(actions);
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
        title={isProcessing ? (<>レンダリング中 <LoadingOutlined style={{ verticalAlign: "middle" }} /></>) : "レンダリング結果"}
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
              <a href={!videoRef ? videoRef.current.src :""} download="output.mp4">
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
        <p className="m-2">
          ログ出力
        </p>
        <div className="bg-zinc-700 p-2">
          <p 
            // タイプライタ体にする
            ref = {messageRef}
            className="h-10 overflow-y-hidden"
            style={{fontFamily: "monospace"}}
          />

        </div>
      </Modal>
    </>
  )
}

export default RenderButton;