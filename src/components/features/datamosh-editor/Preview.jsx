import React from "react";

const Preview = ({selectedVideo}) => (
  <>
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
  </>
)

export default Preview;