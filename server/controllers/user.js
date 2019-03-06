var express = require('express')
  , router = express.Router()
  , User = require('../models/user')
  , session = require('express-session')
  , nodePersist = require('./node-persist')
  , Controller = require('./controller')

router.use(session({
  secret: process.env || null,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 1000 * 60 * 60 * 24 * 7,
    secure: true,
  }
}))

new Controller(User, router).details('username').all().create('username')

router.route('/profile')
  .get((req, res) => {
    nodePersist.finddata()
    .then((result) => {
      res.send(result);
    });
  })

module.exports = router
