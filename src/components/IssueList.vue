<template>
  <div class="banner-title">
    <div>
      <h1>{{ msg }}</h1>
      <p class="explanation">{{explanation}}</p>
    </div>
  </div>
</template>

<script>
import naim from '../models/naim.js'

export default {
//  name: 'TicketList',
  data () {
    return {
      msg: 'NAIMS TikectList @ redmine',
      explanation: 'Nonconforming And Incident Management System by Pitarpit Co.,Ltd.'
    }
  },
  methods: {
    getIssueDetail: async function (issId) {
      await naim.retriveIssueDetail(issId)
    }
  },
  mounted () {
    this.getIssueDetail(5)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
