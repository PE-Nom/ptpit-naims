<template>
  <div class="content-fulied">
    Camera with medi2aDevice.getUserMedia() (Chromeはフラグ設定が必要です）<br />
    <b-button class="control-button startVideo" variant="success" @click='startVideo'>Start</b-button>
    <b-button class="control-button stopVideo" variant="success" @click='stopVideo'>Stop</b-button>
    <br />
    <video id="local_video" autoplay style="width: 320px; height: 240px; border: 1px solid black;"></video>
  </div>
</template>

<script>
export default {
  data () {
    return {
      localVideo: document.getElementById('local_video'),
      localStream: null
    }
  },
  methods: {
    // start local video
    startVideo: function () {
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(function (stream) { // success
          this.localStream = stream
          this.localVideo.src = window.URL.createObjectURL(this.localStream)
        }).catch(function (error) { // error
          console.error('mediaDevice.getUserMedia() error:', error)
        })
    },
    // stop local video
    stopVideo: function () {
      for (let track of this.localStream.getTracks()) {
        track.stop()
      }
      this.localStream = null
      this.localVideo.pause()
      window.URL.revokeObjectURL(this.localVideo.src)
      this.localVideo.src = ''
    }
  }
}
</script>
