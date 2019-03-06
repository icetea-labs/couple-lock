const store = require('../services/factory').getStore('user');

exports.one = store.one.bind(store)
exports.tryOne = store.tryOne.bind(store)
exports.exist = store.exist.bind(store)
exports.all = store.all.bind(store)

exports.insert = async (data) => {
    if (!data.username) {
        Promise.reject("Must specify username");
    }

    return store.insert(data.username, data);
}