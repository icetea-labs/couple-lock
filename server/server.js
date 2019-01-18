require('dotenv').config();

var express = require('express')
  , app = express()


var authen = require('./controllers/authentication');
//app.use(express.static(__dirname + '/../client/build'))
app.use(require('./controllers'));
app.use(authen);

app.listen(5000, function() {
  console.log('SERVER http://localhost:5000')
})