// store use namespace, like user:username

const DataStore = require("./datastore");

module.exports = class NsStore extends DataStore {
    nsKey(key) {
        return this.namespace + ":" + key;
    }

    nsIs(key) {
        return key.startsWith(this.namespace + ":");
    }

    setEngine(engine) {
        this.engine = engine;
    }

    getEngine() {
        return this.engine;
    }

    one(key, cb) {
        return this.engine.get(this.nsKey(key), cb);
    }

    set(key, value, cb) {
        return this.engine.put(this.nsKey(key), value, cb);
    }

    delete(key, cb) {
        return this.engine.del(this.nsKey(key), cb)
    }
}