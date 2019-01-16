const _ = require('lodash');
const config = require('../config').get();
const seeder = require('./seed');

const Store = require('./' + config.datastore);
const store = module.exports = new Store();

console.log('CONFIG', config);

if (config.seed) {
    // Seed some data for testing
    _.each(seeder, (value, namespace) => {
        store.select(namespace);
        _.each(value, item => {
            const key = item.username || item.id;
            store.tryInsert(key, item);
        });
    })
}

console.log('API http://localhost:5000/api');