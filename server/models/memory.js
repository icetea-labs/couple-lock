const propose = require("./propose");
const store = require('../services/factory').getStore('memory');

exports.one = (memoryId, cb) => {
  return store.one(memoryId, cb);
}

exports.list = (proposeId, cb) => {
  return store.list({ proposeId: proposeId }, cb)
}

exports.insert = async (data, cb) => {
  if (!data.id) {
    data.id = data.proposeId + "_" + Date.now();
  }

  if (!data.proposeId) {
    return promise.cbOrFail("Must specify proposeId");
  }

  if (!await propose.one(data.proposeId)) {
    return promise.cbOrFail("Propose ID not found");
  }

  return store.insert(data.id, data, cb);
}