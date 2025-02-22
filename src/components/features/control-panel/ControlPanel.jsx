import { CaretRightOutlined, PauseOutlined, MergeCellsOutlined } from "@ant-design/icons";
import { Select, Tooltip } from "antd";
import React, {useEffect, useState } from "react";
import { useAtom } from 'jotai';
import { timelineAtom, sortTimeline } from '@atoms/atom';
import {scale, scaleWidth, startLeft} from '../timeline/DefaultData';

const { Option } = Select;
export const Rates = [0.2, 0.5, 1.0, 1.5, 2.0];

const ControlPanel= ({ timelineState}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [data, setData] = useAtom(timelineAtom);

  useEffect(() => {
    if (!timelineState.current) return;
    const engine = timelineState.current;
    engine.listener.on("play", () => setIsPlaying(true));
    engine.listener.on("paused", () => setIsPlaying(false));
    engine.listener.on("afterSetTime", ({ time }) => setTime(time));
    engine.listener.on("setTimeByTick", ({ time }) => {
      setTime(time);
      const autoScrollFrom = 1000;
      const left = time * (scaleWidth / scale) + startLeft - autoScrollFrom;
      timelineState.current.setScrollLeft(left)
    });
    
    return () => {
      if (!engine) return;
      engine.pause();
      engine.listener.offAll();
    };
  }, []);

  // 再生または一時停止
  const handlePlayOrPause = () => {
    if (!timelineState.current) return;
    if (timelineState.current.isPlaying) {
      timelineState.current.pause();
    } else {
      timelineState.current.play({ autoEnd: true });
    }
  };

  // 再生速度の設定
  const handleRateChange = (rate) => {
    if (!timelineState.current) return;
    timelineState.current.setPlayRate(rate);
  };

  // 時間表示
  const timeRender = (time) => {
    const float = (parseInt((time % 1) * 100 + "") + "").padStart(2, "0");
    const min = (parseInt(time / 60 + "") + "").padStart(2, "0");
    const second = (parseInt((time % 60) + "") + "").padStart(2, "0");
    return <>{`${min}:${second}.${float.replace("0.", "")}`}</>;
  };

  const handleSort = () => {
    setData(sortTimeline(data));
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // スクロール防止
        handlePlayOrPause();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePlayOrPause]);

  return (
    <div className="timeline-player">
      <div className="play-control" onClick={handlePlayOrPause}>
        {isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
      </div>
      <div className="time">{timeRender(time)}</div>
      <div className="rate-control">
        <Select
          size={"small"}
          defaultValue={1}
          style={{ width: 120 }}
          onChange={handleRateChange}
        >
          {Rates.map((rate) => (
            <Option key={rate} value={rate}>{`${rate.toFixed(1)}倍速`}</Option>
          ))}
        </Select>
      </div>
      <Tooltip title="間隔の削除">
        <MergeCellsOutlined onClick={handleSort}/>
      </Tooltip>
    </div>
  );
};

export default ControlPanel;
