var express = require('express')
  , http = require('http')
  , port = process.env.PORT || 3000
  , app = express()
  , server = require('http').Server(app)
  , path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

server.listen(port)
