const propose = require("propose");
const store = require('../services/factory')('memory');

exports.one = (memoryId, cb) => {
  return store.one(memoryId, cb);
}

exports.list = (proposeId, cb) => {
  return store.list({ proposeId: proposeId }, cb)
}

exports.insert = async (data, cb) => {
  if (data.id) {
    if (await store.one(data.id)) {
      return promise.cbOrFail(new Error("Memory ID already exists"));
    }
  } else {
    data.id = data.proposeId + "~" + Date.now();
  }

  if (!data.proposeId) {
    return promise.cbOrFail(new Error("Must specify proposeId"));
  }

  if (await propose.one(data.proposeId)) {
    return promise.cbOrFail(new Error("Propose ID not found"));
  }

  return store.insert(data.id, data, cb);
}