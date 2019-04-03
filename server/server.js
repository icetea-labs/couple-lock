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
  , MyModel = require('./models/user-model')
  , chat_room = require('./chat/chatroom');


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

  //  listen event on client
  socket.on('createNoti', (receiver) => {
    // test on server
    console.log('receive is:', receiver);

    // Create emit on server
    io.sockets.emit('receiveNoti', receiver);
  });

  socket.on('disconnect', () => {
    console.log('user Disconnected');
  })

  // TODO: listen on event Send message.

  socket.on('sendMessage', (message, roomName, receiver) => {

    // TODO: checkmessage
    console.log('Server receive a message')
    console.log(message, roomName, receiver);
    // TODO: find chat room,
    mongoose.connect(keys.mongoDB.dbURI, () => {
      MyModel.findOne({ "name": roomName })
        .then((data, err) => {
          // TODO: Client receiver roomChat,

          // TODO: Save message to chatRoom
          // console.log(data);
          var test = data.toJSON();
          console.log(test.members);
        }).catch(err => {
          console.log(err);
        })
    })

    // TODO : client receiver roomchat
    io.sockets.emit('receiveMessage', message, roomName, receiver);

  });
});

server.listen(5000, function () {
  console.log('SERVER http://localhost:5000')
})
