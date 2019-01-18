module.exports = {
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        passReqToCallback: true,
        callbackURL: 'http://localhost:5000/api/google/callback'
    },

    mongoDB: {
        dbURI: process.env.MONGO_DB_URI,
        useNewUrlParser: true
    }
}