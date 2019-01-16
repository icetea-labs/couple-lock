const _ = require("lodash");
const promise = require("../helpers/promise");
const DataStore = require("./datastore");

module.exports = class RamStore extends DataStore {
    constructor() {
        super();
        this.bucket = {};
    }

    nsKey(key) {
        return this.namespace + ":" + key;
    }

    nsIs(key) {
        return key.startsWith(this.namespace + ":");
    }

    nsFilter() {
        return _.pickBy(this.bucket, (value, key) => {
            return this.nsIs(key);
        })
    }

    exist(key, cb) {
        const fullKey = this.nsKey(key);
        const value = this.bucket[fullKey];
        return promise.cbOrSucceed(!!value, cb);
    }

    one(key, cb) {
        const fullKey = this.nsKey(key);
        const value = this.bucket[fullKey];
        return promise.cbOrNotFound(value, fullKey, cb);
    }

    list(condition, cb) {
        if (!condition) return this.all(cb);

        var items = this.nsFilter()
        var pickedItems = _.pickBy(items, (value) => {
            let picked = false;
            _.each(condition, (cv, ck) => {
                if (value[ck] == cv) {
                    picked = true;
                    return false;
                }
            })
            return picked;
        })
        return promise.cbOrSucceed(Object.values(pickedItems), cb);
    }

    all(cb) {
        return promise.cbOrSucceed(Object.values(this.nsFilter()), cb);
    }

    insert(key, value, cb) {
        const fullKey = this.nsKey(key);
        const oldValue = this.bucket[fullKey];
        if (oldValue) {
            return promise.cbOrFail("Key already exists", cb);
        } else {
            this.bucket[fullKey] = value;
            return promise.cbOrSucceed(value, cb);
        }
    }

    tryInsert(key, value, cb) {
        const fullKey = this.nsKey(key);
        const oldValue = this.bucket[fullKey];
        if (!oldValue) {
            this.bucket[fullKey] = value;
        }

        return promise.cbOrSucceed(!oldValue, cb);
    }

    update(key, newProps, cb) {
        const fullKey = this.nsKey(key);
        const value = this.bucket[fullKey];
        if (!value) {
            return promise.cbOrFail("Key not found", cb);
        } else {
            promise.cbOrSucceed(_.extend(this.bucket[fullKey], newProps || {}));
        }
    }

    put(key, value, cb) {
        const fullKey = this.nsKey(key);
        if (this.bucket[fullKey]) {
            return promise.cbOrSucceed(_.extend(this.bucket[fullKey], value || {}));
        } else {
            this.bucket[fullKey] = value;
            return promise.cbOrSucceed(value, cb);
        }
    }

    deleteOne(key, cb) {
        const fullKey = this.nsKey(key);
        if (!this.bucket[fullKey]) {
            return promise.cbOrFail("Key not found", cb);
        } else {
            delete this.bucket[fullKey];
        }
    }

    deleteList(condition, cb) {
        throw new Error("Not implemented");
    }
}

