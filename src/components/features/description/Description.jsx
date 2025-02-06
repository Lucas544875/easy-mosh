import React from "react";

const Description = () => (
  <>
    <h1>
      Easy Mosh
    </h1>
    <p>
      Easy Mosh は、datamoshと呼ばれるグリッチエフェクトを簡単に作成できるツールです。
    </p>
    <h2>
      datamoshとは
    </h2>
    <p>
      mpeg4形式で圧縮された動画ファイルのフレームデータは大きく3種類に分類できます。
      <dl>
        <dt>I フレーム</dt>
        <dd>フレームの情報をすべて保持しています</dd>
        <dt>P フレーム</dt>
        <dd>前のフレームとの差分だけを保持しています</dd>
        <dt>B フレーム</dt>
        <dd>前後のフレームとの差分を保持しています</dd>
      </dl>
      datamoshとは、I フレームを欠落させる、あるいはP フレームを複製するなどして動画データの不整合を意図的に起こすことで得られるエフェクトのことです。
    </p>
  </>
)

export default Description;