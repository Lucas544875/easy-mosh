import React, { useState } from 'react';
import { Card, CardContent } from "@common/card";
import Button from "@common/button";
import SrcArea from './SrcArea';
import Timeline from './Timeline';
import Preview from './Preview';

const DatamoshEditor = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="flex-1 p-4 space-y-4 text-white bg-slate-950">
      {/* Main Content Section */}
      <div className="grid grid-cols-4 gap-4">
        {/* Video Data Section */}
        <SrcArea setSelectedVideo={setSelectedVideo} setVideos={setVideos} videos={videos} />
        {/* Preview Section */}
        <div className="col-span-3 space-y-4">
          <Preview selectedVideo={selectedVideo} />
          {/* Timeline Section */}
          <Timeline videos={videos} />
        </div>
      </div>

      {/* Render Button Section */}
      {/* <footer className="flex justify-end p-4 border-t">
        <Button className="bg-blue-500 text-white">レンダリング</Button>
      </footer> */}
    </div>
  );
}

export default DatamoshEditor;