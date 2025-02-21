import React from "react";
import Button from "@common/button";
import { Tooltip } from "antd";
import { useAtom } from 'jotai';
import { timelineAtom } from '@atoms/atom';
// import { useVideoMerger } from './useVideoMerger';

const RenderButton = ({className}) => {
  const [data, setData] = useAtom(timelineAtom);
  // const { mergeVideos, outputUrl } = useVideoMerger();
  
  const handleRender = () => {
    console.log(data);
    const videoUrls = data[0].actions.map((action) => action.data.src);
    console.log(videoUrls);
    // mergeVideos(videoUrls);
    // console.log(outputUrl);
  }

  return(   
    <Tooltip title="整列してレンダリング">
      <Button 
        onClick={handleRender}
        className={`bg-zinc-600 text-white ${className}`}
      >
        レンダリング
      </Button>
    </Tooltip>
  )
}

export default RenderButton;