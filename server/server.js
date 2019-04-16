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
  , db = require('./models/user-model')

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

  //  listen on event Send message.
  socket.on('sendMessage', (message, roomName, sender) => {

    // console.log(sender);

    // find chat room,
    mongoose.connect(keys.mongoDB.dbURI, () => {

      var my_querry = { name: "paulra_sotatek" };
      var new_message = {

        $push: {
          messages: {
            $each: [{
              id: message.id,
              content: message.content,
              timestamp: message.timestamp,
              owner: message.owner}],

            $possition: -1
          }
        }
      }

      db.update(my_querry, new_message, function (err, res) {
        if (err) {
          console.log(err);
          throw err;
        };
        console.log(res);
        console.log("add 1 message");
      }).exec()
        .then((data) => { console.log(data) })
        .catch(err => { console.log(err) });

      // Send to receiver
      db.findOne({ "name": roomName })
        .then((data) => {
          // Find all member in chatroom
          var receiver = [];
          let intance = data.toJSON();
          for (let i = 0; i < intance.members.length; i++) {
            if (sender !== intance.members[i].username) {
              receiver.push(intance.members[i]);
            }
          }
          // console.log(receiver);
          io.sockets.emit('receiveMessage', message, roomName, receiver);
        }).catch(err => { console.log(err) });

    });

    // TODO : client receiver roomchat

  });
});

server.listen(5000, function () {
  console.log('SERVER http://localhost:5000')
})
