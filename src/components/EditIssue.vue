<template>
  <div class="content-fulied">
    <b-navbar v-if="showNavbar" type="dark" variant="success">
      <b-navbar-brand to="/tickets">&lt;&lt; チケット一覧</b-navbar-brand>
    </b-navbar>
    <b-container class="table-row header">
      <label class="currentpath-user" >{{this.currentPath}}</label>
    </b-container>

    <div>
      <!-- 情報アコーディオン -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion-issue variant="success">チケット id:#{{this.issId}}</b-btn>
        </b-card-header>
        <b-collapse id="accordion-issue" visible accordion="issue-accordion" role="tabpanel">
          <b-card-body>
            <div class="edit-field">
              <!-- チケットサマリ -->
              <div id="summary">
                <div class="form-group row-top">
                  <div class="col-md-10">
                    <label for="inputSubject" class="control-label">題名</label>
                    <input type="text" class="form-control" id="inputSubject" placeholder="題名" v-model="subject">
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-10">
                    <label for="inputIssuePriority" class="control-label">優先度</label>
                    <b-form-select v-model="issuePriority" :options="issuePriorities">
                    </b-form-select>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-10">
                    <label for="inputIssueStatus" class="control-label">ステータス</label>
                    <b-form-select v-model="issueStatus" :options="issueStatuses">
                    </b-form-select>
                  </div>
                </div>
              </div>
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-btn block href="#" v-b-toggle.accordion-issue-detail variant="success">詳細情報</b-btn>
                </b-card-header>
                <b-collapse id="accordion-issue-detail" accordion="issue-detail-accordion" role="tabpanel">
                  <b-card-body>
                    <!-- チケット詳細 -->
                    <div id="detail">
                      <div class="form-group">
                        <div class="col-md-10">
                          <label for="inputTracker" class="control-label">トラッカー</label>
                          <b-form-select v-model="tracker" :options="trackerOptions">
                          </b-form-select>
                        </div>
                      </div>
                      <div class="form-group row-top">
                        <div class="col-md-10">
                          <label for="inputProjectName" class="control-label">プロジェクト名</label>
                          <b-form-select v-model="projectId" :options="projectOptions">
                          </b-form-select>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-10">
                          <label for="inputDescription" class="control-label">説明</label>
                          <textarea class="form-control" rows="3" id="inputDescription" placeholder="説明の記述" v-model="description"></textarea>
                        </div>
                      </div>
                    </div>
                    <!-- スケジュール -->
                    <div class="h-divider"></div>
                    <div id="schedule">
                      <div class="form-group">
                        <b-container>
                          <b-row>
                            <div class="col-md-10">
                              <label for="inputStartDate" class="control-label">開始日</label>
                            </div>
                          </b-row>
                          <b-row>
                            <div class="col-md-10">
                              <date-selector :format="dateFormat" :start="minDate" :default="start_date" :end="maxDate" @date-change="startDate"></date-selector>
                            </div>
                          </b-row>
                        </b-container>
                      </div>
                      <div class="form-group">
                        <b-container>
                          <b-row>
                            <div class="col-md-10">
                              <label for="inputDueDate" class="control-label">期日</label>
                            </div>
                          </b-row>
                          <b-row>
                            <div class="col-md-10">
                              <date-selector :format="dateFormat" :start="minDate" v-bind:default="due_date" :end="maxDate" @date-change="dueDate"></date-selector>
                            </div>
                          </b-row>
                        </b-container>
                      </div>
                      <div class="form-group">
                        <div class="col-md-10">
                          <label for="inputDoneRatio" class="control-label">進捗率</label>
                          <b-form-select v-model="done_ratio" :options="doneRatioOptions">
                          </b-form-select>
                        </div>
                      </div>
                    </div>
                    <!-- メンバー -->
                    <div class="h-divider"></div>
                    <div id="member">
                      <div class="form-group">
                        <div class="col-md-10">
                          <label for="inputAssigned" class="control-label">担当者</label>
                          <b-form-select v-model="assigned" :options="usersOptions">
                          </b-form-select>
                        </div>
                      </div>
                      <!--
                      <div class="form-group">
                        <div class="col-md-10">
                          <label for="inputAuthor" class="control-label">作成者</label>
                          <b-form-select v-model="author" :options="usersOptions">
                          </b-form-select>
                        </div>
                      </div>
                      -->
                    </div>
                    <!-- 時間の記録と注記 -->
                    <div class="h-divider"></div>
                    <div id="notation">
                      <div class="form-group">
                        <div class="col-md-10">
                          <label for="inputActivities" class="control-label">活動</label>
                          <b-form-select v-model="activity" :options="activities">
                          </b-form-select>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-10">
                          <label for="inputWorkingTime" class="control-label">作業時間</label>
                          <input type="text" class="form-control" id="inputWorkingTime" v-model="workingTime">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-10">
                          <label for="inputComment" class="control-label">コメント</label>
                          <input type="text" class="form-control" id="inputComment" v-model="comment">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-10">
                          <label for="inputNotaion" class="control-label">注記</label>
                          <textarea class="form-control" rows="3" id="inputNotation" v-model="notation"></textarea>
                        </div>
                      </div>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
              <!-- 更新・登録 -->
              <div class="button-group">
                <div class="col-md-8">
                  <p v-if=errorMessage class="message-field">{{errorMessage}}</p>
                </div>
                <div class="col-md-2">
                  <b-button class="control-button create" variant="success" v-if="this.new" @click='createIssue'>新規登録</b-button>
                  <b-button class="control-button update" variant="success" v-else @click='updateIssue'>更新</b-button>
                </div>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <!-- #################################### -->
    <!-- 添付ファイル アコーディオン -->
    <div>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion-files variant="info">添付ファイル</b-btn>
        </b-card-header>
        <b-collapse id="accordion-files" accordion="issue-accordion" role="tabpanel">
          <b-card-body>
            <div class="attachment-field">
              <!-- 添付ファイルのリスト表示領域 -->
              <b-list-group>
                <b-list-group-item v-for="(val, idx) in attachments" v-bind:key=idx>
                  <!--
                  <a :href="val.content_url">{{val.filename}}</a> ({{val.filesize}}) <br>
                  -->
                  <a href="#!" v-on:click="previewAttachment(val)"> {{val.filename}} </a> ({{val.filesize}}) <br>
                  {{val.description}}
                </b-list-group-item>
              </b-list-group>
              <div class="h-divider"></div>
              <!-- 添付ファイル登録-->
              <div class="button-group attachment">
                <div class="col-md-8">
                  <p></p>
                </div>
                <div class="col-md-2">
                  <b-button class="control-button attachment" variant="info" @click='fileAttachment'>添付の登録</b-button>
                </div>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <!-- 履歴 アコーディオン -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion-history variant="info">更新履歴</b-btn>
        </b-card-header>
        <b-collapse id="accordion-history" accordion="issue-accordion" role="tabpanel">
          <b-card-body>
            <div class="history-field">
              <!--履歴の表示領域 -->
              <b-card no-body v-for="(val, idx) in journals" v-bind:key=idx class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-btn block v-b-toggle="'accordion-history-item'+val.id" variant="default">{{val.created_on}}</b-btn>
                </b-card-header>
                <b-collapse v-bind:id="'accordion-history-item'+val.id" accordion="my-history-item-accordion" role="tabpanel">
                  <b-card-body v-for="(item, id) in val.details" v-bind:key=id>
                    {{item}}
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import router from '../router'
import naim from '../models/naim.js'
import editstate from '../models/editState.js'
import dateSelector from './DateSelector.vue'

export default {
  components: {
    dateSelector
  },
  data () {
    return {
      // test_url: 'http://192.168.10.6/JS/tmp/55490595197__A207B747-2C2B-4A9E-B06B-0DF83D88B0AB.MOV',
      // test_url: 'http://192.168.1.3:8008/JS/data/55471914228__4ED81EBD-F2EE-498B-99F8-DD138A8EACEE.MOV',
      test_url: 'http://192.168.1.3:8008/JS/data/',
      // test_url: 'http://192.168.10.3/JS/data/',
      // test_url: 'http://192.168.1.5/JS/data/',
      new: false,
      currentPath: '',
      issId: null,
      issDetail: null,
      projectName: '',
      projectId: '',
      projects: [{id: '', name: ''}],
      projectOptions: [{value: '', text: ''}],
      subject: '',
      description: '',

      trackers: [{id: '', name: ''}],
      trackerOptions: [{value: '', text: ''}],
      tracker: '',

      statuses: [{id: '', name: ''}],
      issueStatuses: [{value: '', text: ''}],
      issueStatus: '',

      priorities: [{id: '', name: ''}],
      issuePriorities: [{value: '', text: ''}],
      issuePriority: '',

      users: [{id: '', name: ''}],
      usersOptions: [{value: '', text: ''}],
      // author: '', // 作成者
      assigned: '', // 担当者

      activities: [{value: '', text: ''}],
      activity: null,
      workingTime: '',
      comment: '',
      notation: '',
      documentCategries: [{value: '', text: ''}],
      start_date: '2018-07-11',
      due_date: '2018-08-11',
      done_ratio: '',
      doneRatioOptions: [
        {value: 0, text: '0%'},
        {value: 10, text: '10%'},
        {value: 20, text: '20%'},
        {value: 30, text: '30%'},
        {value: 40, text: '40%'},
        {value: 50, text: '50%'},
        {value: 60, text: '60%'},
        {value: 70, text: '70%'},
        {value: 80, text: '80%'},
        {value: 90, text: '90%'},
        {value: 100, text: '100%'}
      ],
      update_on: '',
      attachments: [],
      journals: [],
      errorMessage: '',
      // for date selector
      dateFormat: 'YYYY-MM-DD',
      currentDate: '2018-07-25',
      minDate: '2018-01-01',
      maxDate: '2030-12-31'
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
  watch: {
    tracker: function (newVal, oldVal) {
      // console.log('tracker changed : new = ' + newVal + ', old = ' + oldVal + ', this.tracker : ' + this.tracker)
    },
    projectId: function (newVal, oldVal) {
      // console.log('projectId changed : new = ' + newVal + ', old = ' + oldVal + ', this.projectId : ' + this.projectId)
    },
    issueStatus: function (newVal, oldVal) {
      // console.log('issueStatus changed : new = ' + newVal + ', old = ' + oldVal + ', this.issueStatus : ' + this.issueStatus)
    },
    issuePriority: function (newVal, oldVal) {
      // console.log('issuePriority changed : new = ' + newVal + ', old = ' + oldVal + ', this.issuePriority : ' + this.issuePriority)
    },
    assigned: function (newVal, oldVal) {
      // console.log('assigned changed : new = ' + newVal + ', old = ' + oldVal + ', this.assigned : ' + this.assigned)
    }
    // author: function (newVal, oldVal) {
    // console.log('author changed : new = ' + newVal + ', old = ' + oldVal + ', this.author : ' + this.author)
    // }
  },
  methods: {
    previewAttachment: function (file) {
      console.log('select attachment :')
      console.log('  filename :' + file.filename)
      console.log('  content_type : ' + file.content_type)
      console.log('  content_url : ' + file.content_url)
      console.log('  id : ' + file.id)
      this.dummy(file)
    },
    dummy: function (file) {
      let contentUrl = this.test_url + this.issId + '/' + file.id + '_' + file.filename
      if (file.content_type.indexOf('video') === -1) {
        // 動画以外はそのまま新しいタブで表示
        console.log('image')
      } else {
        console.log('video')
      }
      window.open(contentUrl)
    },
    startDate: function (date) {
      this.start_date = date.format(this.dateFormat)
      // console.log('開始日' + this.start_date)
    },
    dueDate: function (date) {
      this.due_date = date.format(this.dateFormat)
      // console.log('期日' + this.due_date)
    },
    createQueryString: function () {
      let qstr = {
        'issue': {
          'subject': this.subject, // subject
          'priority_id': this.issuePriority, // priority Object
          'status_id': this.issueStatus, // status Object
          // ----------------------
          'tracker_id': this.tracker, // tracker Object
          'project_id': this.projectId, // project Object
          'description': this.description, // description
          // ----------------------
          'start_date': this.start_date, // start_date
          'due_date': this.due_date, // due_date
          'done_ratio': this.done_ratio, // done_ratio
          // ----------------------
          'assigned_to_id': this.assigned, // assigned_to Object
          // ----------------------
          // activity
          // workingTime
          // comment
          'notes': this.notation // notation
        }
      }
      return qstr
    },
    createIssue: async function () {
      console.log('createIssue')
      let qstr = this.createQueryString()
      await naim.createIssue(JSON.stringify(qstr))
      await naim.retrieveIssues()
      console.log(qstr)
      router.push('/tickets')
    },
    updateIssue: async function () {
      console.log('updateIssue')
      let qstr = this.createQueryString()
      await naim.updateIssue(this.issId, JSON.stringify(qstr))
      await naim.retrieveIssues()
      console.log(qstr)
      router.push('/tickets')
    },
    fileAttachment: function () {
      router.push('/cameraview')
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
    convertProjectObjs: function (values, key) {
      let options = []
      values.forEach(el => {
        let option = {
          id: el.id,
          name: el[key]
        }
        options.push(option)
      })
      return options
    },
    convertUsersObjs: function (values) {
      let options = []
      values.forEach(el => {
        let option = {
          id: el.id,
          name: el.firstname + ' ' + el.lastname
        }
        options.push(option)
      })
      return options
    },
    getIssueDetail: async function () {
      if (this.issId !== -1) {
        await naim.retrieveIssueDetail(Number(this.issId))
        this.issDetail = naim.getIssueDetail()
        console.log(this.issDetail)
        this.projectName = this.issDetail.project.name
        this.projectId = this.issDetail.project.id
        this.subject = this.issDetail.subject
        this.description = this.issDetail.description
        this.tracker = this.issDetail.tracker.id
        this.issueStatus = this.issDetail.status.id
        this.issuePriority = this.issDetail.priority.id
        // this.author = this.issDetail.author.id
        this.assigned = this.issDetail.assigned_to ? this.issDetail.assigned_to.id : '-'
        this.start_date = this.issDetail.start_date ? this.issDetail.start_date : ''
        // console.log('start_date : ' + this.start_date)
        this.due_date = this.issDetail.due_date ? this.issDetail.due_date : ''
        // console.log('due_date : ' + this.due_date)
        this.update_on = this.issDetail.update_on ? this.issDetail.update_on : '未定義'
        this.done_ratio = this.issDetail.done_ratio ? this.issDetail.done_ratio : 0
        // dateSelector.parseDate()
        // 添付ファイルのリスト
        let attachmentItems = []
        this.issDetail.attachments.forEach(el => {
          let item = {
            filename: el.filename,
            filesize: parseInt(el.filesize / 1000) + 'kbyte',
            description: el.description,
            content_type: el.content_type,
            content_url: el.content_url,
            id: el.id
          }
          attachmentItems.push(item)
        })
        this.attachments = attachmentItems
        // 履歴のリスト
        this.journals = []
        this.issDetail.journals.forEach(journal => {
          let details = []
          details.push('by ' + journal.user.name)
          if (journal.notes !== '') details.push(journal.notes)
          journal.details.forEach(detail => {
            let name = detail.name
            let oldValue = detail.old_value ? detail.old_value : '未定義'
            let newValue = detail.new_value
            let str = name + ' : ' + oldValue + ' -> ' + newValue
            details.push(str)
          })
          this.journals.push({id: journal.id, created_on: journal.created_on, details: details})
        })
        // console.log(this.journals)
      } else {
        // this.tracker = this.trackerOptions[0].value
        // this.issueStatus = this.issueStatuses[0].value
        // this.issuePriority = this.issuePriorities[0].value
        this.tracker = 5 // インシデント
        this.issueStatus = 1 // 新規
        this.issuePriority = 2 // 通常
        this.done_ratio = 0
        // this.author = this.issDetail.author.id
      }
    },
    getProjects: async function () {
      let prjs = naim.getProjects()
      this.projects = this.convertProjectObjs(prjs, 'name')
      // console.log(this.projects)
      this.projectOptions = this.convertOptions(prjs, 'name')
      // console.log(this.projectOptions)
    },
    getTrackerOptions: async function () {
      await naim.retrieveTrackers()
      this.trackers = this.convertProjectObjs(naim.getTrackers(), 'name')
      // console.log(this.trackers)
      this.trackerOptions = this.convertOptions(this.trackers, 'name')
      // console.log(this.trackerOptions)
    },
    getIssueStatuses: async function () {
      await naim.retrieveIssueStatuses()
      this.statuses = this.convertProjectObjs(naim.getIssueStatuses(), 'name')
      // console.log(this.statuses)
      this.issueStatuses = this.convertOptions(this.statuses, 'name')
      // console.log(this.issueStatuses)
    },
    getIssuePriorities: async function () {
      await naim.retrieveIssuePriorities()
      this.priorities = this.convertProjectObjs(naim.getIssuePriorities(), 'name')
      // console.log(this.priorities)
      this.issuePriorities = this.convertOptions(this.priorities, 'name')
      // console.log(this.issuePriorities)
    },
    getUsers: async function () {
      await naim.retrieveUsers()
      this.users = this.convertUsersObjs(naim.getUsers())
      // console.log(this.users)
      this.usersOptions = this.convertOptions(this.users, 'name')
      // console.log(this.usersOptions)
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
      await this.getProjects()
      await this.getUsers()
      await this.getTrackerOptions()
      await this.getIssueStatuses()
      await this.getIssuePriorities()
      await this.getTimeEntryActivities()
      await this.getDocumentCategries()
    }
  },
  async created () {
    console.log('/editissue created')
    editstate.setCurrentPath('/editissue')
    // console.log('EditIssue created')
    this.issId = editstate.currentIssueId
    editstate.setCurrentIssId(this.issId)
    if (this.issId !== -1) {
      this.new = false
      this.currentPath = 'チケット更新'
    } else {
      this.new = true
      this.currentPath = 'チケット 登録'
    }
    await this.getProperties()
    await this.getIssueDetail()
  },
  mounted () {
    // console.log('EditIssue mounted')
  },
  destroy () {
    editstate.clearCurrentPath()
    editstate.clearCurrentIssId()
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
  .form-dummy {
    height: 0px;
  }
  .button-group {
    margin-top: 1em;
  }
  .update {
    margin-left: 1em;
  }
  .edit-field {
    height: 500px;
    overflow-y: auto;
  }
  .attachment-field {
    height: 500px;
    overflow-y: auto;
  }
  .history-field {
    height: 500px;
    overflow-y: auto;
  }
  .button-group .attachment {
    margin-bottom: 1em;
  }
  .h-divider {
    margin-top:5px;
    margin-bottom:5px;
    height:1px;
    width:100%;
    border-top:1px solid gray;
  }
</style>