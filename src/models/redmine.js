import axios from 'axios'

// const BASE_URL = 'http://192.168.10.8:3001/' // @home
const BASE_URL = 'http://192.168.10.9:3001/' // @home let's note
// const BASE_URL = 'http://192.168.1.4:3001/' // @ Office

export default {
  rmc: null,

  configure (user) {
    this.rmc = axios.create({
      baseURL: BASE_URL,
      auth: {
        username: user.username,
        password: user.password
      },
      json: true
    })
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

  async customFields (params, callback) {
    await this.rmc.get('/custom_fields.json', params)
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
