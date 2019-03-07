const proposeModel = require("./propose");
const store = require('../services/factory').getStore('memory');
const tagModel = require('./tag')
const notiModel = require('./noti')

exports.one = store.one.bind(store)
exports.tryOne = store.tryOne.bind(store)
exports.exist = store.exist.bind(store)
exports.all = store.all.bind(store)
exports.list = store.list.bind(store)

exports.insert = async (data) => {
  if (!data.id) {
    data.id = data.proposeId + "_" + Date.now();
  }

  if (!data.proposeId) {
    return Promise.reject("Must specify proposeId");
  }

  const propose = await proposeModel.tryOne(data.proposeId)
  if (!propose) {
    return Promise.reject("Propose ID not found");
  }

  // Insert tags
  if (data.tags && data.tags.length) {
    tagModel.insert(data.tags)
  }

  return store.insert(data.id, data).then((whatever) => {
    // Insert noti
    notiModel.insert({
      username: propose.receiver,
      timestamp: Date.now(),
      event: 'memory.new',
      eventData: data
    })

    return whatever
  })
}