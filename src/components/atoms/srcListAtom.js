import { atom } from 'jotai';

const defaultData = [
  {
    id: Date.now(),
    name: "mov.mp4",
    url: "/src/assets/mov.mp4",
  }
]

export const srcListAtom = atom(defaultData);

export const addSrcItems = (srcList, files) => {
  const newVideos = files.map((file) => ({
    id: self.crypto.randomUUID(),
    url: URL.createObjectURL(file),
    name: file.name,
  }));
  const newList = srcList.concat(newVideos);
  return newList;
}

export const deleteItem = (srcList, id) => {
  const newList = srcList.filter(item => item.id !== id);
  return newList;
}