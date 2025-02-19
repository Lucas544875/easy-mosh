class VideoControl {
  video;

  _seekTo(time) {
    if (!this.video.duration || isNaN(this.video.duration)) return;
    const duration = this.video.duration;
    if (time > duration) time = time % duration;
    if (Math.abs(this.video.currentTime - time) > 0.1) {
      this.video.currentTime = time;
    }
  }

  enter({src, startTime, time, engine, isPlaying, cripStart }) {
    if (this.video) {
      if (this.video.src !== src) {
        this.video.src = src;
        this.video.addEventListener("loadedmetadata", () => {
          this._seekTo(time - startTime + cripStart);
        }, { once: true });
      }else{
        this._seekTo(time - startTime + cripStart);
      }
    } else {
      this.video = document.getElementById("video-1");
      if (this.video.src !== src) {
        this.video.src = src;
      }
      this.video.setAttribute("playsinline", "true");
      this.video.setAttribute("preload", "auto");
      this.video.loop = true;
      this.video.addEventListener("loadedmetadata", () => {
        this._seekTo(time - startTime + cripStart);
      }, { once: true });
    }
    if (isPlaying && this.video.paused) {
      this.video.playbackRate = engine.getPlayRate();
      this.video.play();
    }
  }

  update({startTime, time, cripStart }) {
    if (!this.video) return;
    this._seekTo(time - startTime + cripStart);
  }

  leave({startTime, endTime, time, isPlaying, cripStart }) {
    if (!this.video) return;
    if (time <= endTime && time >= startTime) {
      this._seekTo(time - startTime + cripStart);
    }
    if (isPlaying && !this.video.paused) {
      this.video.pause();
    }
  }
  
  stop({startTime, time, isPlaying, cripStart }) {
    if (!this.video) return;
    this._seekTo(time - startTime + cripStart);
    if (!isPlaying && !this.video.paused) {
      this.video.pause();
    }
  }

  destroy() {
    this.video.remove();
  }
}

export default new VideoControl();
