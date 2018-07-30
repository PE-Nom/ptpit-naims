import Vue from 'vue'
import Router from 'vue-router'
import IssuesList from '@/components/IssuesList'
import ProjectList from '@/components/ProjectList'
import EditProject from '@/components/EditProject'
import EditIssue from '@/components/EditIssue'
import CameraView from '@/components/CameraView'
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
      component: IssuesList
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
    },
    {
      path: '/editissue',
      name: 'EditIssue',
      component: EditIssue
    },
    {
      path: '/cameraview',
      name: 'CameraView',
      component: CameraView
    }
  ]
})
