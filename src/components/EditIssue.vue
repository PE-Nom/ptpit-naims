<template>
  <div class="content-fulied">
    <b-navbar v-if="showNavbar" type="dark" variant="success">
      <b-navbar-brand to="/tickets">&lt;&lt; チケット一覧</b-navbar-brand>
    </b-navbar>
    <b-container class="table-row header">
      <label class="currentpath-user" >{{this.currentPath}}</label>
    </b-container>

    <div class="edit-field">
      <div>
        <div class="form-group row-top">
          <div class="col-md-10">
            <label for="inputTracker" class="control-label">トラッカー</label>
            <b-form-select v-model="tracker" :options="trackerOptions">
            </b-form-select>
          </div>
        </div>
        <div class="form-group row-top">
          <div class="col-md-10">
            <label for="inputIssueStatus" class="control-label">ステータス</label>
            <b-form-select v-model="issueStatus" :options="issueStatuses">
            </b-form-select>
          </div>
        </div>
        <div class="form-group row-top">
          <div class="col-md-10">
            <label for="inputIssuePriority" class="control-label">優先度</label>
            <b-form-select v-model="issuePriority" :options="issuePriorities">
            </b-form-select>
          </div>
        </div>
        <div class="form-group row-top">
          <div class="col-md-10">
            <label for="inputAuthor" class="control-label">作成者</label>
            <b-form-select v-model="author" :options="users">
            </b-form-select>
          </div>
        </div>
        <div class="form-group row-top">
          <div class="col-md-10">
            <label for="inputAssigned" class="control-label">担当者</label>
            <b-form-select v-model="assigned" :options="users">
            </b-form-select>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-8">
            <p v-if=errorMessage class="message-field">{{errorMessage}}</p>
          </div>
          <div class="col-md-2">
            <b-button class="control-button create" variant="success" v-if="this.new" @click='createIssue'>新規登録</b-button>
            <b-button class="control-button update" variant="success" v-if="!this.new" @click='updateIssue'>更新</b-button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import naim from '../models/naim.js'
import editstate from '../models/editState.js'

export default {
  data () {
    return {
      new: false,
      currentPath: '',
      issId: null,
      issDetaile: null,
      trackerOptions: [{value: '', text: ''}],
      tracker: '',
      issueStatuses: [{value: '', text: ''}],
      issueStatus: '',
      issuePriorities: [{value: '', text: ''}],
      issuePriority: '',
      users: [{value: '', text: ''}],
      author: null, // 作成者
      assigned: null, // 担当者
      activities: [{value: '', text: ''}],
      activity: null,
      documentCategries: [{value: '', text: ''}],
      errorMessage: ''
    }
  },
  computed: {
    showNavbar: function () {
      let show = true
      if (this.$route.path !== '/editissue') {
        show = false
      }
      return show
    }
  },
  methods: {
    createIssue: async function () {
    },
    updateIssue: async function () {

    },
    convertOptions: function (values, key) {
      let options = []
      values.forEach(el => {
        let option = {
          value: el.id,
          text: el[key]
        }
        options.push(option)
      })
      return options
    },
    getIssueDetail: async function () {
      this.issId = editstate.currentIssueId
      // console.log(this.issId)
      if (this.issId !== -1) {
        this.new = false
        this.currentPath = 'チケット更新'
        await naim.retrieveIssueDetail(Number(this.issId))
        this.issDetail = naim.getIssueDetail()
        console.log(this.issDetail)
        this.tracker = this.issDetail.tracker.id
        this.issueStatus = this.issDetail.status.id
        this.issuePriority = this.issDetail.priority.id
        this.author = this.issDetail.author.id
        this.assigned = this.issDetail.assigned_to ? this.issDetail.assigned_to.id : '-'
      } else {
        this.new = true
        this.currentPath = 'チケット 登録'
      }
    },
    getTrackerOptions: async function () {
      await naim.retrieveTrackers()
      let trackers = naim.getTrackers()
      this.trackerOptions = this.convertOptions(trackers, 'name')
      // console.log(this.trackerOptions)
    },
    getIssueStatuses: async function () {
      await naim.retrieveIssueStatuses()
      let statuses = naim.getIssueStatuses()
      this.issueStatuses = this.convertOptions(statuses, 'name')
      // console.log(this.issueStatuses)
    },
    getIssuePriorities: async function () {
      await naim.retrieveIssuePriorities()
      let priorities = naim.getIssuePriorities()
      this.issuePriorities = this.convertOptions(priorities, 'name')
      // console.log(this.issuePriorities)
    },
    getUsers: async function () {
      await naim.retrieveUsers()
      let users = naim.getUsers()
      this.users = this.convertOptions(users, 'login')
      // console.log(this.users)
    },
    getTimeEntryActivities: async function () {
      await naim.retrieveTimeEntryActivities()
      let act = naim.getTimeEntryActivities()
      this.activities = this.convertOptions(act, 'name')
      // console.log(this.activities)
    },
    getDocumentCategries: async function () {
      await naim.retrieveDocumentCategories()
      let cat = naim.getDocumentCategories()
      this.documentCategries = this.convertOptions(cat, 'name')
      // console.log(this.documentCategries)
    },
    getProperties: async function () {
      await this.getUsers()
      await this.getTrackerOptions()
      await this.getIssueStatuses()
      await this.getIssuePriorities()
      await this.getTimeEntryActivities()
      await this.getDocumentCategries()
    }
  },
  created () {
    this.getProperties()
  },
  mounted () {
    this.getIssueDetail()
  }
}
</script>

<style scoped>
  .control-label {
    float: left;
  }
  .control-button {
    float: right;
  }
  .row-top {
    margin-top: 1em;
  }
  .control-label {
    margin-bottom: 0.1em;
  }
  .form-group {
    margin-bottom: 0.5em;
  }
  .update {
    margin-left: 1em;
  }
  .edit-field {
    height: 550px;
    overflow-y: auto;
  }
</style>