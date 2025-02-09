import { Timeline, TimelineState } from '@xzdarcy/react-timeline-editor';
import { cloneDeep } from 'lodash';
import React, { useRef, useState } from 'react';
import { CustomRender2 } from './custom';
import './index.less';
import { CustomTimelineAction, CusTomTimelineRow, mockData, mockEffect, scale, scaleWidth, startLeft } from './mock';
import TimelinePlayer from './player';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const timelineState = useRef<TimelineState>();

  return (
    <div className="timeline-editor-engine">
      <video id="video-1" className="video" style={{height: "300px"}} controls></video>
      <TimelinePlayer timelineState={timelineState}/>
      <Timeline
        scale={scale}
        scaleWidth={scaleWidth}
        startLeft={startLeft}
        autoScroll={true}
        ref={timelineState}
        editorData={data}
        effects={mockEffect}
        onChange={(data) => {
          setData(data as CusTomTimelineRow[]);
        }}
        getActionRender={(action, row) => {
          if (action.effectId === 'effect') {
            return <CustomRender2 action={action as CustomTimelineAction} row={row as CusTomTimelineRow} />;
          }
        }}
      />
    </div>
  );
};

export default TimelineEditor;