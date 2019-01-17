require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
app.use(require('./controllers'))

app.listen(5000, function() {
  console.log('Server started.')
})