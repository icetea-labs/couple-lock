const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../models/keys');
const User = require('../models/user-model');
const Cookies = require('cookies');
const passport = require('passport');

// Enable next if ID of user is Ok
passport.serializeUser((user, done) => {

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
                    console.log('currentUser is :', currentUser);
                    done(null, currentUser);
                } else {
                    new User({
                        user_name: null,
                        display_name: profile.displayName,
                        google_id: profile.id,
                        img_url: null
                    }).save().then((newUser) => {
                        console.log('new user create: ', newUser);
                        done(null, newUser);
                    });

                }
            });
        // Set Cookie
        // var cookies = new Cookies(req, res, { keys: process.env.SESSION_KEY });
        // cookies.set('user_name_cookie', profile.id, { signed: true });
        // cookies.set('display_name_cookie', profile.displayName, { signed: true });
        // cookies.set('img_url_cookie', profile.img.url, { signed: true });

        // var user_name_cookie = cookies.get('user_name_cookie', { signed: true });
        // var display_name_cookie = cookies.get('display_name_cookie', { signed: true });
        // var img_url_cookie = cookies.get('img_url_cookie', { signed: true });

        // console.log("ALL CREATED COOKIES: ", user_name_cookie, display_name_cookie, img_url_cookie);

    }));
