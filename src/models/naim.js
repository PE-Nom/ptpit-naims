import redmine from './redmine.js'

export default {

  projects: Array,
  customeFileds: Array,
  issues: Array,

  initialize: async function (user) {
    redmine.configure(user)
    this.clearProjects()
    this.clearIssues()
    this.clearCustomFileds()
    try {
      // Project List
      await this.retrievPojects()
      // customfileds
      await this.retrieveCustomFields()
      // Issues List
      await this.retrieveIssues()
    } catch (err) {
      console.log('==== naim ====')
      console.log(err)
      this.projects.length = 0
      this.issues.length = 0
      throw err
    }
  },

  retrievPojects: async function () {
    try {
      // Project List
      const prjs = []
      await redmine.projects({}, res => {
        console.log('==== Projects @ naim ====')
        res.data.projects.forEach(element => {
          prjs.push(element)
          console.log(element)
        })
        // ここで Project List を更新する。
        this.projects = prjs
      })
    } catch (err) {
      throw err
    }
  },
  createProject: async function (qstr) {
    console.log(qstr)
    try {
      await redmine.createProject(qstr, res => {
        console.log('==== Create Project @ naim ====')
        console.log(res)
      })
    } catch (err) {
      throw err
    }
  },
  updateProject: async function (prjId, qstr) {
    console.log('updateProject')
    console.log(qstr)
    try {
      await redmine.updateProject(prjId, qstr, res => {
        console.log('==== Update Project @ naim ====')
        console.log(res)
      })
    } catch (err) {
      throw err
    }
  },
  deleteProject: async function (prjId) {
    console.log('deleteProject')
    try {
      await redmine.deleteProject(prjId, res => {
        console.log('==== Delete Project @ naim ====')
        console.log(res)
      })
    } catch (err) {
      throw err
    }
  },
  clearProjects: function () {
    this.projects = []
  },
  getPorjects: function () {
    return this.projects
  },
  findProject: function (id) {
    console.log('findProject in naim')
    let prj = null
    this.projects.forEach(element => {
      if (element.id === id) {
        prj = element
      }
    })
    return prj
  },

  retrieveCustomFields: async function () {
    try {
      const customfileds = []
      await redmine.customFields({}, res => {
        console.log('==== CustomFields @ naim ====')
        res.data.custom_fields.forEach(element => {
          customfileds.push(element)
          console.log(element)
        })
        // ここで customfields List を更新する。
        this.customeFileds = customfileds
      })
    } catch (err) {
      throw err
    }
  },

  retrieveIssues: async function () {
    try {
      // Issues List
      const iss = []
      await redmine.issues(res => {
        console.log('==== Issues @ naim ====')
        res.data.issues.forEach(element => {
          iss.push(element)
          console.log(element)
        })
        // ここで Issue List を更新する。
        this.issues = iss
      })
    } catch (err) {
      throw err
    }
  },

  getCustomeFileds: function () {
    return this.customeFileds
  },
  clearCustomFileds: function () {
    this.customeFileds = []
  },

  getIssues: function () {
    return this.issues
  },
  clearIssues: function () {
    this.issues = []
  }

}
