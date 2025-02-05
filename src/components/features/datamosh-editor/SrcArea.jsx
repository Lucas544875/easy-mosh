import React from "react";
import Button from "@common/button";
import { Card, CardContent } from "@common/card";

const SrcArea = ({setVideos, setSelectedVideo, videos}) => {

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const videoFiles = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setVideos([...videos, ...videoFiles]);
  };

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };
  
  return (
    <>
      <input
        type="file"
        accept="video/*"
        multiple
        onChange={handleFileUpload}
        className=""
        id="video-upload"
      />
      <label htmlFor="video-upload" className="cursor-pointer">
        <Button>動画を追加</Button>
      </label>
      <div className="flex flex-col gap-2">
        {videos.map((video, index) => (
          <Card
            key={index}
            className={`cursor-pointer p-2 ${
              selectedVideo === video ? 'border-blue-500' : 'border-gray-300'
            } border-2 rounded-lg`}
            onClick={() => selectVideo(video)}
          >
            <CardContent>
              <p>{video.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default SrcArea;