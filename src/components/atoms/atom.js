import { atom } from "jotai";
import { cloneDeep } from "lodash";

const defaultData = [
  {
    id: '1',
    actions: [
      // {
      //   id: Date.now()-1000,
      //   start: 1,
      //   end: 6,
      //   effectId: 'copy', // 動画
      //   flexible: false,
      //   data: {
      //     src: '/src/assets/mov.mp4',
      //     name: '例1',
      //     cripStart: 0,
      //     cripEnd: 5
      //   },
      // },
      // {
      //   id: Date.now()-2000,
      //   start: 10,
      //   end: 15,
      //   flexible: false,
      //   effectId: 'copy', // 動画
      //   data: {
      //     src: '/src/assets/mov.mp4',
      //     name: '例2',
      //     cripStart: 0,
      //     cripEnd: 5
      //   },
      // },
      // {
      //   id: Date.now()-3000,
      //   start: 15,
      //   end: 20,
      //   flexible: false,
      //   effectId: "P-duplicate",
      //   data: {
      //     src: '/src/assets/mov.mp4',
      //     name: '例3',
      //     flameTime: 0
      //   }
      // },
      // {
      //   id: Date.now()-4000,
      //   start: 20,
      //   end: 25,
      //   flexible: false,
      //   effectId: "I-substitute",
      //   data: {
      //     src: '/src/assets/mov.mp4',
      //     name: '例4',
      //     cripStart: 0,
      //     cripEnd: 5
      //   },
      // },
    ],
  },
];

export const timelineAtom = atom(defaultData);

export const normalizeTimeline = (timelineData) => {
  // 重複があれば重複したアイテムのうち開始時間が最も早いものを重複したアイテムの内次に開始時間が早いものの直後に。これを再帰的に繰り返す
  const actions = cloneDeep(timelineData[0].actions);
  actions.sort((a, b) => a.start - b.start);
  for (let i = 0; i < actions.length-1; i++) {
    if (actions[i+1].start < actions[i].end) {
      const first_duration = actions[i].end - actions[i].start;
      const second_duration = actions[i+1].end - actions[i+1].start;
      const start = actions[i].start;
      actions[i+1].start = start;
      actions[i+1].end = start + second_duration;
      actions[i].start = start + second_duration;
      actions[i].end = start + first_duration + second_duration;
      const tmp = actions[i];
      actions[i] = actions[i+1];
      actions[i+1] = tmp;
    }
  }

  const newTimelineData = [{
    id: '1',
    actions: actions
  }];
  
  return newTimelineData;
}

export const sortTimeline = (timelineData) => {
  // タイムラインの空白を削除
  const actions = cloneDeep(timelineData[0].actions);
  actions.sort((a, b) => a.start - b.start);
  let startTime = 0;
  for (let i = 0; i < actions.length; i++) {
    if (actions[i].start > startTime) {
      const duration = actions[i].end - actions[i].start;
      actions[i].start = startTime;
      actions[i].end = startTime + duration;
    }
    startTime = actions[i].end;
  }

  const newTimelineData = [{
    id: '1',
    actions: actions
  }];
  
  return newTimelineData;
}

export const deleteItem = (timelineData, actionId) => {
  const actions = cloneDeep(timelineData[0].actions);
  const newActions = actions.filter(action => action.id !== actionId);
  const newTimelineData = [{
    id: '1',
    actions: newActions
  }];
  return newTimelineData;
}

export const copyItem = (timelineData, actionId) => {
  const actions = cloneDeep(timelineData[0].actions);
  const action = actions.find(action => action.id === actionId);
  const newAction = cloneDeep(action);
  newAction.id = Date.now();
  const newActions = actions.concat(newAction);
  const newTimelineData = [{
    id: '1',
    actions: newActions
  }];
  
  return normalizeTimeline(newTimelineData);
}