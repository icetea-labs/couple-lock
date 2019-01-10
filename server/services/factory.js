const _ = require(lodash);
const seeder = require('Seed');

const store = new require('ramstore')();

// Seed some data for testing
_.each(seeder, (value, namespace) => {
    store.namespace(namespace);
    _.each(value, item => {
        store.insert(item.id, item);
    });
})

module.exports = (namespace) => {
    return store.namespace(namespace);
}