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
  console.log(req.body.originalname)
  // let file = path.join(__dirname, '/public/images/' + req.body.originalname)
  let file = path.join('C:/home/apache/htdocs/JS/data', req.body.originalname)
  console.log(file)
  fs.writeFile(file, req.body.uploaddata, function (err) {
    let response
    if (err) {
      console.log(err)
    } else {
      response = {
        message: 'Success!',
        filename: req.body.originalname
      }
    }
    console.log(response)
    res.end(JSON.stringify(response))
  })
  /*
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
            filename: req.body.originalname
          }
        }
        console.log(response)
        res.end(JSON.stringify(response))
      })
    }
  })
  */
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(path.join(__dirname, '/public/images'))
  console.log('listening at http://%s:%s', host, port)
})
