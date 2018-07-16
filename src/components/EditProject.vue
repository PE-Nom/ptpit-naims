<template>
  <div class="content-fulied">
    <div class="wrapper attributes header">
      <p @click="backword"> Projectlist </p>
    </div>
    <div class="banner-title">
      <div>
        <h1>{{ msg }}</h1>
        <p class="explanation">{{explanation}}</p>
        <!--
          Projectのオブジェクト
            created_on: 
            custom_fields: [
                          {id: , name: , multiple: true, value: [ , ]},　....調達先（選択式で複数選択可能）
                          {id: , name: , value: }                      ....顧客（選択式）
                        ]
            description: 説明
            id: 
            identifier: プロジェクト識別子（半角英数小文字）
            name: タイトル
            status: 
            updated_on:

          上記項目のうち、以下の項目を編集できるようにする。
            custom_fields:　調達先（選択式で複数選択可能）、顧客（選択式）
            description: 説明
            name: タイトル
            identifier: 識別子
        -->
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
import naim from '../models/naim.js'

export default {
//  name: 'TicketList',
  data () {
    return {
      msg: 'NAIMS EditProject @ redmine',
      explanation: 'Nonconforming And Incident Management System by Pitarpit Co.,Ltd.'
    }
  },
  methods: {
    backword: function () {
      router.push('/projects')
    },
    createProject: async function () {
      try {
        /*
        let query = { 'project': {
          identifier: 'eeeeff',
          name: 'test-02',
          description: 'test02'
        }}
        let qstr = JSON.stringify(query)
        */
        let qstr = '{ ' +
                      '"project": { ' +
                        '"name": "test-002", ' +
                        '"identifier": "eeffgghh002", ' +
                        '"description": "test002" ' +
                      '} ' +
                    '}'
        await naim.createProject(qstr)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.createProject()
  }
}
</script>

<style>
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