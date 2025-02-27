class VideoControl {
  // src をキーにして video 要素をキャッシュする
  cacheMap= {};

  _seekTo(video, time) {
    if (!video.duration || isNaN(video.duration)) return;
    const duration = video.duration;
    if (time > duration) time = time % duration;
    if (Math.abs(video.currentTime - time) > 0.1) {
      video.currentTime = time;
    }
  }

  enter({src, startTime, time, engine, isPlaying, cripStart }) {
    let video;
    if (this.cacheMap[src]) {
      // すでにキャッシュ済みの場合
      video = this.cacheMap[src];
      // 再利用時は表示状態にする
      video.style.display = "block";
      if (video.src !== src) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          this._seekTo(video, time - startTime + cripStart);
        }, { once: true });
      } else {
        this._seekTo(video, time - startTime + cripStart);
      }
    } else {
      const container = document.getElementById("player-ground-1");

      // キャッシュに存在しない場合は新規作成
      video = document.createElement("video");
      video.src = src;
      // video 要素の id には src を利用
      video.id = src;
      video.style.display = "block";
      video.style.maxHeight = "100%";
      video.style.maxWidth = "100%";
      video.style.margin = "0 auto";
      video.setAttribute("playsinline", "true");
      video.setAttribute("preload", "auto");
      video.loop = true;
      video.addEventListener("loadedmetadata", () => {
        this._seekTo(video, time - startTime + cripStart);
      }, { once: true });
      // コンテナ（id="player-ground-1" の div 要素）の子要素として追加
      if (container) {
        container.appendChild(video);
      } else {
        document.body.appendChild(video);
      }
      this.cacheMap[src] = video;
    }
    // 再生状態に合わせて再生処理
    if (isPlaying && video.paused) {
      video.playbackRate = engine.getPlayRate();
      video.play();
    }
  }

  update({ src, startTime, time, cripStart }) {
    const video = this.cacheMap[src];
    if (!video) return;
    this._seekTo(video, time - startTime + cripStart);
  }
  
  leave({ src, startTime, endTime, time, isPlaying, cripStart }) {
    const video = this.cacheMap[src];
    if (!video) return;
    // 時間が範囲内なら表示してシーク、範囲外なら非表示にする
    if (time >= startTime && time <= endTime) {
      video.style.display = "block";
      this._seekTo(video, time - startTime + cripStart);
    } else {
      video.style.display = "none";
    }
    if (isPlaying && !video.paused) {
      video.pause();
    }
  }

  stop({ src, startTime, time, isPlaying, cripStart }) {
    const video = this.cacheMap[src];
    if (!video) return;
    this._seekTo(video, time - startTime + cripStart);
    if (!isPlaying && !video.paused) {
      video.pause();
    }
  }

  delete(src) {
    const video = this.cacheMap[src];
    if (!video) return;
    video.remove();
    delete this.cacheMap[src];
  }

  destroy() {
    // キャッシュ内のすべての video 要素を削除
    Object.values(this.cacheMap).forEach(video => video.remove());
    this.cacheMap = {};
  }
}

export default new VideoControl();
