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
      } else {
        console.log('no file selected')
      }
    },
    onVideoChanged (event) {

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
</style>