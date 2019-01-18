require('dotenv').config();

var express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , keys = require('./models/keys')
  , passport = require('passport')
  , session = require('express-session');

var authen = require('./controllers/authentication');
//app.use(express.static(__dirname + '/../client/build'))

// Init passport
app.use(passport.initialize());
app.use(passport.session());

// Cookie and session
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
  }
}))

//MiddleWare
app.use(require('./controllers'));
app.use(authen);


mongoose.connect(keys.mongoDB.dbURI, (err, data) => {
  console.log('mongoosedb connected');
})

app.listen(5000, function () {
  console.log('SERVER http://localhost:5000')
})