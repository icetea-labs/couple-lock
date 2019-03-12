require('dotenv').config();

const bodyParser = require('body-parser');
var express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , keys = require('./models/keys')
  , passport = require('passport')
  , session = require('express-session')
  , cookieParser = require('cookie-parser')
  , socketIO = require('socket.io')
  , http = require('http')


const server = http.createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
app.use(require('./controllers'))
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
    expires: 1000 * 60 * 60 * 24 * 7,
    secure: true,
  }

}))

//MiddleWare
app.use(require('./controllers'));
app.use(authen);

// io connect

const io = socketIO(server);
io.on('connection', socket => {
  console.log("User Connected", socket.id);

 //  listen on event create Noti
  socket.on('createNoti', (receiver) =>{
    // test on server
    console.log('receive is:', receiver);

    // Create emit receiverNoti and all Client will see it
    io.sockets.emit('receiveNoti',receiver);
  });

  socket.on('disconnect', ()=> {
    console.log('user Disconnected');
  })
});

mongoose.connect(keys.mongoDB.dbURI, (err, data) => {
  console.log('mongoosedb connected');
})

server.listen(5000, function () {
  console.log('SERVER http://localhost:5000')
})
