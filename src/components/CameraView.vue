<template>
  <div class="content-fulied">
    <div>
      <b-navbar v-if="showNavbar" type="dark" variant="success">
        <b-navbar-brand to="/editissue">&lt;&lt; チケット編集</b-navbar-brand>
      </b-navbar>
      <b-container class="table-row header">
        <label class="currentpath-user" >{{currentPath}}</label>
      </b-container>
    </div>
    <div>
      <div class="camera-modal">
        <video id="video" class="camera-stream" autoplay playsinline="true"/></video>
        <div class="camera-modal-container">
          <span @click="capture" class="take-picture-button take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="material-icons">camera</i>
          </span>
          <canvas id="snapshot" class="image-caputer-canvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPortrait: false,
      showNavbar: true,
      currentPath: '画像',
      video: null,
      snapshotCanvas: null,
      mediaStream: null,
      imageData: null
    }
  },
  methods: {
    adjustProportions () {
      let ratio = this.video.videoWidth / this.video.videoHeight
      if (ratio < 1) {
        // 画面縦長フラグ
        this.isPortrait = false
      }
      this.video.width = Math.round(this.video.height * ratio)
      this.snapshotCanvas.height = this.video.videoHeight / 2
      this.snapshotCanvas.witdh = this.video.videoWidth / 2
      console.log('ratio : ' + ratio)
      console.log('video.videoWidth : ' + this.video.videoWidth + ', Height : ' + this.video.videoHeight)
      console.log('video.width : ' + this.video.width + ', height : ' + this.video.height)
      console.log('canvas.width : ' + this.snapshotCanvas.width + ', height : ' + this.snapshotCanvas.height)
    },
    capture () {
      console.log('capture')
      this.adjustProportions()
      let context = this.snapshotCanvas.getContext('2d')
      // Draw the video frame to the canvas.
      this.imageData = this.snapshotCanvas.toDataURL(
        context.drawImage(this.video, 0, 0, this.snapshotCanvas.width, this.snapshotCanvas.height)
      )
      console.log(this.imageData)
      /*
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(mediaStreamTrack)
      return imageCapture.takePhoto().then(blob => {
        console.log(blob)
      })
      */
    }
  },
  mounted () {
    console.log('mounted')
    let constraints = {
      audio: false,
      video: {
        // スマホのバックカメラを使用
        facingMode: 'environment'
        // facingMode: 'user'
      }
    }
    this.video = document.getElementById('video')
    this.snapshotCanvas = document.getElementById('snapshot')
    navigator.mediaDevices.getUserMedia(constraints)
      .then(mediaStream => {
        this.mediaStream = mediaStream
        this.video.srcObject = mediaStream
        this.video.play()
      })
      .catch(error => console.error('getUserMedia() error:', error))
  },
  destroyed () {
    console.log('destroyed')
    const tracks = this.mediaStream.getTracks()
    tracks.map(track => track.stop())
  }
}
</script>

<style scoped>
/*
.image-caputer-canvas {
  width: 100%;
  max-width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: auto;
  left: 0;
}
*/
.camera-modal {
  width: 100%;
  height: 100%;
  top: auto;
  left: 0;
  position: absolute;
  background-color: white;
  z-index: 10;
}
.camera-stream {
  width: 100%;
  max-height: 100%;
}
.camera-modal-container {
  position: absolute;
  bottom: auto;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
}
.take-picture-button {
  display: flex;
}
</style>