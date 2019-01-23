require('dotenv').config();

var express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , keys = require('./models/keys')
  , passport = require('passport')
  , session = require('express-session')
  , cookieParser = require('cookie-parser')

var authen = require('./controllers/authentication');
//app.use(express.static(__dirname + '/../client/build'))

// Trust proxy
app.set('trust proxy', 1);

// Init passport
app.use(passport.initialize());
app.use(passport.session());

// cookie Parser
app.use(cookieParser());

// Cookie and session
app.use(session({
  secret: process.env || null,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires : 1000*60*60*24*7,
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
