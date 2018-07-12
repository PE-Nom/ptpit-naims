import Vue from 'vue'
import Router from 'vue-router'
import IssueList from '@/components/IssueList'
import ProjectList from '@/components/ProjectList'
import EditProject from '@/components/EditProject'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/tickets',
      name: 'TicketList',
      component: IssueList
    },
    {
      path: '/projects',
      name: 'ProjectList',
      component: ProjectList
    },
    {
      path: '/editproject',
      name: 'EditProject',
      component: EditProject
    }
  ]
})
