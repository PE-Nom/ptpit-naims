<template>
  <div class="container-fluid">
    <!-- #### Desktop用 #### -->
    <div class="desktop">
      <div id="query-box">
        <form id="search">
          <input name="query" class="filter" v-model="searchQuery" placeholder="フィルタ文字列">
          <!--
          <input name="query" v-model="searchQuery" placeholder="フィルタ文字列">
          -->
        </form>
      </div>
      <div class="table-row header">
        <div class="wrapper attributes header">
          <div v-for="(val, idx) in columns" v-bind:key=idx @click="sortBy(val)" :class="[{ active: sortKey == val }, val]">
            {{ val }}
            <span class="arrow" :class="sortOrders[val] > 0 ? 'asc' : 'dsc'"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- #### tablet用 #### -->
    <div class="tablet">
      <b-container class="table-row header">
        <b-row>
          <label class="currentpath-user" >プロジェクト一覧</label>
        </b-row>
        <b-row>
          <b-col cols="6">
            <!--
            <b-form-input type="text" v-model="searchQuery" placeholder="フィルタ文字列"></b-form-input>
            -->
            <input name="query" class="filter" v-model="searchQuery" placeholder="フィルタ文字列">
          </b-col>
          <b-col cols="4">
            <b-dropdown id="ddown-buttons" split right variant="success" size="sm" class="sorter">
              <template slot="button-content">
                {{sortKey}}
                <span class="arrow" :class="sortOrders[sortKey] > 0 ? 'asc' : 'dsc'"></span>
              </template>
              <b-dropdown-item v-for="(val, idx) in columns" v-bind:key=idx @click="sortBy(val)" :class="[{ active: sortKey == val }, { focus: sortKey == val }]">
                {{ val }}
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
          <b-col cols="1">
            <img :src="icon_new_project" v-if="this.userName" class="new_project" width='30px' height='30px' @click="createProject"/>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="data-field">
      <div v-for="(entry,idx) in projects" v-bind:key=idx @click="editProject(entry)">
        <div class="table-row data">
          <div class="wrapper attributes data">
            <div v-for="(val, idx) in columns" v-bind:key=idx :class="[val]">
              <span>
                {{entry[val]}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../models/auth.js'
import naim from '../models/naim.js'
import editstate from '../models/editState.js'
import iconNew from '../assets/new.png'
import router from '../router'

export default {
  data () {
    let sortOrders = {}
    let columns = ['id', '名称', '顧客', '調達先', '説明']
    columns.forEach(function (key) {
      sortOrders[key] = 1
    })

    return {
      userName: '',
      icon_new_project: iconNew,
      columns: columns,
      searchQuery: '',
      sortKey: 'キー',
      sortOrders: sortOrders
    }
  },
  computed: {
    projects: function () {
      console.log('### project computed property in ProjectList.vue ####')
      let ret = []
      let prjs = naim.getProjects()
      // console.log(prjs)
      prjs.forEach(element => {
        // 調達先（複数指定可）の文字列生成
        let supplier = ''
        if (element.custom_fields[0].multiple) {
          element.custom_fields[0].value.forEach(el => {
            if (supplier.length === 0) {
              supplier = el
            } else {
              supplier += ', ' + el
            }
          })
        } else {
          supplier = element.custome_fields[0].value[0]
        }
        // 顧客の文字列生成
        let customer = element.custom_fields[1].value
        // 説明欄の改行コードエスケープ
        let desc = String(element.description)
        desc = desc.replace(/(\r\n)/g, '\\\\n')
        // Project List の表示オブジェクト生成
        let rec = '{' +
          ' "id" : "' + '#' + element.id + '"' +
          ',"名称" : "' + element.name + '"' +
          ',"顧客" : "' + customer + '"' +
          ',"調達先" : "' + supplier + '"' +
          ',"説明" : "' + desc + '"' +
          ' }'
        let obj = JSON.parse(rec)
        ret.push(obj)
      })
      let filterKey = this.searchQuery && this.searchQuery.toLowerCase()
      if (filterKey) {
        // console.log('filterData by filterKey changed');
        ret = ret.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      let sortKey = this.sortKey
      let order = this.sortOrders[sortKey] || 1
      if (sortKey) {
        // console.log('filterData by sortKey changed');
        ret = ret.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return ret
    }
  },
  methods: {
    sortBy: function (key) {
      console.log('sortBy : key=' + key)
      console.log(this.sortOrders)
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    editProject: function (prj) {
      console.log('edit project')
      console.log(prj)
      editstate.currentProjectId = prj.id.slice(1)
      router.push('/editproject')
    },
    createProject: function () {
      console.log('create project')
      editstate.currentProjectId = -1
      router.push('/editproject')
    }
  },
  created () {
    console.log('/projects created')
    editstate.setCurrentPath('/projects')
  },
  mounted () {
    console.log('ProjectList.vue mounted')
    this.userName = auth.getUser().username
  },
  destroy () {
    editstate.clearCurrentPath()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container-fluid{
    padding: 5px;
    width: 100%;
  }
  .wrapper {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
  }
  /* growable wrappers */
  .attributes {
    flex-grow: 0;
    -webkit-flex-grow: 0;
  }
  .table-row {
    border-bottom: 1px solid #e0e0e0;
    border-collapse: collapse;
  }
  .table-row.header {
    background-color: rgb(229, 255, 219);
    font-weight: bold;
    padding-top: 6px;
    padding-bottom: 6px;
  }
  .wrapper.attributes.header {
    height: 50px;
  }
  .filter {
    width: 100%;
  }

  .data-field {
    height: 100vh;
    overflow-y: auto;
  }
  .wrapper.attributes.data {
    height: 100px;
  }

  .id {
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .名称 {
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .顧客 {
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .調達先 {
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .説明 {
    width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }

  .desktop {
    font-size: 80%;
    font-weight: bold;
    display: block;
  }
  .tablet {
    font-size: 80%;
    font-weight: bold;
    display: none;
  }

  /*
   * Media queries: optimize for different screen widths.
   */
  @media screen and (max-device-width: 768px),screen and (max-width: 768px)
  {
    .wrapper.attributes.header {
      height: auto;
    }
    .wrapper.attributes.data {
      height: auto;
    }
    .desktop {
      font-size: 80%;
      font-weight: bold;
      display: none;
    }
    .tablet {
      font-size: 80%;
      font-weight: bold;
      display: inline;
    }
    .currentpath-user {
      font-size: small;
      color:  rgb(26, 92, 0);
      margin-left: 1em;
    }
    .sorter {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      -webkit-transform: translateY(-50%) translateX(-50%);
      /* float: right; */
    }
    .new_project {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      -webkit-transform: translateY(-50%) translateX(-50%);
      /* float: right; */
    }
    .dropdown .dropdown-menu .dropdown-item:focus {
      outline: none;
      /*
      background-color: #eaeaea;
      color: #1d1e1f;
      */
    }
    .data-field {
      height: 600px;
      overflow-y: auto;
    }
    .filter {
      width: 100%;
      font-size: 16px;
      /* transform: scale(0.8); */
    }
    .ReviewComment {
      overflow: visible;
      white-space: normal;
      text-overflow: clip;
      word-wrap: break-word;
    }
    .attributes {
     flex-direction: column;
      -webkit-flex-direction: column;
    }
    .attributes div {
      flex-grow: 0;
      -webkit-flex-grow: 0;
    }
    .attributes > div {
      width: 100%;
    }
  }
  /*
   * General good-look styles
   */
  div.active {
    color: rgb(55, 11, 177);
  }
  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.0;
  }
  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #000;
  }
  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #000;
  }
  .sorter .arrow {
    opacity: 1;
  }
  div.active .arrow {
    opacity: 1;
  }
  div.active .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid rgb(55, 11, 177);
  }
  div.active .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid rgb(55, 11, 177);
  }
</style>