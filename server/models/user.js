const promise = require("../helpers/promise");
const _store = require('../services/factory');

const store = () => {return _store.select('user')}

exports.one = (username, cb) => {
    return store().one(username, cb);
}

exports.all = (cb) => {
    return store().all(cb);
}

exports.insert = async (data, cb) => {
    if (data.username) {
        if (await store().one(data.username)) {
            return promise.cbOrFail("Username already exists");
        }
    } else {
        promise.cbOrFail("Must specify username");
    }

    return store().insert(data.username, data, cb);
}