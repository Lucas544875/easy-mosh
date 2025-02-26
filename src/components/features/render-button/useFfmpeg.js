import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { removeFirstIFrame, concatBuffers, repeatH264Bitstream } from './binaryEdit';
import { ceil } from 'lodash';

export function useFfmpeg({videoRef, messageRef}) {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const [isProcessing, setIsProcessing] = useState(false);

  // FFmpeg.wasm のロード
  const load = async () => {
    if (loaded){
      return;
    }
    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on('log', ({ message }) => {
        messageRef.current.innerHTML = message;
        console.log(message);
      });
      // toBlobURL is used to bypass CORS issue, urls with the same domain can be used directly.
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      setLoaded(true);
    } catch (err) {
      console.error('FFmpeg load failed:', err);
    }
  }

  const mp4Toh264 = async ( data, ss, to ) => {
    await load();
    const ffmpeg = ffmpegRef.current;
    const id = self.crypto.randomUUID();
    await ffmpeg.writeFile(`f_${id}.mp4`, data);
    await ffmpeg.exec(["-i",`f_${id}.mp4`, "-ss", `${ss}`, "-to", `${to}`, "-c:v","libx264","-bf","0","-x264-params","\"keyint=100000:min-keyint=100000:scenecut=0:bframes=0\"","-an","-f","h264",`f_${id}.h264`]);

    console.log(["-i",`f_${id}.mp4`, "-ss", `${ss}`, "-to", `${to}`, "-c:v","libx264","-bf","0","-x264-params","\"keyint=100000:min-keyint=100000:scenecut=0:bframes=0\"","-an","-f","h264",`f_${id}.h264`])
    const datah264 = await ffmpeg.readFile(`f_${id}.h264`);
    return datah264;
  }

  const mp4Toh264Only2F = async ( data, ss ) => {
    await load();
    const ffmpeg = ffmpegRef.current;
    const id = self.crypto.randomUUID();
    await ffmpeg.writeFile(`f_${id}.mp4`, data);
    await ffmpeg.exec(["-i",`f_${id}.mp4`, "-ss", `${ss}`, "-frames:v", "2" , "-c:v","libx264","-bf","0","-x264-params","\"keyint=100000:min-keyint=100000:scenecut=0:bframes=0\"","-an","-f","h264",`f_${id}.h264`]);
    console.log(["-i",`f_${id}.mp4`, "-ss", `${ss}`, "-frames:v", "2" , "-c:v","libx264","-bf","0","-x264-params","\"keyint=100000:min-keyint=100000:scenecut=0:bframes=0\"","-an","-f","h264",`f_${id}.h264`])
    const datah264 = await ffmpeg.readFile(`f_${id}.h264`);
    return datah264;
  }
  const h264ToMp4 = async ( data ) => {
    await load();
    const ffmpeg = ffmpegRef.current;
    const id = self.crypto.randomUUID();
    await ffmpeg.writeFile(`f_${id}.h264`, data);
    await ffmpeg.exec(['-f','h264','-i', `f_${id}.h264`, '-c', 'copy', `f_${id}.mp4`]);
    console.log(['-f','h264','-i', `f_${id}.h264`, '-c', 'copy', `f_${id}.mp4`])
    const newData = await ffmpeg.readFile(`f_${id}.mp4`);
    return newData;
  }

  async function rendoringTimeline(actions) {
    setIsProcessing(true);
    await load();

    try {
      const h264s = await Promise.all(
        actions.map( async (action) => {
          const src = action.data.src
          const effectId = action.effectId;
          if (effectId === "copy") {
            const start = action.data.cripStart;
            const end = action.data.cripEnd;
            const h264 = await mp4Toh264(await fetchFile(src), start, end);
            return h264;
          } else if (effectId === "I-substitute") {
            const start = action.data.cripStart;
            const end = action.data.cripEnd;
            const h264 = await mp4Toh264(await fetchFile(src), start, end);
            const h264blob = new Blob([h264.buffer], {type: 'video/h264'});
            const blokenh264 = await removeFirstIFrame(h264blob);
            return blokenh264;
          } else if (effectId === "P-duplicate") {
            const flameTime = action.data.flameTime;
            const h264 = await mp4Toh264Only2F(await fetchFile(src), flameTime);
            const h264blob = new Blob([h264.buffer], {type: 'video/h264'});
            const blokenh264 = await removeFirstIFrame(h264blob);
            const flames = ceil((action.end - action.start)*30);
            const repeatedh264 = repeatH264Bitstream(blokenh264, flames);
            return repeatedh264;
          }
        })
      );

      const mergedH264Streams = concatBuffers(h264s);
      const mp4 = await h264ToMp4(mergedH264Streams);
      const mp4Url = URL.createObjectURL(new Blob([mp4.buffer], {type: 'video/mp4'}));
      videoRef.current.src = mp4Url;
    } catch (error) {
      console.error('エラーが発生しました。:', error);
      messageRef.current.innerHTML = 'エラーが発生しました。';
    } finally {
      setIsProcessing(false);
    };
  }

  // return { mergeVideos, outputUrl, isProcessing, isLoaded };
  return { isProcessing, rendoringTimeline };
}
