import { atom } from "jotai";

const defaultData = [
  {
    id: '1',
    actions: [
      {
        id: 'action4',
        start: 1,
        end: 6,
        effectId: 'copy', // 動画
        data: {
          src: '/src/assets/mov.mp4',
          name: '例1',
        },
      },
      {
        id: 'action5',
        start: 10,
        end: 15,
        effectId: 'copy', // 動画
        data: {
          src: '/src/assets/mov.mp4',
          name: '例2',
        },
      },
    ],
  },
];

export const timelineAtom = atom(defaultData);
