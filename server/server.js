require('dotenv').config();

var express = require('express')
  , app = express()

//app.use(express.static(__dirname + '/../client/build'))
app.use(require('./controllers'))

app.listen(5000, function() {
  console.log('Server started.')
})