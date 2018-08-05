<template>
  <div id="app">

    <b-navbar v-if="showNavbar" toggleable="md" type="dark" variant="success">
      <b-navbar-brand to="/">NAIMS(login:{{userName}})</b-navbar-brand>
      <!--
        <b-nav-text v-if="tablet" size="sm">{{currentPath}}／ユーザ:{{userName}}</b-nav-text>
      -->
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/tickets">チケット一覧</b-nav-item>
          <b-nav-item to="/projects">プロジェクト一覧</b-nav-item>
          <b-nav-item href="#" @click.prevent="showLoginDialog = (showLoginDialog === false)" v-if="!activeUser">ログイン</b-nav-item>
          <b-nav-item href="#" @click.prevent="showLogoutDialog = (showLogoutDialog === false)" v-else>ログアウト</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <!--
        <b-nav-text v-if="!tablet" size="sm">{{currentPath}}／ユーザ:{{userName}}</b-nav-text>
      -->
    </b-navbar>
    <LoginDialog v-if="showLoginDialog" @cancelClose="cancelClose" @loginClose="loginClose">
      <h3 slot="header">ログイン</h3>
    </LoginDialog>
    <LogoutDialog v-if="showLogoutDialog" @cancelClose="cancelClose" @logoutClose="logoutClose">
      <h3 slot="header">ログアウト</h3>
    </LogoutDialog>
    <!-- routes will be rendered here -->
    <router-view />

  </div>
</template>

<script>
import _ from 'lodash'
import LoginDialog from '@/components/LoginDialog.vue'
import LogoutDialog from '@/components/LogoutDialog.vue'
import router from './router'
import auth from './models/auth.js'
import naim from './models/naim.js'
import editstate from './models/editState.js'

export default {
  name: 'app',
  components: {
    LoginDialog,
    LogoutDialog
  },
  data () {
    return {
      activeUser: false,
      user: {
        username: null,
        password: null
      },
      showLoginDialog: false,
      showLogoutDialog: false,
      userName: '',
      tablet: false
    }
  },
  computed: {
    currentPath: function () {
      let path = 'ホーム'
      if (this.$route.path === '/projects') {
        path = 'プロジェクト'
      } else if (this.$route.path === '/tickets') {
        path = 'チケット'
      }
      return path
    },
    showNavbar: function () {
      let show = true
      if (this.$route.path !== '/' &&
          this.$route.path !== '/projects' &&
          this.$route.path !== '/tickets') {
        show = false
      }
      return show
    }
  },
  async created () {
    this.tablet = window.innerWidth < 769
    await this.refreshActiveUser()
    // インスタンスを作成した後、イベントリスナに登録
    window.addEventListener('resize', this.setTabletMode, false)
  },
  beforeDestroy () {
    // インスタンスを破棄する前に、イベントリスナから削除
    window.removeEventListener('resize', this.setTabletMode, false)
  },
  methods: {
    // 無くても良いが lodash の debounce で発火頻度を調整してあげるとエコ
    setTabletMode: _.debounce(function () {
      // data にリサイズ後のウィンドウ幅を代入
      this.tablet = window.innerWidth < 769
      console.log('setTabletMode : ' + this.tablet)
    }, 300),
    loginClose: function (user) {
      console.log('## login@App.vue')
      console.log(user)
      this.user = user
      this.userName = this.user.username
      this.activeUser = true
      this.showLoginDialog = false
      router.push('/')
    },
    logoutClose: function () {
      console.log('## logout@App.vue')
      this.activeUser = false
      this.showLogoutDialog = false
      this.user.username = null
      this.user.password = null
      this.userName = this.user.username
      router.push('/')
    },
    cancelClose: function () {
      console.log('## cancelCloe@App.vue')
      this.showLoginDialog = false
      this.showLogoutDialog = false
    },
    refreshActiveUser: async function () {
      let path = editstate.getCurrentPath()
      console.log('path : ' + path)
      this.user = auth.getUser()
      console.log(this.user)
      console.log(' username : ' + this.user.username)
      console.log(' password : ' + this.user.password)
      if (this.user !== null && this.user.username !== null && this.user.password !== null) {
        try {
          await naim.initialize(this.user)
          this.activeUser = true
          this.userName = this.user.username
          // 成功したら IssuesList にルーティング
          if (path !== null) {
            if (path === '/editissue') {
              let issId = editstate.getCurrentIssId()
              editstate.currentIssueId = issId
            }
            router.push(path)
          } else {
            router.push('/')
          }
        } catch (err) {
          console.log('==== App ====')
          console.log(err)
          this.activeUser = false
          this.userName = ''
          this.showLoginDialog = (this.showLoginDialog === false)
        }
      } else {
        this.activeUser = false
        this.userName = ''
        this.showLoginDialog = (this.showLoginDialog === false)
        router.push('/')
      }
    }

  }
}
</script>

<style>

body {
  overflow: hidden;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
