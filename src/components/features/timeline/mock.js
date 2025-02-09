import videoControl from  './videoControl';

export const scaleWidth = 160;
export const scale = 5;
export const startLeft = 20;


export const mockEffect = {
  effect: {
    id: 'effect',
    name: '動画',
    source: {
      enter: ({ action, engine, time, isPlaying }) => {
        const src = (action).data.src;
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
        const src = (action).data.src;
        videoControl.enter({src, startTime: action.start, time, engine,isPlaying });
      },
    },
  },
};

export const mockData = [
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