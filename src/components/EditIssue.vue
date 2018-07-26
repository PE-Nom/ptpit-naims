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
            <h4>id : #{{this.issId}}  </h4>
            <label for="inputSubject" class="control-label">題名</label>
            <input type="text" class="form-control" id="inputSubject" placeholder="題名" v-model="this.subject">
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
        <!-- 情報アコーディオン -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion-priority-and-status variant="success">チケット情報</b-btn>
          </b-card-header>
          <b-collapse id="accordion-priority-and-status" accordion="my-accordion" role="tabpanel">
            <b-card-body>
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
                  <b-form-select v-model="projectId" :options="projects">
                  </b-form-select>
                  <!--
                  <input type="text" class="form-control" id="inputProjectName" placeholder="プロジェクト名" v-model="this.projectName">
                  -->
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-10">
                  <label for="inputDescription" class="control-label">説明</label>
                  <!--
                  <input type="text" class="form-control" id="inputDescription" placeholder="説明の記述" v-model="this.description">
                  -->
                  <textarea class="form-control" rows="3" id="inputDescription" placeholder="説明の記述" v-model="this.description"></textarea>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
        <!-- スケジュール アコーディオン -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion-schedule variant="success">スケジュール</b-btn>
          </b-card-header>
          <b-collapse id="accordion-schedule" accordion="my-accordion" role="tabpanel">
            <b-card-body>
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
            </b-card-body>
          </b-collapse>
        </b-card>
        <!-- メンバー アコーディオン -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion-menber variant="success">メンバー</b-btn>
          </b-card-header>
          <b-collapse id="accordion-menber" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="form-group">
                <div class="col-md-10">
                  <label for="inputAssigned" class="control-label">担当者</label>
                  <b-form-select v-model="assigned" :options="users">
                  </b-form-select>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-10">
                  <label for="inputAuthor" class="control-label">作成者</label>
                  <b-form-select v-model="author" :options="users">
                  </b-form-select>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
        <!-- 時間と注記 アコーディオン -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion-notation variant="success">作業時間の記録と注記</b-btn>
          </b-card-header>
          <b-collapse id="accordion-notation" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <!-- 時間の記録と注記の入力欄 -->
              <label for="inputActivities" class="control-label">活動</label>
              <b-form-select v-model="activity" :options="activities">
              </b-form-select>
              <label for="inputWorkingTime" class="control-label">作業時間</label>
              <input type="text" class="form-control" id="inputWorkingTime" v-model="workingTime">
              <label for="inputComment" class="control-label">コメント</label>
              <input type="text" class="form-control" id="inputComment" v-model="comment">
              <label for="inputNotaion" class="control-label">注記</label>
              <textarea class="form-control" rows="3" id="inputNotation" v-model="notation"></textarea>
            </b-card-body>
          </b-collapse>
        </b-card>
        <!-- 添付ファイル アコーディオン -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion-files variant="info">添付ファイル</b-btn>
          </b-card-header>
          <b-collapse id="accordion-files" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <!-- 添付ファイルのリスト表示領域 -->
              <b-list-group>
                <b-list-group-item v-for="(val, idx) in attachments" v-bind:key=idx>
                  {{val.caption}}
                </b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
        </b-card>
        <!-- 履歴 アコーディオン -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion-history variant="info">更新履歴</b-btn>
          </b-card-header>
          <b-collapse id="accordion-history" accordion="my-accordion" role="tabpanel">
            <b-card-body>
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
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
    <div class="button-group">
      <div class="col-md-8">
        <p v-if=errorMessage class="message-field">{{errorMessage}}</p>
      </div>
      <div class="col-md-2">
        <b-button class="control-button create" variant="success" v-if="this.new" @click='createIssue'>新規登録</b-button>
        <b-button class="control-button update" variant="success" v-if="!this.new" @click='updateIssue'>更新</b-button>
      </div>
    </div>

  </div>
</template>

<script>
import naim from '../models/naim.js'
import editstate from '../models/editState.js'
import dateSelector from './DateSelector.vue'

export default {
  components: {
    dateSelector
  },
  data () {
    return {
      new: false,
      currentPath: '',
      issId: null,
      issDetail: null,
      projectName: '',
      projectId: '',
      projects: [{value: '', text: ''}],
      subject: '',
      description: '',
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
  methods: {
    startDate: function (date) {
      this.start_date = date.format(this.dateFormat)
      // console.log('開始日' + this.start_date)
    },
    dueDate: function (date) {
      this.due_date = date.format(this.dateFormat)
      // console.log('期日' + this.due_date)
    },
    createIssue: async function () {
    },
    updateIssue: async function () {
      console.log('updateIssue')
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
        this.projectName = this.issDetail.project.name
        this.projectId = this.issDetail.project.id
        this.subject = this.issDetail.subject
        this.description = this.issDetail.description
        this.tracker = this.issDetail.tracker.id
        this.issueStatus = this.issDetail.status.id
        this.issuePriority = this.issDetail.priority.id
        this.author = this.issDetail.author.id
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
            caption: el.filename + '(' + parseInt(el.filesize / 1000) + 'kbyte) : ' + el.description,
            item: el
          }
          attachmentItems.push(item)
        })
        this.attachments = attachmentItems
        // 履歴のリスト
        this.journals = []
        this.issDetail.journals.forEach(journal => {
          let details = []
          journal.details.forEach(detail => {
            let name = detail.name
            let oldValue = detail.old_value ? detail.old_value : '未定義'
            let newValue = detail.new_value
            let str = name + ' : ' + oldValue + ' -> ' + newValue
            details.push(str)
          })
          this.journals.push({id: journal.id, created_on: journal.created_on, details: details})
        })
        console.log(this.journals)
      } else {
        this.new = true
        this.currentPath = 'チケット 登録'
      }
    },
    getProjects: async function () {
      let prjs = naim.getProjects()
      this.projects = this.convertOptions(prjs, 'name')
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
      await this.getProjects()
      await this.getUsers()
      await this.getTrackerOptions()
      await this.getIssueStatuses()
      await this.getIssuePriorities()
      await this.getTimeEntryActivities()
      await this.getDocumentCategries()
    }
  },
  created () {
    // console.log('EditIssue created')
    this.getIssueDetail()
    this.getProperties()
  },
  mounted () {
    // console.log('EditIssue mounted')
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
    height: 550px;
    overflow-y: auto;
  }
</style>