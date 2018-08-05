<template>
  <div class="banner-title">
    <div>
      <h1>{{ msg }}</h1>
      <p class="explanation">{{explanation}}</p>
    </div>
  </div>
</template>

<script>
import editstate from '../models/editState.js'
export default {
  // name: 'Home',
  data () {
    return {
      msg: 'NAIMS',
      explanation: 'Nonconforming And Incident Management System by Pitarpit Co.,Ltd.'
    }
  },
  created () {
    console.log('home created')
    editstate.setCurrentPath('/')
  },
  destroy () {
    editstate.clearCurrentPath()
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
