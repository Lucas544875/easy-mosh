import { TimelineAction, TimelineEffect, TimelineRow } from '@xzdarcy/react-timeline-editor';
import videoControl from  './videoControl';

export const scaleWidth = 160;
export const scale = 5;
export const startLeft = 20;

export interface CustomTimelineAction extends TimelineAction {
  data: {
    src: string;
    name: string;
  };
}

export interface CusTomTimelineRow extends TimelineRow {
  actions: CustomTimelineAction[];
}

export const mockEffect: Record<string, TimelineEffect> = {
  effect: {
    id: 'effect',
    name: '動画',
    source: {
      enter: ({ action, engine, time, isPlaying }) => {
        const src = (action as CustomTimelineAction).data.src;
        videoControl.enter({src, startTime: action.start, time, engine,isPlaying });
      },
      update: ({ action, time }) => {
        videoControl.update({startTime: action.start, time });
      },
      leave: ({ action, time, isPlaying }) => {
        videoControl.leave({startTime: action.start, endTime: action.end, time, isPlaying });
      },
      stop: ({ action, time, isPlaying }) => {
        videoControl.stop({startTime: action.start, time, isPlaying });
      },
      start: ({ action, engine, time, isPlaying }) => {
        const src = (action as CustomTimelineAction).data.src;
        videoControl.enter({src, startTime: action.start, time, engine,isPlaying });
      },
    },
  },
};

export const mockData: CusTomTimelineRow[] = [
  {
    id: '1',
    actions: [
      {
        id: 'action4',
        start: 3,
        end: 8,
        effectId: 'effect', // 動画
        data: {
          src: '/movie/mov.mp4',
          name: '例1',
        },
      },
      {
        id: 'action5',
        start: 10,
        end: 15,
        effectId: 'effect', // 動画
        data: {
          src: '/movie/mov.mp4',
          name: '例2',
        },
      },
    ],
  },
];