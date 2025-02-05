import React from "react";

const Timeline = ({videos}) => (
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
)

export default Timeline;