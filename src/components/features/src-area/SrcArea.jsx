import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import SrcCard from "@features/src-area/SrcCard";
import { useAtom } from "jotai";
import { srcListAtom, addSrcItems, deleteItem } from "@atoms/srcListAtom";

const SrcAreaa = () => {
  const [videos, setVideos] = useAtom(srcListAtom);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newList = addSrcItems(videos, files);
    setVideos(newList);
  };

  const deleteVideo = (id) => {
    setVideos(deleteItem(videos, id));
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
      <label htmlFor="video-upload" className="absolute bottom-4 right-4 bg-zinc-500 p-3 rounded-full cursor-pointer hover:bg-zinc-400">
        <PlusOutlined style={{ fontSize: "24px", color: "black" }} />
      </label>
    </div>
  );
};

export default SrcAreaa;
