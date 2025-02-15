import React, { useRef, useEffect, useState } from "react";
import VideoFilmStrip from "./VideoFilmStlip";

export const CopyRender = ({ action }) => {
  const itemRef = useRef(null);
  const [frameCount, setFrameCount] = useState(5);

  useEffect(() => {
    const updateFrameCount = () => {
      if (itemRef.current) {
        const width = itemRef.current.getBoundingClientRect().width;
        // console.log("width:", width);
        const newFrameCount = Math.floor(width / 160) + 1;
        // console.log("calculated frameCount:", newFrameCount);
        setFrameCount(newFrameCount);
      }
    };

    updateFrameCount(); // 初回実行

    // リサイズ時に更新
    // window.addEventListener("resize", updateFrameCount);
    // return () => window.removeEventListener("resize", updateFrameCount);
  }, []);

  return (
    <div ref={itemRef}>
      <VideoFilmStrip action={action} frameCount={frameCount} />
    </div>
  );
};
