import axios from 'axios'

const BASE_URL = 'http://localhost:3001/'
// const BASE_URL = 'http://192.168.10.8:3001/' // @home
// const BASE_URL = 'http://192.168.10.9:3001/' // @home let's note
// const BASE_URL = 'http://192.168.1.10:3001/' // @ Office
// const BASE_URL = 'http://localhost:3000/' // @ Office
// const BASE_URL = 'http://172.20.10.2:3001/' // @ iPhone デザリング
// const BASE_URL = 'http://192.168.1.5:8080/' // On Ubuntu @ Office

export default {
  rmc: null,
  configured: false,

  configure (user) {
    if (user) {
      this.rmc = axios.create({
        baseURL: BASE_URL,
        auth: {
          username: user.username,
          password: user.password
        },
        json: true
      })
      this.configured = true
    } else {
      this.rmc = null
      this.configured = false
    }
  },
  isConfigured () {
    return this.configured
  },

  async execute (method, resource, data /* , callback */) {
    return this.rmc({
      method,
      url: resource,
      data
    })
  },

  async queryExecute (method, path, params, callback) {
    console.log('redmine.js')
    console.log(' method : ' + method)
    console.log(' url    : ' + path)
    console.log(' data   : ' + params)
    await this.rmc({method: method, url: path, data: params})
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw err
      })
  },

  // ============
  // Users
  // ============
  async users (callback) {
    await this.rmc.get('/users.json')
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw err
      })
  },

  // ============
  // Custom Field
  // ============
  async customFields (params, callback) {
    await this.rmc.get('/custom_fields.json', params)
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw err
      })
  },

  // ============
  // Project
  // ============
  async projects (params, callback) {
    // this.execute('GET', '/projects.json', params, callback)
    // await this.rmc({method: 'GET', url: '/projects.json', params})
    await this.rmc.get('/projects.json', params)
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw err
      })
  },
  async createProject (data, callback) {
    console.log('createProject @ redmine.js')
    await this.rmc.post('/projects.json', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw (err)
      })
  },
  async updateProject (prjId, data, callback) {
    console.log('updateProject @ redmine.js')
    await this.rmc.put('/projects/' + prjId + '.json', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw (err)
      })
  },
  async deleteProject (prjId, callback) {
    console.log('deleteProject @ redmain.js')
    await this.rmc.delete('/projects/' + prjId + '.json')
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw (err)
      })
  },

  // ============
  // Issue
  // ============
  async issues (callback) {
    // this.execute('GET', '/issues.json', {}, callback)
    // await this.rmc({method: 'GET', url: '/issues.json'})
    await this.rmc.get('/issues.json')
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw err
      })
  },
  async createIssue (data, callback) {
    console.log('createIssue @ redmine.js')
    await this.rmc.post('/issues.json', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw (err)
      })
  },
  async updateIssue (issId, data, callback) {
    // console.log('updateIssue @ redmine.js')
    await this.rmc.put('/issues/' + issId + '.json', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw (err)
      })
  },
  async getIssue (issId, callback) {
    // console.log('getIssue @ redmine.js')
    // await this.rmc.put('/issues/' + issId + '.json&include=journals')
    await this.rmc.get('/issues/' + issId + '.json?include=attachments,journals')
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw (err)
      })
  },
  async getIssueStatuses (callback) {
    // console.log('getIssueStatuses @ redmine.js')
    await this.rmc.get('/issue_statuses.json')
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw err
      })
  },

  // ============
  // Trackers
  // ============
  async getTrackers (callback) {
    // console.log('getTrackers @ redmine.js')
    await this.rmc.get('/trackers.json')
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw err
      })
  },

  // ============
  // Enumeration
  // ============
  async getIssuePriorities (callback) {
    // console.log('getIssuePriority @ reamine.js')
    await this.rmc.get('/enumerations/issue_priorities.json')
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw err
      })
  },
  async getTimeEntryActivities (callback) {
    // console.log('getTimeEntryActivities')
    await this.rmc.get('/enumerations/time_entry_activities.json')
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw err
      })
  },
  async getDocumentCategories (callback) {
    // console.log('getDocumentCategories')
    await this.rmc.get('/enumerations/document_categories.json')
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw err
      })
  }

  /*
  getPosts () {
    return this.execute('get', '/posts')
  },
  getPost (id) {
    return this.execute('get', `/posts/${id}`)
  },
  createPost (data) {
    return this.execute('post', '/posts', data)
  },
  updatePost (id, data) {
    return this.execute('put', `/posts/${id}`, data)
  },
  deletePost (id) {
    return this.execute('delete', `/posts/${id}`)
  }
  */
}
