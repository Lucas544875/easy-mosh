import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export function useFfmpeg(videoRef) {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef(null);

  const load = async () => {
    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on('log', ({ message }) => {
        // messageRef.current.innerHTML = message;
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
  // async function mergeVideos(videoUrls) {
  //   if (!isLoaded) return;
  //   setIsProcessing(true);
  //   const ffmpeg = ffmpegRef.current;

  //   try {
  //     // FFmpegの仮想ファイルシステムに動画を書き込む
  //     const fileNames = [];
  //     for (let i = 0; i < videoUrls.length; i++) {
  //       const fileName = `video${i}.mp4`;
  //       const videoData = await fetchFile(videoUrls[i]); // objectURL から取得
  //       ffmpeg.FS('writeFile', fileName, videoData);
  //       fileNames.push(fileName);
  //     }

  //     // FFmpeg のリストファイルを作成（連結に使用）
  //     const listFileContent = fileNames.map(name => `file '${name}'`).join('\n');
  //     ffmpeg.FS('writeFile', 'fileList.txt', new TextEncoder().encode(listFileContent));

  //     // FFmpegで動画を連結
  //     await ffmpeg.run('-f', 'concat', '-safe', '0', '-i', 'fileList.txt', '-c', 'copy', 'output.mp4');

  //     // 結果の動画を取得
  //     const data = ffmpeg.FS('readFile', 'output.mp4');
  //     const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
  //     const videoUrl = URL.createObjectURL(videoBlob);

  //     setOutputUrl(videoUrl);
  //   } catch (error) {
  //     console.error('動画の連結に失敗しました:', error);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // }

  // return { mergeVideos, outputUrl, isProcessing, isLoaded };
  return { load, loaded, transcode };
}
