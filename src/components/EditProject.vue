<template>
  <div class="content-fulied">
    <div class="wrapper attributes header">
      <b-navbar v-if="showNavbar" toggleable="md" type="dark" variant="success">
        <b-navbar-brand to="/projects">&lt;&lt; Project List</b-navbar-brand>
        <b-nav-text>プロジェクト登録／ユーザ：{{this.user.username}}</b-nav-text>
      </b-navbar>
    </div>
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
            <b-form-select v-model="projectCustomer" :options="customerOptions" class="mb-3">
            </b-form-select>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-10">
            <label for="inputProjcetSupplier" class="control-label">調達先</label>
            <b-form-select multiple :select-size="3" v-model="projectSuppliers" :options="supplierOptions" class="mb-3">
            </b-form-select>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-8">
            <p v-if=errorMessage class="message-field">{{errorMessage}}</p>
          </div>
          <div class="col-md-2">
            <button class="control-button" @click='createProject'>新規登録</button>
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
      projectName: 'Project Name',
      projectIdentifier: '',
      projectDescription: '',
      user: '',
      customerOptions: [{value: '', text: ''}],
      projectCustomer: '',
      supplierOptions: [{value: '', text: ''}],
      projectSuppliers: [],
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
    createProject: async function () {
      try {
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
                        '"custom_fields": [{ "id": 1, "name": "調達先", "multiple": "true", "value": [' + sup + ']},' +
                                          '{ "id": 2, "name": "依頼元", "value": "' + this.projectCustomer + '"}]' +
                      '} ' +
                    '}'
        console.log(qstr)
        console.log(this.projectCustomer)
        console.log(this.projectSuppliers)
        await naim.createProject(qstr)
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
      let prj = naim.findProject(Number(prjid))
      console.log(prj)
    }
  }
}
</script>

<style>
  .control-label {
    float: left;
  }
  .control-button {
    float: right;
  }
  .row-top {
    margin-top: 1em;
  }
  .edit-field {
    height: 450px;
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