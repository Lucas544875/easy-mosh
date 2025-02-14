import { atom } from "jotai";

const defaultData = [
  {
    id: '1',
    actions: [
      {
        id: Date.now()-1000,
        start: 1,
        end: 6,
        effectId: 'copy', // 動画
        flexible: false,
        data: {
          src: '/src/assets/mov.mp4',
          name: '例1',
        },
      },
      {
        id: Date.now()-2000,
        start: 10,
        end: 15,
        flexible: false,
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
