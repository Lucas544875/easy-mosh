import React, { useState, useRef } from "react";
import { Slider } from 'antd';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const msecs = Math.floor((seconds - Math.floor(seconds)) * 100);
  return `${minutes}:${secs.toString().padStart(2, '0')}.${msecs.toString().padStart(2, '0')}`;
};

const Pmenu = ({videoSrc, name, setItemDuration, setItemData}) => {
  const [flameRangeValue, setFlameRangeValue] = useState(0);
  const [dulationRangeValue, setDulationRangeValue] = useState(5);
  const [videoDuration, setVideoDuration] = useState(100);
  const PreviewVideoRef = useRef(null);
  
  const handleLoadedMetadata = (e) => {
    setVideoDuration(e.target.duration);
  };

  const handleFlameSliderChange = (newValues) => {
    setFlameRangeValue(newValues);
    setItemData({
      src: videoSrc,
      name: name,
      flameTime: newValues
    });
    if (PreviewVideoRef.current) {
      PreviewVideoRef.current.currentTime = newValues;
    }
  };

  const handleDulationSliderChange = (newValues) => {
    setDulationRangeValue(newValues);
    setItemDuration(newValues);
  }
  
  return (
    <>
      {/* プレビューエリア */}
      <div className="flex justify-center">
        <video 
          ref={PreviewVideoRef}
          src={videoSrc}
          width="45%" 
          preload="metadata" 
          className='bg-black'
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>
      {/* フレーム指定のスライダー */}
      <div className="w-full px-4">
        <Slider
          min={0}
          max={videoDuration}
          step={0.01}
          value={flameRangeValue}
          onChange={handleFlameSliderChange}
          tipFormatter={(value) => formatTime(value)}
        />
      </div>
      <div>
        <div className="inline">
          {formatTime(flameRangeValue)}
        </div>
        <div className="inline" style={{ color: '#bbb' }}>
          /{formatTime(videoDuration)}
        </div>
      </div>
      {/* 長さ指定のスライダー */}
      <div className="w-full px-4">
        <Slider
          min={0}
          max={10}
          step={0.01}
          value={dulationRangeValue}
          onChange={handleDulationSliderChange}
          tipFormatter={(value) => formatTime(value)}
        />
      </div>
      <div>
        <div className="inline">
          {formatTime(dulationRangeValue)}
        </div>
      </div>
    </>
  );
}

export default Pmenu;