const _ = require('lodash');
const seeder = require('./seed');

const Store = require('./ram');
const store = module.exports = new Store();

// Seed some data for testing
_.each(seeder, (value, namespace) => {
    store.select(namespace);
    _.each(value, item => {
        store.insert(item.username || item.id, item);
    });
})
