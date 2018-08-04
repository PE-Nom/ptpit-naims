var express = require('express')
var app = express()
var fs = require('fs')
var bodyParser = require('body-parser')
var multer = require('multer')
var path = require('path')

// CORSを許可する
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({dest: './tmp/', limits: {fieldSize: 204800 * 1024}}).single('file'))

app.get('/up.html', function (req, res) {
  // res.sendFile(__dirname + '/' + 'up.html')
  res.sendFile(path.join(__dirname, '/up.html'))
})

app.post('/file_upload', function (req, res) {
  console.log('######')
  // console.log(req)
  // let file = path.join(__dirname, '/public/images/' + req.body.originalname)
  console.log('---- チケットId : ', req.body.issueId)
  let file = path.join('C:/home/apache/htdocs/JS/data/', req.body.issueId)
  if (!fs.existsSync(file)) {
    fs.mkdirSync(file)
  }
  file = path.join(file, req.file.originalname)
  console.log(file)
  fs.readFile(req.file.path, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      fs.writeFile(file, data, function (err) {
        let response
        if (err) {
          console.log(err)
        } else {
          response = {
            message: 'Success!',
            filename: req.file.originalname
          }
        }
        console.log(response)
        res.end(JSON.stringify(response))
      })
    }
  })
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(path.join(__dirname, '/public/images'))
  console.log('listening at http://%s:%s', host, port)
})
