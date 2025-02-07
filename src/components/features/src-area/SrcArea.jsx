import React, { useState } from "react";
import SrcCard from "@features/src-area/SrcCard";
import Plus from "@assets/plus.svg";

const SrcAreaa = () => {
  const [videos, setVideos] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newVideos = files.map((file) => ({
      id: Date.now(),
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setVideos((prev) => [...prev, ...newVideos]);
  };

  const deleteVideo = (id) => {
    setVideos((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <div className="relative h-full">
      <div className="grid grid-cols-2 gap-4"
      style={{
        // 要レスポンシブ対応
        maxHeight: "calc(100vh - 106px)",
        overflow: "auto"
      }}
      > 
        {videos.map((video) => (
          <SrcCard
            key={video.id}
            src={video.url}
            name={video.name}
            onDelete={() => deleteVideo(video.id)}
          />
        ))}
      </div>
      <input
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        id="video-upload"
        onChange={handleFileChange}
      />
      <label htmlFor="video-upload" className="absolute bottom-4 right-4 bg-slate-500 p-3 rounded-full cursor-pointer hover:bg-slate-400">
        <img
          src={Plus}
          alt="plus"
          width={24}
          height={24}
        />
      </label>
    </div>
  );
};

export default SrcAreaa;
