import React, { useState } from "react";
import { Card, CardContent } from "@common/card";
import Plus from "../../../assets/plus.svg";

const SrcAreaa = () => {
  const [videos, setVideos] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newVideos = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setVideos((prev) => [...prev, ...newVideos]);
  };

  return (
    <div className="relative h-full">
      <div className="grid grid-cols-2 gap-4">
        {videos.map((video, index) => (
          <Card key={index} className="p-2">
            <CardContent className="flex flex-col items-center">
              <video src={video.url} className="w-full h-auto" controls poster={video.url} />
              <p className="text-center mt-2">{video.name}</p>
            </CardContent>
          </Card>
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
