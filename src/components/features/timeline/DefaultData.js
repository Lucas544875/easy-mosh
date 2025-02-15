import videoControl from  './videoControl';

export const scaleWidth = 160;
export const scale = 5;
export const startLeft = 20;


export const effectList = {
  copy: {
    id: 'copy',
    name: '動画',
    source: {
      enter: ({ action, engine, time, isPlaying }) => {
        const src = (action).data.src;
        const cripStart = (action).data.cripStart;
        videoControl.enter({src, startTime: action.start, time, engine,isPlaying, cripStart });
      },
      update: ({ action, time }) => {
        const cripStart = action.data.cripStart;
        videoControl.update({startTime: action.start, time, cripStart });
      },
      leave: ({ action, time, isPlaying }) => {
        const cripStart = action.data.cripStart;
        videoControl.leave({startTime: action.start + action.data.cripStart, endTime: action.end, time, isPlaying, cripStart });
      },
      stop: ({ action, time, isPlaying }) => {
        const cripStart = action.data.cripStart;
        videoControl.stop({startTime: action.start, time, isPlaying, cripStart });
      },
      start: ({ action, engine, time, isPlaying }) => {
        const src = (action).data.src;
        const cripStart = action.data.cripStart;
        videoControl.enter({src, startTime: action.start, time, engine,isPlaying, cripStart });
      },
    },
  },
};
