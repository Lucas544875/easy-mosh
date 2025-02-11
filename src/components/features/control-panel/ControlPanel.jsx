import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React, {useEffect, useState } from "react";

const { Option } = Select;
export const Rates = [0.2, 0.5, 1.0, 1.5, 2.0];

const ControlPanel= ({ timelineState}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!timelineState.current) return;
    const engine = timelineState.current;
    engine.listener.on("play", () => setIsPlaying(true));
    engine.listener.on("paused", () => setIsPlaying(false));
    engine.listener.on("afterSetTime", ({ time }) => setTime(time));
    engine.listener.on("setTimeByTick", ({ time }) => {
      setTime(time);

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
    </div>
  );
};

export default ControlPanel;
