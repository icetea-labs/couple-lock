var express = require('express')
    , router = express.Router()
    ,passport = require('passport');

var passpost = require('./passport-setup'); 

router.route('/google')
    .get(passport.authenticate('google', { scope: ['profile'] }
    ))
    .post((req, res) => {

    });

module.exports = router;