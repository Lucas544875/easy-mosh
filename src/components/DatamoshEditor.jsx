import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DatamoshEditor = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

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
    <div className="p-4 space-y-4">
      {/* Header Section */}
      <header className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <div className="text-lg font-bold">ロゴ</div>
        <nav className="flex space-x-4">
          <Button>編集</Button>
          <Button>使い方</Button>
        </nav>
      </header>

      {/* Main Content Section */}
      <div className="grid grid-cols-4 gap-4">
        {/* Video Data Section */}
        <div className="col-span-1 space-y-4">
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
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
        </div>

        {/* Preview Section */}
        <div className="col-span-3 space-y-4">
          <h2 className="text-xl font-semibold">プレビュー</h2>
          {selectedVideo ? (
            <div>
              <video
                controls
                src={selectedVideo.url}
                className="w-full h-auto border rounded-lg"
              ></video>
              <div className="flex justify-center space-x-4 mt-2">
                <Button>◀️</Button>
                <Button>⏸</Button>
                <Button>▶️</Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">動画を選択してください</p>
          )}

          {/* Timeline Section */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">タイムライン</h2>
            <div className="flex space-x-2 border p-2 rounded-lg">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-gray-300"
                >
                  {video.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Render Button Section */}
      <footer className="flex justify-end p-4 border-t">
        <Button className="bg-blue-500 text-white">レンダリング</Button>
      </footer>
    </div>
  );
}

export default DatamoshEditor;