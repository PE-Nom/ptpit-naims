<template>
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>
          <div class="modal-body">

            <div>
                <p class="explanation">{{explanation}}</p>
            </div>

          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click='logout'>ログアウト</button>
            <button class="modal-default-button" @click='cancel'>キャンセル</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import naim from '../models/naim.js'
import auth from '../models/auth.js'

export default {
  name: 'LogoutDialog',
  data: function () {
    return {
      explanation: 'ログアウトします。よろしいですか'
    }
  },
  methods: {
    logout: function () {
      console.log('close @ logoutDialog')
      auth.clearUser()
      naim.clearProjects()
      naim.clearIssues()
      this.$emit('logoutClose')
    },
    cancel: function () {
      console.log('close @ logoutDialog')
      this.$emit('cancelClose')
    }
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<style>
@import '../style/modal.css'
</style>
