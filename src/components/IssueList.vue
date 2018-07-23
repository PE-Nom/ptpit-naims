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
    getProperties: async function () {
      await naim.retrieveUsers()
      await naim.retrieveIssueDetail(4 /* issue id */)
      await naim.retrieveIssuePriorities()
      await naim.retrieveIssueStatuses()
      await naim.retrieveTrackers()
      await naim.retrieveTimeEntryActivities()
      await naim.retrieveDocumentCategories()
    }
  },
  mounted () {
    this.getProperties()
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
