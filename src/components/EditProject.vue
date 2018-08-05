<template>
  <div class="content-fulied">
    <b-navbar v-if="showNavbar" type="dark" variant="success">
      <b-navbar-brand to="/projects">&lt;&lt; プロジェクト一覧</b-navbar-brand>
    </b-navbar>
    <b-container class="table-row header">
      <label class="currentpath-user" >{{this.currentPath}}</label>
    </b-container>

    <div class="edit-field">
      <div>
        <div class="form-group row-top">
          <div class="col-md-10">
            <label for="inputName" class="control-label">プロジェクト名</label>
            <input type="text" class="form-control" id="inputName" placeholder="プロジェクト名" v-model="projectName">
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-10">
            <label for="inputIdentifier" class="control-label">プロジェクト識別子</label>
            <input type="text" class="form-control" id="inputIdentifier" placeholder="プロジェクト識別子" v-model="projectIdentifier">
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-10">
            <label for="inputDescription" class="control-label">説明</label>
            <textarea class="form-control" rows="3" id="inputDescription" v-model="projectDescription"></textarea>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-10">
            <label for="inputProjcetCutomer" class="control-label">依頼元</label>
            <b-form-select v-model="projectCustomer" :options="customerOptions">
            </b-form-select>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-10">
            <label for="inputProjcetSupplier" class="control-label">調達先</label>
            <b-form-select multiple :select-size="3" v-model="projectSuppliers" :options="supplierOptions">
            </b-form-select>
          </div>
        </div>
        <div class="button-group">
          <div class="col-md-8">
            <p v-if=errorMessage class="message-field">{{errorMessage}}</p>
          </div>
          <div class="col-md-2">
            <b-button class="control-button create" variant="success" v-if="this.new" @click='createProject'>新規登録</b-button>
            <b-button class="control-button update" variant="success" v-if="!this.new" @click='updateProject'>更新</b-button>
            <b-button class="control-button delete" variant="success" v-if="!this.new" @click='deleteProject'>削除</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
import naim from '../models/naim.js'
import auth from '../models/auth.js'
import editstate from '../models/editState.js'

export default {
  data () {
    return {
      currentPath: '',
      projectId: null,
      projectName: '',
      projectIdentifier: '',
      projectDescription: '',
      user: '',
      customerOptions: [{value: '', text: ''}],
      projectCustomer: '',
      supplierOptions: [{value: '', text: ''}],
      projectSuppliers: [],
      new: true,
      errorMessage: ''
    }
  },
  computed: {
    showNavbar: function () {
      let show = true
      if (this.$route.path !== '/editproject') {
        show = false
      }
      return show
    }
  },
  methods: {
    createQueryString: function () {
      console.log('調達先　id : ' + naim.findCustomFieldId('調達先'))
      console.log('依頼元　id : ' + naim.findCustomFieldId('依頼元'))
      let sup = ''
      this.projectSuppliers.forEach(function (value, index) {
        if (index === 0) {
          sup = '"' + value + '"'
        } else {
          sup += ', "' + value + '"'
        }
      })
      let qstr = '{ ' +
                    '"project": { ' +
                      '"name": "' + this.projectName + '", ' +
                      '"identifier": "' + this.projectIdentifier + '", ' +
                      '"description": "' + this.projectDescription + '", ' +
                      '"is_public": "false", ' +
                      '"custom_fields": [{ "id": ' + naim.findCustomFieldId('調達先') + ', "name": "調達先", "multiple": "true", "value": [' + sup + ']},' +
                                        '{ "id": ' + naim.findCustomFieldId('依頼元') + ', "name": "依頼元", "value": "' + this.projectCustomer + '"}]' +
                    '} ' +
                  '}'
      return qstr
    },
    createProject: async function () {
      try {
        let qstr = this.createQueryString()
        // console.log(qstr)
        // console.log(this.projectCustomer)
        // console.log(this.projectSuppliers)
        await naim.createProject(qstr)
        await naim.retrievePojects()
        router.push('/projects')
      } catch (err) {
        console.log(err)
        this.errorMessage = err.toString()
      }
    },
    updateProject: async function () {
      try {
        let qstr = this.createQueryString()
        await naim.updateProject(this.projectId, qstr)
        await naim.retrievePojects()
        router.push('/projects')
      } catch (err) {
        console.log(err)
        this.errorMessage = err.toString()
      }
    },
    deleteProject: async function () {
      try {
        await naim.deleteProject(this.projectId)
        await naim.retrievePojects()
        router.push('/projects')
      } catch (err) {
        console.log(err)
        this.errorMessage = err.toString()
      }
    },
    convertOptions: function (values) {
      let options = []
      values.forEach(el => {
        let option = {
          value: el.value,
          text: el.label
        }
        options.push(option)
      })
      return options
    }
  },
  created () {
    console.log('EditProject created')
    editstate.setCurrentPath('/editproject')
    this.user = auth.getUser()
    let customFields = naim.getCustomeFileds()
    customFields.forEach(element => {
      if (element.name === '依頼元') {
        this.customerOptions = this.convertOptions(element.possible_values)
        console.log(this.customerOptions)
      } else if (element.name === '調達先') {
        this.supplierOptions = this.convertOptions(element.possible_values)
        console.log(this.supplierOptions)
      }
    })
  },
  mounted () {
    console.log('EditProject mounted')
    let prjid = editstate.currentProjectId
    console.log(prjid)
    if (prjid !== -1) {
      this.new = false
      let prj = naim.findProject(Number(prjid))
      this.projectId = prj.id
      this.projectName = prj.name
      this.projectIdentifier = prj.identifier
      this.projectDescription = prj.description
      this.projectCustomer = prj.custom_fields[1].value
      this.projectSuppliers = []
      prj.custom_fields[0].value.forEach(el => {
        this.projectSuppliers.push(el)
      })
      this.currentPath = 'プロジェクト 更新'
      console.log(prj)
    } else {
      this.currentPath = 'プロジェクト 登録'
    }
  },
  destroy () {
    editstate.clearCurrentPath()
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
  .banner-title {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .explanation {
    font-weight: 200;
    font-size: 1.5rem;
  }
</style>