import { range } from "lodash";
import React, { useEffect, useRef, useState } from "react";

const ImageStrip = ({ action, frameCount = 5 }) => {
  const src = action.data.src;
  const videoRef = useRef(null);
  const [thumbnail, setThumbnail] = useState([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = async () => {
      const flameTime = action.data.flameTime;
      const thumbnail = await captureFrame(video, flameTime);
      setThumbnail(thumbnail);
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

      <div style={{ 
        display: "flex",
        overflowX: "clip",
        gap: "4px",
      }}>
        {range(frameCount).map((index) => (
          <img
            key={index}
            src={thumbnail}
            alt={`frame-${index}`}
            style={{ 
              width: 160,
              height: 92,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageStrip;