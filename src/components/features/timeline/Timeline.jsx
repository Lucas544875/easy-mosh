import React from "react";
import { Timeline } from '@xzdarcy/react-timeline-editor';

const mockData= [{
    id: "0",
    actions: [
      {
        id: "action00",
        start: 0,
        end: 2,
        effectId: "effect0",
      },
    ],
  },
  {
    id: "1",
    actions: [
      {
        id: "action10",
        start: 1.5,
        end: 5,
        effectId: "effect1",
      }
    ],
}]

const mockEffect= {
  effect0: {
    id: "effect0",
    name: "効果0",
  },
  effect1: {
    id: "effect1",
    name: "効果1",
  },
};

const TimelineEditor = ({videos}) => (
  <div className="space-y-2">
    <h2 className="text-xl font-semibold">タイムライン</h2>
    <Timeline
      editorData={mockData}
      effects={mockEffect}
    />
  </div> 
)

export default TimelineEditor;