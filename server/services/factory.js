const _ = require('lodash');
const config = require('../config').get();
const Store = require('./' + config.datastore);

const stores = {};

module.exports = {
    getStore: (namespace) => {
        if (!stores[namespace]) {
            stores[namespace] = new Store(namespace);
        }
        return stores[namespace];
    }
}

console.log('CONFIG', config);

// Seed some data for testing
if (config.seed) {
    const seeder = require('./seed');
    const f = module.exports;
    _.each(seeder, (value, namespace) => {
        const store = f.getStore(namespace);
        _.each(value, item => {
            const key = item.username || item.id;
            store.tryInsert(key, item);
        });
    })
}

console.log('API http://localhost:5000/api');