import React, { useState } from 'react';
import SrcArea from './SrcArea';
import Preview from './Preview';
import Timeline from './Timeline';

const DatamoshEditor = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="flex-1 p-4 space-y-4 text-white bg-slate-950">
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-1 space-y-4 ">
          {/* Source Area */}
          <SrcArea 
            setSelectedVideo = {setSelectedVideo}
            setVideos = {setVideos}
            videos = {videos} 
          />
        </div>
        <div className="col-span-3 space-y-4">
          {/* Preview Section */}
          <div className="h-1/2">
            <Preview selectedVideo={selectedVideo} />
          </div>
          {/* Timeline Section */}
          <div className="h-1/2">
            <Timeline videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatamoshEditor;