const promise = require("../helpers/promise");
const store = require('../services/factory')('user');

exports.one = (username, cb) => {
    return store.one(username, cb);
}

exports.all = (cb) => {
    return store.all(cb);
}

exports.insert = (data, cb) => {
    if (data.id) {
        return promise.cbOrFail(new Error("Setting propose ID is not allowed"));
    }

    if (!data.sender || !data.receiver) {
        return promise.cbOrFail(new Error("Sender or receiver not found"));
    }

    const sender = user.one(data.sender);
    if (!sender) {
        return promise.cbOrFail(new Error("Sender not registered"));
    }

    const receiver = user.one(data.receiver);
    if (!receiver) {
        return promise.cbOrFail(new Error("Receiver not registered"));
    }

    data.id = data.sender + "~" + Date.now();
    return store.insert(data.id, data, cb);
}