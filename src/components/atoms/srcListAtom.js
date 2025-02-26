import {atom} from 'jotai';

const defaultData = [
  {
    id: Date.now(),
    name: "mov.mp4",
    url: "/src/assets/mov.mp4",
  }
]

export const srcListAtom = atom(defaultData);
