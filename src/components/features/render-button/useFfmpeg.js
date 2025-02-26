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

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile('input.webm', await fetchFile('https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm'));
    await ffmpeg.exec(['-i', 'input.webm', 'output.mp4']);
    const data = await ffmpeg.readFile('output.mp4');
    videoRef.current.src =
      URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
  }

  const mp4Toh264 = async ( data, ss, to ) => {
    await load();
    const ffmpeg = ffmpegRef.current;
    const id = self.crypto.randomUUID();
    await ffmpeg.writeFile(`f_${id}.mp4`, data);
    await ffmpeg.exec(["-i",`f_${id}.mp4`, "-ss", `${ss}`, "-to", `${to}`, "-c:v","libx264","-bf","0","-x264-params","\"keyint=100000:min-keyint=100000:scenecut=0:bframes=0\"","-an","-f","h264",`f_${id}.h264`]);

    // console.log(['-i', `f_${id}.mp4`, '-c', 'copy', '-bsf:v', 'h264_mp4toannexb', `f_${id}.h264`])
    const datah264 = await ffmpeg.readFile(`f_${id}.h264`);
    return datah264;
  }

  const mp4Toh264Only2F = async ( data, ss ) => {
    await load();
    const ffmpeg = ffmpegRef.current;
    const id = self.crypto.randomUUID();
    await ffmpeg.writeFile(`f_${id}.mp4`, data);
    await ffmpeg.exec(["-i",`f_${id}.mp4`, "-ss", `${ss}`, "-frames:v", "2" , "-c:v","libx264","-bf","0","-x264-params","\"keyint=100000:min-keyint=100000:scenecut=0:bframes=0\"","-an","-f","h264",`f_${id}.h264`]);
    const datah264 = await ffmpeg.readFile(`f_${id}.h264`);
    return datah264;
  }

  const mp4Toh264OnlyP = async ( src ) => {
    await load();
    const ffmpeg = ffmpegRef.current;
    const id = self.crypto.randomUUID();
    await ffmpeg.writeFile(`f_${id}.mp4`, await fetchFile(src));
    await ffmpeg.exec(['-i', `f_${id}.mp4`, '-c', 'copy', '-bsf:v', 'h264_mp4toannexb', '-vf', 'select=eq(pict_type\\,I)', `f_${id}.h264`]);
    const data = await ffmpeg.readFile(`f_${id}.h264`);
    return URL.createObjectURL(new Blob([data.buffer], {type: 'video/h264'}));
  }

  const h264ToMp4 = async ( data ) => {
    await load();
    const ffmpeg = ffmpegRef.current;
    const id = self.crypto.randomUUID();
    await ffmpeg.writeFile(`f_${id}.h264`, data);
    await ffmpeg.exec(['-f','h264','-i', `f_${id}.h264`, '-c', 'copy', `f_${id}.mp4`]);
    // console.log(['-i', `f_${id}.h264`, '-c', 'copy', `f_${id}.mp4`])
    const newData = await ffmpeg.readFile(`f_${id}.mp4`);
    return newData;
  }

  const conactH264 = async ( data1, data2 ) => {
    await load();
    const ffmpeg = ffmpegRef.current;
    const id = self.crypto.randomUUID();
    await ffmpeg.writeFile(`f_${id}_1.h264`, data1);
    await ffmpeg.writeFile(`f_${id}_2.h264`, data2);
    await ffmpeg.exec(['-i', `concat:f_${id}_1.h264|f_${id}_2.h264`, '-c', 'copy', 'f_output.h264']);
    console.log(['-i', `f_${id}_1.h264`, '-i', `f_${id}_2.h264`, '-c', 'copy', 'f_output.h264'])
    const newData = await ffmpeg.readFile('f_output.h264');
    return newData;
  }

  async function testProcess(actions) {
    setIsProcessing(true);
    await load();

    const mov1Src = "/src/assets/mov.mp4"
    const mov2Src = "/src/assets/mov2.mp4"
    const mov1Data = await fetchFile(mov1Src);
    const mov2Data = await fetchFile(mov2Src);

    const mov1h264 = await mp4Toh264(mov1Data, 0, 3);
    const mov2h264 = await mp4Toh264(mov2Data, 0, 3);
    const mov2h264blob = new Blob([mov2h264.buffer], {type: 'video/h264'});
    // console.log("done:", mov2h264Url);
    const mov2brokenh264 = await removeFirstIFrame(mov2h264blob);
    // console.log("done:", editedURL);
    // const mov2brokenh264 = await fetchFile(editedURL);
    const concath264 = concatBuffers([mov1h264, mov2brokenh264]);

    const mp4 = await h264ToMp4(concath264);
    const mp4Url = URL.createObjectURL(new Blob([mp4.buffer], {type: 'video/mp4'}));
    videoRef.current.src = mp4Url;

    setIsProcessing(false);
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
      console.error('動画の連結に失敗しました:', error);
    } finally {
      setIsProcessing(false);
    };
  }


  async function mergeVideos(actions) {
    setIsProcessing(true);
    await load();
    const ffmpeg = ffmpegRef.current;

    try {
      // FFmpegの仮想ファイルシステムに動画を書き込む
      const fileNames = [];
      for (let i = 0; i < actions.length; i++) {
        const src = actions[i].data.src
        const start = actions[i].data.cripStart;
        const end = actions[i].data.cripEnd;
        const fileName = `video${i}.mp4`;
        const cutFileName = `cut${i}.mp4`;

        const videoData = await fetchFile(src); // objectURL から取得
        ffmpeg.writeFile(fileName, videoData);
        await ffmpeg.exec([
          "-i", fileName,
          "-ss", start.toString(),
          "-to", end.toString(),
          cutFileName,
        ])
        
        fileNames.push(cutFileName);
      }

      // FFmpeg のリストファイルを作成（連結に使用）
      const listFileContent = fileNames.map(name => `file '${name}'`).join('\n');
      await ffmpeg.writeFile('fileList.txt', new TextEncoder().encode(listFileContent));

      // FFmpegで動画を連結
      await ffmpeg.exec([
        '-f', 'concat', '-i', 'fileList.txt',
        '-c', 'copy', 'output.mp4'
      ]);

      // 結果の動画を取得
      const data = await ffmpeg.readFile('output.mp4');
      const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob);
      videoRef.current.src = videoUrl;
      // setOutputUrl(videoUrl);
    } catch (error) {
      console.error('動画の連結に失敗しました:', error);
    } finally {
      setIsProcessing(false);
    }
  }

  // return { mergeVideos, outputUrl, isProcessing, isLoaded };
  return { mergeVideos, isProcessing, testProcess, rendoringTimeline};
}
