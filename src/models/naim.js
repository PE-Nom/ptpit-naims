import redmine from './redmine.js'

export default {

  projects: [],
  customeFileds: [],
  issues: [],

  initialize: async function (user) {
    this.clearProjects()
    this.clearIssues()
    this.clearCustomFileds()
    redmine.configure(user)
    try {
      await this.retrievePojects()
      await this.retrieveCustomFields()
      await this.retrieveIssues()
    } catch (err) {
      this.projects.length = 0
      this.issues.length = 0
      throw err
    }
  },
  finalize: function () {
    this.clearProjects()
    this.clearIssues()
    this.clearCustomFileds()
    redmine.configure()
  },

  // ------------------
  // Projects data
  // ------------------
  retrievePojects: async function () {
    try {
      // Project List
      const prjs = []
      if (redmine.isConfigured()) {
        await redmine.projects({}, res => {
          console.log('==== Retrieve Projects @ naim ====')
          res.data.projects.forEach(element => {
            prjs.push(element)
            // console.log(element)
          })
        })
      }
      // ここで Project List を更新する。
      this.projects = prjs
    } catch (err) {
      throw err
    }
  },
  createProject: async function (qstr) {
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
    let prj = null
    this.projects.forEach(element => {
      if (element.id === id) {
        prj = element
      }
    })
    return prj
  },

  // ------------------
  // CustomField data
  // ------------------
  retrieveCustomFields: async function () {
    try {
      const customfileds = []
      if (redmine.isConfigured()) {
        await redmine.customFields({}, res => {
          console.log('==== CustomFields @ naim ====')
          res.data.custom_fields.forEach(element => {
            customfileds.push(element)
            console.log(element)
          })
        })
      }
      // ここで customfields List を更新する。
      this.customeFileds = customfileds
    } catch (err) {
      throw err
    }
  },
  findCustomFieldId: function (fieldName) {
    let fieldId
    this.customeFileds.forEach(element => {
      if (element.name === fieldName) {
        fieldId = element.id
      }
    })
    return fieldId
  },
  getCustomeFileds: function () {
    return this.customeFileds
  },
  clearCustomFileds: function () {
    this.customeFileds = []
  },

  // ------------------
  // Issue data
  // ------------------
  retrieveIssues: async function () {
    try {
      // Issues List
      const iss = []
      if (redmine.isConfigured()) {
        await redmine.issues(res => {
          console.log('==== Issues @ naim ====')
          res.data.issues.forEach(element => {
            iss.push(element)
            console.log(element)
          })
        })
      }
      // ここで Issue List を更新する。
      this.issues = iss
    } catch (err) {
      throw err
    }
  },

  getIssues: function () {
    return this.issues
  },
  clearIssues: function () {
    this.issues = []
  }

}
