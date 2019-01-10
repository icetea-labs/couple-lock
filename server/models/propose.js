const promise = require("../helpers/promise");
const user = require("./user");
const _store = require('../services/factory');

const store = () => {return _store.select('propose')}

exports.one = (proposeId, cb) => {
    return store().one(proposeId, cb);
}

exports.list = async (username, cb) => {
    const userSent = await store().list({ sender: username });
    const userReceived = await store().list({ receiver: username });
    const combined = (userSent || []).concat(userReceived);
    return promise.cbOrSucceed(combined, cb);
}

exports.insert = async (data, cb) => {
    if (data.id) {
        if (await store().one(data.id)) {
            return promise.cbOrFail("Propose ID already exists");
        }
    } else {
        data.id = data.sender + "~" + Date.now();
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

    return store().insert(data.id, data, cb);
}