import React, { useState, useRef } from "react";
import { Slider } from 'antd';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const msecs = Math.floor((seconds - Math.floor(seconds)) * 100);
  return `${minutes}:${secs.toString().padStart(2, '0')}.${msecs.toString().padStart(2, '0')}`;
};

const CImenu = ({videoSrc, name, setItemDuration, setItemData}) => {
  const [rangeValues, setRangeValues] = useState([0, 0]);
  const [duration, setDuration] = useState(100);
  const startPreviewVideoRef = useRef(null);
  const endPreviewVideoRef = useRef(null);
  
  const handleLoadedMetadata = (e) => {
    const videoDuration = e.target.duration;
    setDuration(videoDuration);
    setRangeValues([0, videoDuration]);
    if (endPreviewVideoRef.current) {
      endPreviewVideoRef.current.currentTime = videoDuration;
    }
  };

  const handleSliderChange = (newValues) => {
    setRangeValues(newValues);
    setItemDuration(newValues[1] - newValues[0]);
    setItemData({
      src: videoSrc,
      name: name,
      cripStart: newValues[0],
      cripEnd: newValues[1],
    });
    if (startPreviewVideoRef.current) {
      startPreviewVideoRef.current.currentTime = newValues[0];
    }
    if (endPreviewVideoRef.current) {
      endPreviewVideoRef.current.currentTime = newValues[1];
    }
  };
  
  return (
    <>
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
          step={0.01}
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
    </>
  );
}

export default CImenu;