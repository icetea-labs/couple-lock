const userModel = require("./user");
const notiModel = require('./noti')
const store = require('../services/factory').getStore('propose');

exports.one = store.one.bind(store)
exports.tryOne = store.tryOne.bind(store)
exports.exist = store.exist.bind(store)
exports.all = store.all.bind(store)

exports.list = async (username) => {
    return store.list({
        sender: username,
        receiver: username
    })
}

exports.insert = async (data) => {
    if (!data.id) {
        data.id = data.sender + "_" + Date.now();
    }

    if (!data.sender || !data.receiver) {
        return Promise.reject("Sender or receiver not found");
    }

    if (!await userModel.exist(data.sender)) {
        return Promise.reject("Sender not registered");
    }

    if (!await userModel.exist(data.receiver)) {
        return Promise.reject("Receiver not registered");
    }

    return store.insert(data.id, data).then (whatever => {
        // Add a noti
        notiModel.insert({
            username: data.receiver,
            timestamp: Date.now(),
            event: 'propose.request',
            eventData: data
        })

        return whatever
    })
}

exports.update = (id, newProps) => {
    if (newProps.id && newProps.id !== id) {
        return Promise.reject("Changing key is not allowed")
    }
    if (newProps.sender) {
        return Promise.reject("Changing sender is not allowed")
    }
    if (newProps.receiver) {
        return Promise.reject("Changing receiver is not allowed")
    }

    return store.update(id, newProps).then(data => {
        // Add a noti
        notiModel.insert({
            username: data.sender,
            timestamp: Date.now(),
            event: 'propose.reply',
            eventData: data
        })

        return data
    })
}