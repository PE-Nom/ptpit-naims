import axios from 'axios'

// const BASE_URL = 'http://192.168.10.8:3001/' // @home
// const BASE_URL = 'http://192.168.10.9:3001/' // @home let's note
const BASE_URL = 'http://192.168.1.4:3001/' // @ Office

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

  async projects (params, callback) {
    // this.execute('GET', '/projects.json', params, callback)
    await this.rmc({mrthod: 'GET', url: '/projects.json', params})
      .then(res => {
        callback(res)
      })
      .catch(err => {
        throw err
      })
  },

  async issues (callback) {
    // this.execute('GET', '/issues.json', {}, callback)
    await this.rmc({method: 'GET', url: '/issues.json'})
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
