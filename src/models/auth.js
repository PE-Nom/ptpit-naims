export default {
  user: {
    username: null,
    password: null
  },
  setUser (user) {
    this.user = user
    console.log('user:username ' + this.user.username)
    console.log('user:password ' + this.user.password)

    localStorage.setItem('username', this.user.username)
    localStorage.setItem('password', this.user.password)
  },
  clearUser () {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
  },
  getUser () {
    if (!this.user.username && !this.user.password) {
      this.user.username = localStorage.getItem('username')
      this.user.password = localStorage.getItem('password')
    }
    return this.user
  }
}
