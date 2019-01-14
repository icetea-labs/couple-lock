const _ = require('lodash');
const seeder = require('./seed');

const Store = require('./ram');
const store = module.exports = new Store();

if (process.env.NODE_ENV === "development") {
    // Seed some data for testing
    _.each(seeder, (value, namespace) => {
        store.select(namespace);
        _.each(value, item => {
            store.insert(item.username || item.id, item);
        });
    })
}