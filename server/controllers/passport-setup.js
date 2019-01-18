const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../models/keys');
const User = require('../models/user');
const session = require('express-session');
const passport = require('passport');

passport.serializeUser((user, done) => {
    console.log('serrializeUser')
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: keys.google.callbackURL,
    }, (accessToken, refreshToken, profile, done, req, res) => {
        console.log('passport is using Google Oathu2:');
        console.log(profile);
        User.findOne({
            googleid: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                console.log('existed');
            } else {
                new User({
                    username: profile.displayName,
                    googleid: profile.id,
                }).save().then((newUser) => {
                    console.log('new user create: ', newUser);
                });
            }
        });
    }));