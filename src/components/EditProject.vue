<template>
  <div class="content-fulied">
    <div class="wrapper attributes header">
      <p @click="backword"> Projectlist </p>
    </div>
    <div class="banner-title">
      <div>
        <h1>{{ msg }}</h1>
        <p class="explanation">{{explanation}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'

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
    }
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