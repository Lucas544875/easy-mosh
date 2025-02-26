import { Buffer } from 'buffer';

async function removeFirstIFrame(object) {
  try {
    const arrayBuffer = await object.arrayBuffer();
    // ArrayBuffer を Buffer に変換
    const buffer = Buffer.from(arrayBuffer);

    // 先頭の I フレームを削除
    return _removeFirstIFrame(buffer);
  } catch (err) {
    console.error(err);
  }
}


// H.264 ビットストリームから先頭の I フレーム（および SPS/PPS 等）を削除する関数
function _removeFirstIFrame(buffer) {
  const nalUnits = [];
  let pos = 0;

  while (pos < buffer.length) {
    let startCodeLength = 0;
    // 4バイトの開始コード (0x00000001) をチェック
    if (
      pos + 3 < buffer.length &&
      buffer[pos] === 0x00 &&
      buffer[pos + 1] === 0x00 &&
      buffer[pos + 2] === 0x00 &&
      buffer[pos + 3] === 0x01
    ) {
      startCodeLength = 4;
    }
    // 3バイトの開始コード (0x000001) をチェック
    else if (
      pos + 2 < buffer.length &&
      buffer[pos] === 0x00 &&
      buffer[pos + 1] === 0x00 &&
      buffer[pos + 2] === 0x01
    ) {
      startCodeLength = 3;
    }

    if (startCodeLength > 0) {
      const nalStart = pos;
      pos += startCodeLength; // NAL ヘッダーへ移動
      const header = buffer[pos];
      const nalType = header & 0x1F; // 下位5ビットで NAL タイプを取得

      let nextStart = pos;
      while (nextStart < buffer.length) {
        if (
          nextStart + 3 < buffer.length &&
          buffer[nextStart] === 0x00 &&
          buffer[nextStart + 1] === 0x00 &&
          buffer[nextStart + 2] === 0x00 &&
          buffer[nextStart + 3] === 0x01
        ) {
          break;
        }
        if (
          nextStart + 2 < buffer.length &&
          buffer[nextStart] === 0x00 &&
          buffer[nextStart + 1] === 0x00 &&
          buffer[nextStart + 2] === 0x01
        ) {
          break;
        }
        nextStart++;
      }
      nalUnits.push({ start: nalStart, end: nextStart, type: nalType });
      pos = nextStart;
    } else {
      pos++;
    }
  }

  // 最初に現れる IDR フレーム (NAL タイプ 5) を探す
  let idrIndex = -1;
  for (let i = 0; i < nalUnits.length; i++) {
    if (nalUnits[i].type === 5) {
      idrIndex = i;
      break;
    }
  }
  if (idrIndex === -1) {
    console.warn('IDRフレームが見つかりませんでした。');
    return buffer;
  }

  // IDR フレームの終了位置以降のデータを抽出して返す
  const cutOff = nalUnits[idrIndex].end;
  return buffer.slice(cutOff);
}

function concatBuffers(buffers) {
  return Buffer.concat(buffers);
}

function repeatH264Bitstream(buffer, repeatCount) {
  // H.264 ビットストリームを指定回数繰り返す関数
  // 繰り返し回数が 1 未満の場合は空の Buffer を返す
  if (repeatCount < 1) {
    return Buffer.alloc(0);
  }

  const buffers = [];
  for (let i = 0; i < repeatCount; i++) {
    buffers.push(buffer);
  }
  return concatBuffers(buffers);
}


export { removeFirstIFrame, concatBuffers, repeatH264Bitstream };