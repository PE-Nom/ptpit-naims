<template>
  <div id="header-container">
    <div class="container-fluid">

      <!-- #### Desktop用 #### -->
      <div class="desktop">
        <div id="query-box">
          <form id="search">
            <input name="query" id="searchQuery" v-model="searchQuery" placeholder="検索文字列">
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
            <b-col>
              <input type="text" name="query" id="searchQuery" v-model="searchQuery" placeholder="フィルタ文字列">
            </b-col>
            <b-col>
              <b-dropdown id="ddown-buttons" split right variant="primary" size="sm" class="m-1">
                <template slot="button-content" class="m-1">
                  {{sortKey}}
                  <span class="arrow" :class="sortOrders[sortKey] > 0 ? 'asc' : 'dsc'"></span>
                </template>
                <b-dropdown-item-button v-for="(val, idx) in columns" v-bind:key=idx @click="sortBy(val)" :class="{ active: sortKey == val }" class="m-1">
                  {{ val }}
                </b-dropdown-item-button>
              </b-dropdown>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <div class="data-field">
        <div v-for="(entry,idx) in projects" v-bind:key=idx>
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
  </div>
</template>

<script>
import naim from '../models/naim.js'

export default {
  data () {
    let sortOrders = {}
    let columns = ['id', 'タイトル', '顧客', '調達先', '説明']
    columns.forEach(function (key) {
      sortOrders[key] = 1
    })

    return {
      columns: columns,
      searchQuery: '',
      sortKey: 'ソートキー',
      sortOrders: sortOrders
    }
  },
  computed: {
    projects: function () {
      let ret = []
      let prjs = naim.getPorjects()
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
          ',"タイトル" : "' + element.name + '"' +
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
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  },
  mounted () {
    console.log('ProjectList.vue mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  .タイトル {
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
      height: 120px;
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

    .tablet input[type=text] {
      float: left;
      margin-top: 6px;
      font-size: 14px;
    }
    .m-1 {
      float: right;
    }
    .dropdown .dropdown-menu .dropdown-item:focus {
      outline: none;
      /*
      background-color:rgba(255,255,255,1);
      color:rgb(0,0,0,1);
      */
    }
    .data-field {
      height: 450px;
      overflow-y: auto;
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
  .m-1 .arrow {
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