export default {
  convertOptions: function (values) {
    let options = []
    values.forEach(el => {
      let option = {
        value: el.value,
        text: el.label
      }
      options.push(option)
    })
    return options
  },
  getNowYMD: function () {
    var dt = new Date()
    var y = dt.getFullYear()
    var m = ('00' + (dt.getMonth() + 1)).slice(-2)
    var d = ('00' + dt.getDate()).slice(-2)
    var result = y + '-' + m + '-' + d
    return result
  }
}
