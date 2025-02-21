import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { list } from 'postcss';

export function useFfmpeg({videoRef, messageRef}) {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const [isProcessing, setIsProcessing] = useState(false);

  const load = async () => {
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

  async function mergeVideos(actions) {
    if (!loaded){
      await load();
      setLoaded(true);
    }
    setIsProcessing(true);
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
  return { mergeVideos, isProcessing};
}
