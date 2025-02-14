import { Timeline } from '@xzdarcy/react-timeline-editor';
import React, { useRef } from 'react';
import { useAtom } from 'jotai';
import { timelineAtom, normalizeTimeline } from '@atoms/atom';
import { CustomRender } from './TilmelineElemeent';
import { effectList, scale, scaleWidth, startLeft } from './DefaultData';
import ControlPanel from '@features/control-panel/ControlPanel';
import RenderButton from '@features/render-button/RenderButton';

// const defaultEditorData = cloneDeep(defaultData);


const TimelineEditor = () => {
  // const [data, setData] = useState(defaultEditorData);
  const [data, setData] = useAtom(timelineAtom);
  const timelineState = useRef();

  return (
    <>
      <div className="h-1/2 p-4 flex justify-center items-center relative">
        <video id="video-1" className="video bg-black" style={{height:"40vh"}}/>
        <RenderButton
          className="absolute bottom-4 right-4"
          timelineState={timelineState}
        />
      </div>
      <div className="h-1/2">
        <ControlPanel timelineState={timelineState}/>
        <Timeline
          scale={scale}
          scaleWidth={scaleWidth}
          startLeft={startLeft}
          autoScroll={true}
          ref={timelineState}
          editorData={data}
          effects={effectList}
          dragLine={true} //スナップが効くように
          onChange={(data) => {
            setData(normalizeTimeline(data));
          }}
          getActionRender={(action, row) => {
            if (action.effectId === 'copy') {
              return <CustomRender action={action} row={row} />;
            }
          }}
        />
      </div>
    </>
  );
};

export default TimelineEditor;