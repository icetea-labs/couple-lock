const user = require("./user");
const store = require('../services/factory').getStore('noti');

exports.one = (notiId, cb) => {
  return store.one(notiId, cb);
}

exports.list = (username, cb) => {
  return store.list({ username }, cb)
}

exports.insert = async (data, cb) => {
  if (!data.id) {
    data.id = data.username + "_" + Date.now();
  }

  if (!data.username) {
    return promise.cbOrFail("Must specify username");
  }

  if (!await user.one(data.username)) {
    return promise.cbOrFail("username not found");
  }

  return store.insert(data.id, data, cb);
}

exports.update = (id, newProps, cb) => {
    if (newProps.id && newProps.id !== id) {
        return promise.cbOrFail("Changing key is not allowed")
    }
    if (newProps.username) {
        return promise.cbOrFail("Changing username is not allowed")
    }
    
    return store.update(id, newProps, cb);
}