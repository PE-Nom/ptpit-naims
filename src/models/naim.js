import redmine from './redmine.js'

export default {

  projects: Array,
  issues: Array,

  initialize: async function (user) {
    redmine.configure(user)
    this.clearProjects()
    this.clearIssues()
    try {
      // Project List
      await this.retrievPojects()
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

  getPorjects: function () {
    // projectのディープコピーを返す
    /*
    const prjs = []
    this.projects.forEach(element => {
      let jsstr = JSON.parse(element)
      prjs.push(JSON.stringify(jsstr))
    })
    return prjs
    */
    // projectsのシャローコピーを返す
    // return Object.assign({}, this.projects)

    // projectsの参照をそのまま返す
    return this.projects
  },

  clearProjects: function () {
    this.projects = []
  },

  getIssues: function () {
    /*
    const iss = []
    this.issues.forEach(element => {
      let jsstr = JSON.parse(element)
      iss.push(jsstr)
    })
    return iss
    */
    // return Object.assign({}, this.issues)
    return this.issues
  },

  clearIssues: function () {
    this.issues = []
  }

}
