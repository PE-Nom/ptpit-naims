<template>
  <div class="content-fulied">
    <div>
      <b-navbar type="dark" variant="success">
        <b-navbar-brand to="/editissue">&lt;&lt; チケット編集</b-navbar-brand>
      </b-navbar>
      <b-container class="table-row header">
        <label class="currentpath-user" >{{currentPath}}</label>
      </b-container>
    </div>
    <div>
      <div>
        <div class="form-group row-top">
          <div class="col-md-10">
            <label for="inputImage" class="control-label">写真</label>
            <input type="file" class="form-control" id="inputImage" variant="success" accept="image/*" capture="camera" @change="onImageChanged">
            <div><img id="thumbnail" src=""></div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-10">
            <label for="inputImageDescription" class="control-label">画像の説明</label>
            <textarea class="form-control" rows="3" id="inputImageDescription" placeholder="画像の記述" v-model="imageDescription"></textarea>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-10">
            <label for="inputVideo" class="control-label">動画</label>
            <input type="file" class="form-control" id="inputVideoe" variant="success" accept="video/*" capture="camera" @change="onVideoChanged">
          </div>
        </div>
        <div class="button-group attachment">
          <div class="col-md-8">
            <p></p>
          </div>
          <div class="col-md-2">
            <b-button class="control-button attachment" variant="info" @click='uploadFiles'>アップロード</b-button>
          </div>
        </div>
      </div>
      <p>{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import router from '../router'
import naim from '../models/naim.js'
import editstate from '../models/editState.js'
import fileUploader from '../models/fileUploader.js'

export default {
  data () {
    return {
      file: '',
      token: '',
      image: null,
      video: null,
      currentPath: '画像',
      imageDescription: '',
      errorMessage: ''
    }
  },
  methods: {
    onImageChanged (event) {
      console.log(event)
      if (event.target.files.length) {
        // 選択されたファイル情報を取得
        this.file = event.target.files[0]
        this.image = new Image()
        let reader = new FileReader()
        // let vm = this
        reader.onload = (e) => {
          this.image = e.target.result
          let thumbnail = document.getElementById('thumbnail')
          thumbnail.setAttribute('src', this.image)
        }
        reader.readAsDataURL(this.file)
      } else {
        console.log('no file selected')
      }
    },
    onVideoChanged (event) {
      console.log('onVideoChanged @ CameraView')
      console.log(event)
      if (event.target.files.length) {
        // 選択されたファイル情報を取得
        this.file = event.target.files[0]
        this.image = new Image()
        let reader = new FileReader()
        reader.onload = (e) => {
          this.video = e.target.result
        }
        reader.readAsDataURL(this.file)
      } else {
        console.log('no file selected')
      }
    },
    async uploadFiles () {
      if (this.file) {
        try {
          let res = await naim.uploadFiles(this.file)
          this.token = res.data.upload.token
          let attachId = res.data.upload.id
          console.log('uploaded file')
          console.log('token : ' + this.token)
          console.log('id : ' + attachId)
          let qstr = {
            'issue': {
              'uploads': [{
                'token': this.token,
                'filename': this.file.name,
                'description': this.imageDescription,
                'content_type': this.file.type
              }]
            }
          }
          await naim.updateIssue(editstate.currentIssueId, JSON.stringify(qstr))
          if (this.file.type.indexOf('video') !== -1) {
            await fileUploader.uploadFile(editstate.currentIssueId, attachId, this.file, this.video)
          } else {
            await fileUploader.uploadFile(editstate.currentIssueId, attachId, this.file, this.image)
          }
          router.push('/editissue')
        } catch (err) {
          console.log('error has occured @ attachingFile')
          console.log(err)
          this.errorMessage = err.toString()
        }
      }
    }
  },
  mounted () {
    console.log('mounted')
  },
  destroyed () {
    console.log('destroyed')
  }
}
</script>

<style scoped>
#thumbnail {
  max-width: 100%;
}
</style>