import { Timeline } from '@xzdarcy/react-timeline-editor';
import { cloneDeep } from 'lodash';
import React, { useRef, useState } from 'react';
import { CustomRender } from './custom';
import './index.less';
import {mockData, mockEffect, scale, scaleWidth, startLeft } from './mock';
import TimelinePlayer from './player';
import RenderButton from './RenderButton';

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
  const [data, setData] = useState(defaultEditorData);
  const timelineState = useRef();

  return (
    <>
      <div className="h-1/2 p-4 border-b flex justify-center items-center relative">
        <video id="video-1" className="video bg-black"/>
        <RenderButton
          className="absolute bottom-4 right-4"
          timelineState={timelineState}
        />
      </div>
      <div className="h-1/2">
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
            setData(data);
          }}
          getActionRender={(action, row) => {
            if (action.effectId === 'effect') {
              return <CustomRender action={action} row={row} />;
            }
          }}
        />
      </div>
    </>
  );
};

export default TimelineEditor;