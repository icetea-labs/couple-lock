const promise = require("../helpers/promise");
const store = require('../services/factory').getStore('user');

exports.one = (username, cb) => {
    return store.one(username, cb);
}

exports.all = (cb) => {
    return store.all(cb);
}

exports.insert = async (data, cb) => {
    if (!data.username) {
        promise.cbOrFail("Must specify username");
    }

    return store.insert(data.username, data, cb);
}