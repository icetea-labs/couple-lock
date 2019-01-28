const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../models/keys');
const User = require('../models/user-model');
const Cookies = require('cookies');
const passport = require('passport');
const session = require('express-session');

// Enable next if ID of user is Ok
passport.serializeUser((user, done) => {000
    console.log('serrializeUser');
    console.log('user is:', '\x1b[36m', user, '\x1b[0m');
    done(null, user.id);
});

// Find user in database, if true return user
passport.deserializeUser((id, done) => {
    console.log('deserrializeUser');
    User.findById(id).then((user) => {
        done(null, user);
    });
});

/**
 * @param { string } google_id take id from user after send request
 */

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: keys.google.callbackURL,
    }, (accessToken, refreshToken, profile, done) => {
        // Using Oauth20
        console.log('passport is using Google Oathu2:');
        var google_id = profile.id;
        User.findOne({ google_id })
            .then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    new User({
                        user_name: null,
                        display_name: profile.displayName,
                        google_id: profile.id,
                        img_url: profile._json.image.url,
                    }).save().then((newUser) => {
                        console.log('new user create: ', newUser);
                        done(null, newUser);
                    }).catch(
                        console.log(err)
                    );
                }
            });
    }));
