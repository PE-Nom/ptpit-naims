import axios from 'axios'

// const BASE_URL = 'http://192.168.10.3:8081' // @ Home
// const BASE_URL = 'http://192.168.1.5:8081' // @ Office Ubuntu
// const BASE_URL = 'http://192.168.10.5:8081' // for demo pitarpit dell
// const BASE_URL = 'http://192.168.10.100:8081' // for demo home let's note

// const BASE_URL = 'http://192.168.1.3:8081' // @ Office
const BASE_URL = 'https://192.168.10.9:8081' // @ Office

export default {
  async uploadFile (issId, attachId, file, data, callback) {
    console.log('uploadFile @ fileUploader.js')
    console.log(data)
    let formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('issueId', issId)
    formData.append('attachId', attachId)
    // formData.append('originalname', file.name)
    await axios.post(BASE_URL + '/file_upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
        console.log('axios.post success')
        console.log(res)
      })
      .catch(err => {
        console.log('axios.post error')
        console.log(err)
        throw err
      })
  }
}
