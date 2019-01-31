module.exports = {
    get: function(env) {
        env = env || process.env.NODE_ENV || "development";
        return this[env];
    },

    development: {
        datastore: 'smart', // 'ram', 'leveldb', 'smart'
        seed: true,

        // More config goes here
    }
}