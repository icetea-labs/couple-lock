module.exports = {
    get: function(env) {
        env = env || process.env.NODE_ENV || "development";
        return this[env];
    },

    development: {
        datastore: 'leveldb', // 'ram' or 'leveldb'
        seed: true,

        // More config goes here
    }
}