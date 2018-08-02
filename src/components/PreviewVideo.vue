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
      <video id="video1" controls>
        <source src="src" type="type">
      </video>
      <b-button class="control-button play" variant="success" @click='start'>再生</b-button>
      <!--
      <video id="video1" controls v-bind:src="video" v-on:ended="onEnded"></video>
      <a href="javascript:vplay()">再生</a>
      -->
    </div>
  </div>
</template>

<script>
import editstate from '../models/editState.js'

export default {
  data () {
    return {
      currentPath: '動画　プレビュー',
      src: '',
      type: '',
      video: null
    }
  },
  created () {
  },
  methods: {
    /*
    onEnded () {
      console.log('video ended!')
    },
    */
    start () {
      console.log('PreviewVideo created')
      this.src = editstate.attachment.content_url
      console.log(this.src)
      this.type = editstate.attachment.content_type
      console.log(this.type)
      this.video = document.getElementById('video1')
      console.log('start load')
      this.video.load()
      console.log('start play')
      this.video.play()
    }
  }
}
</script>

<style scoped>
body {
	text-align:center;
}
#video1 {
	border: #ccc 1px solid;
	margin-bottom: 0.8em;
	/*max-width:640px;*/
	width:100%;
	height:auto;
}
</style>