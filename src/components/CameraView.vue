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
      <!--
      <div class="camera-modal">
        <video ref="video" class="camera-stream"/>
        <div class="camera-modal-container">
          <span @click="capture" class="take-picture-button take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="material-icons">camera</i>
          </span>
        </div>
      </div>
      -->
      <div>
        <div class="form-group row-top">
          <div class="col-md-10">
            <label for="inputImage" class="control-label">写真</label>
            <input type="file" class="form-control" id="inputImage" variant="success" accept="image/*" capture="camera" @change="onImageChanged">
            <div><img id="thumbnail" src=""></div>
            <label for="inputVideo" class="control-label">動画</label>
            <input type="file" class="form-control" id="inputVideoe" variant="success" accept="video/*" capture="camera" @change="onVideoChanged">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      image: null,
      video: null,
      showNavbar: true,
      currentPath: '画像',
      mediaStream: null
    }
  },
  methods: {
    onImageChanged (event) {
      console.log(event)
      if (event.target.files.length) {
        // 選択されたファイル情報を取得
        let file = event.target.files[0]

        // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
        let reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = function () {
          let thumbnail = document.getElementById('thumbnail')
          thumbnail.setAttribute('src', reader.result)
          console.log(reader.result)
        }
        // let img = event.target.files[0]
        // console.log(img)
        // this.image = img
      } else {
        console.log('no file selected')
      }
    },
    onVideoChanged (event) {

    },
    capture () {
      console.log('capture')
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(mediaStreamTrack)
      return imageCapture.takePhoto().then(blob => {
        console.log(blob)
      })
    }
  },
  mounted () {
    console.log('mounted')
    /*
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        this.mediaStream = mediaStream
        this.$refs.video.srcObject = mediaStream
        this.$refs.video.play()
      })
      .catch(error => console.error('getUserMedia() error:', error))
      */
  },
  destroyed () {
    console.log('destroyed')
    /*
    const tracks = this.mediaStream.getTracks()
    tracks.map(track => track.stop())
    */
  }
}
</script>

<style scoped>
.camera-modal {
  width: 100%;
  height: 100%;
  /*top: 0;*/
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
  bottom: 0;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
}
.take-picture-button {
  display: flex;
}
</style>