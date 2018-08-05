const pathPropertyName = 'currentpath'
const issIdPropertyName = 'issId'
export default {
  editState: {
    currentProjectId: null,
    currentIssueId: null,
    attachment: null
  },
  setCurrentPath (path) {
    localStorage.setItem(pathPropertyName, path)
  },
  clearCurrentPath () {
    localStorage.removeItem(pathPropertyName)
  },
  getCurrentPath () {
    let path = localStorage.getItem(pathPropertyName)
    return path
  },
  setCurrentIssId (id) {
    localStorage.setItem(issIdPropertyName, id)
  },
  clearCurrentIssId () {
    localStorage.removeItem(issIdPropertyName)
  },
  getCurrentIssId () {
    let id = localStorage.getItem(issIdPropertyName)
    return id
  }
}
