var express = require('express')
var app = express()
var fs = require('fs')
var bodyParser = require('body-parser')
var multer = require('multer')
var path = require('path')

const folderPath = 'C:/home/apache/htdocs/JS/data/'
// const folderPath = '/var/www/html/JS/data/'
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
  console.log('---- 添付Id : ', req.body.attachId)
  let file = path.join(folderPath, req.body.issueId)
  if (!fs.existsSync(file)) {
    fs.mkdirSync(file)
  }
  file = path.join(file, req.body.attachId + '_' + req.file.originalname)
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
          // テンポラリファイルの削除
          let targetRemoveFiles = fs.readdirSync('tmp/')
          for (let file in targetRemoveFiles) {
            fs.unlinkSync('tmp/' + targetRemoveFiles[file], function (err) {
              if (err) {
                console.error(err)
                process.exit(1)
              } else {
                console.log('unlink : ' + targetRemoveFiles[file])
              }
            })
          }
        }
        console.log(response)
        res.end(JSON.stringify(response))
      })
    }
  })
})

const port = 8081
var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(path.join(__dirname, '/public/images'))
  console.log('listening at http://%s:%s', host, port)
})
