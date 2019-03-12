const userModel = require("./user");
const store = require('../services/factory').getStore('noti');

exports.one = store.one.bind(store)
exports.tryOne = store.tryOne.bind(store)
exports.exist = store.exist.bind(store)
exports.all = store.all.bind(store)
exports.list = store.list.bind(store)

exports.insert = async (data) => {
  if (!data.id) {
    data.id = data.username + "_" + Date.now();
  }

  if (!data.username) {
    return Promise.reject("Must specify username");
  }

  if (!await userModel.exist(data.username)) {
    return Promise.reject("username not found");
  }

  return store.insert(data.id, data);
}

exports.update = (id, newProps) => {
    if (newProps.id && newProps.id !== id) {
        return Promise.reject("Changing key is not allowed")
    }
    if (newProps.username) {
        return Promise.reject("Changing username is not allowed")
    }
    
    return store.update(id, newProps);
}