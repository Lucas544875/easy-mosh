import React, { useState } from 'react';
import SrcArea from '@features/src-area/SrcArea';
import Preview from '@features/preview/Preview';
import Timeline from '@features/timeline/Timeline';

const DatamoshEditor = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="flex-1 text-white bg-slate-950">
      <div className="grid grid-cols-3 h-full">
        <div className="col-span-1 border-r p-4">
          {/* Source Area */}
          <SrcArea />
        </div>
        <div className="col-span-2">
          {/* Preview Section */}
          <div className="h-1/2 p-4 border-b">
            <Preview selectedVideo={selectedVideo} />
          </div>
          {/* Timeline Section */}
          <div className="h-1/2 p-4">
            <Timeline videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatamoshEditor;