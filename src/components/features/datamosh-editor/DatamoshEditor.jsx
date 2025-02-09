import React, { useState } from 'react';
import SrcArea from '@features/src-area/SrcArea';
import TimelineEditor from '@features/timeline/Timeline';

const DatamoshEditor = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="flex-1 text-white bg-zinc-950">
      <div className="grid grid-cols-3 h-full">
        <div className="col-span-1 border-r p-4">
          {/* Source Area */}
          <SrcArea />
        </div>
        <div className="col-span-2 timeline-editor-engine">
          <TimelineEditor/>
        </div>
      </div>
    </div>
  );
}

export default DatamoshEditor;