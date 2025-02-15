import React, { useEffect, useRef, useState } from "react";

const VideoFilmStrip = ({ action, frameCount = 5 }) => {
  const src = action.data.src;
  const videoRef = useRef(null);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = async () => {
      const cripStart = action.data.cripStart;
      const cripEnd = action.data.cripEnd;
      const duration = cripEnd - cripStart;
      // 例: frameCount で指定した枚数だけ等間隔に切り出す
      const interval = duration / frameCount;

      const newThumbnails = [];
      for (let i = 0; i < frameCount; i++) {
        // i 番目のサムネイルを取得する時間（秒）
        const time = interval * i + cripStart;
        const thumbnail = await captureFrame(video, time);
        newThumbnails.push(thumbnail);
      }
      setThumbnails(newThumbnails);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [src, frameCount]);

  // 指定時間にシークして、canvas に描画 → 画像を取得する関数
  const captureFrame = (video, time) => {
    return new Promise((resolve) => {
      const onSeeked = () => {
        // canvas に描画
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Data URL を取得
        const dataURL = canvas.toDataURL("image/png");
        video.removeEventListener("seeked", onSeeked);
        resolve(dataURL);
      };

      // シーク完了時に onSeeked を呼ぶ
      video.addEventListener("seeked", onSeeked);
      // 指定時間へ移動
      video.currentTime = time;
    });
  };

  return (
    <div>
      {/* 実際の再生には表示しないようスタイルで隠しておいてよい */}
      <video
        ref={videoRef}
        src={src}
        style={{ display: "none" }}
        preload="metadata"
      />

      <div style={{ display: "flex", overflowX: "clip", gap: "8px" }}>
        {thumbnails.map((thumb, index) => (
          <img
            key={index}
            src={thumb}
            alt={`frame-${index}`}
            style={{ maxHeight: 100 }}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoFilmStrip;