const store = require('../services/factory').getStore('tag');

exports.all = async () => {
  return store.tryOne('tags').then(tags => tags || [])
}

exports.insert = async tags => {
  if (!tags) {
    return Promise.reject("Must specify tag value");
  }

  if (!Array.isArray(tags)) {
    tags = [String(tags)]
  }

  const existingTags = await exports.all()

  // merge two tags
  const newTags = [...new Set([...existingTags, ...tags])];

  return store.insert('tags', newTags);
}
