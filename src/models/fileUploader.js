import axios from 'axios'

const BASE_URL = 'http://192.168.1.3:8081' // @ Office

export default {
  async uploadFile (file, data, callback) {
    console.log('uploadFile @ fileUploader.js')
    console.log(data)
    let formData = new FormData()
    formData.append('uploaddata', data)
    formData.append('originalname', file.name)
    await axios.post(BASE_URL + '/file_upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
        console.log('axios.post success')
        console.log(res)
      })
      .catch(err => {
        console.log('axios.post error')
        console.log(err)
      })
  }
}
