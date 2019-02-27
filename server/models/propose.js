const promise = require("../helpers/promise");
const user = require("./user");
const store = require('../services/factory').getStore('propose');

exports.one = (proposeId, cb) => {
    return store.one(proposeId, cb);
}

exports.list = async (username, cb) => {
    return store.list({
        sender: username,
        receiver: username
    }, cb)
}

exports.insert = async (data, cb) => {
    if (!data.id) {
        data.id = data.sender + "_" + Date.now();
    }

    if (!data.sender || !data.receiver) {
        return promise.cbOrFail("Sender or receiver not found");
    }

    const sender = await user.one(data.sender);
    if (!sender) {
        return promise.cbOrFail("Sender not registered");
    }

    const receiver = await user.one(data.receiver);
    if (!receiver) {
        return promise.cbOrFail("Receiver not registered");
    }

    return store.insert(data.id, data, cb);
}

exports.update = (id, newProps, cb) => {
    if (newProps.id && newProps.id !== id) {
        return promise.cbOrFail("Changing key is not allowed")
    }
    if (newProps.sender) {
        return promise.cbOrFail("Changing sender is not allowed")
    }
    if (newProps.receiver) {
        return promise.cbOrFail("Changing receiver is not allowed")
    }
    
    return store.update(id, newProps, cb);
}