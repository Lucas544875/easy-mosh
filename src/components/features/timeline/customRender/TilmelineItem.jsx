import React, { useRef, useEffect, useState } from "react";
import VideoFilmStrip from "./VideoFilmStlip";
import ImageStrip from "./ImageStrip";
import DeleteMenu from "./DeleteMenu";

export const CopyRender = ({ action }) => (
  <CustomRender action={action} type="copy" color="#2470a0" />
)

export const ISubRender = ({ action }) => (
  <CustomRender action={action} type="I-substitute" color="#a696c8" />
)

export const PDupRender = ({ action }) => (
  <CustomRender action={action} type="P-duplicate" color="#fad3cf" />
)
const CustomRender = ({ action, type, color }) => {
  const itemRef = useRef(null);
  const [frameCount, setFrameCount] = useState(5);

  useEffect(() => {
    const updateFrameCount = () => {
      if (itemRef.current) {
        const width = itemRef.current.getBoundingClientRect().width;
        // console.log("width:", width);
        const newFrameCount = Math.ceil(width / 162);
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
    <DeleteMenu
      action = {action}
    >
      <div
        ref={itemRef}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          backgroundColor: "#191b1d",
          border: `4px solid ${color}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "10px",
            left: "0%",
            backgroundColor: color,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "25%",
              borderRadius: 5,
              height: "50%",
              width: "5px",
              left: "0%",
              backgroundColor: "#191b1d",
            }}
          />
        </div>
        {type === "P-duplicate"
          ?<ImageStrip action={action} frameCount={frameCount}
          style={{
            position: "absolute",
          }}
          />
          :<VideoFilmStrip action={action} frameCount={frameCount}
            style={{
              position: "absolute",
            }}
          />
        }
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "10px",
            right: "0%",
            top: "0%",
            backgroundColor: color,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "25%",
              borderRadius: 5,
              height: "50%",
              width: "5px",
              right: "0%",
              backgroundColor: "#191b1d",
            }}
          />
        </div>
      </div>
    </DeleteMenu>
  );
};
