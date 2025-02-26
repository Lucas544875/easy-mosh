import React from "react";
import ReactMarkdown from 'react-markdown';

const markdown = `
# Easy Mosh
Easy Mosh は、datamoshと呼ばれるグリッチエフェクトを簡単に作成できるツールです。
## datamoshとは
mpeg4形式で圧縮された動画ファイルのフレームデータは大きく3種類に分類できます。
- I フレーム
  - フレームの情報をすべて保持しています
- P フレーム
  - 前のフレームとの差分だけを保持しています
- B フレーム
  - 前後のフレームとの差分を保持しています
datamoshとは、I フレームを欠落させる、あるいはP フレームを複製するなどして動画データの不整合を意図的に起こすことで得られるエフェクトのことです。
`;

const Description = () => (
  <ReactMarkdown children={markdown} />
)

export default Description;