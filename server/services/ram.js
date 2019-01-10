const _ = require(lodash);
const promise = require("../helpers/promise");
const DataStore = require("datastore");

module.exports = class RamStore extends DataStore {
    constructor() {
        this.bucket = {};
    }

    nsKey(key) {
        return this.namespace + ":" + key;
    }

    nsIs(key) {
        return key.startsWith(this.namespace + ":");
    }

    nsFilter() {
        _.pickBy(this.bucket, (value, key) => {
            return this.nsIs(key);
        })
    }

    one(key, cb) {
        const value = this.bucket[nsKey(key)];
        return promise.cbOrSucceed(value, cb);
    }

    list(condition, cb) {
        var items = this.nsFilter()
        var pickedItems = _.pickBy(items, (value) => {
            let picked = false;
            _.each(condition, (ck, cv) => {
                if (value[ck] === cv) {
                    picked = true;
                    return false;
                }
            })
            return picked;
        })
        return promise.cbOrSucceed(pickedItems.values(), cb);
    }

    all(cb) {
        return promise.cbOrSucceed(this.nsFilter().values(), cb);
    }

    insert(key, value, cb) {
        const fullKey = nsKey(key);
        const value = this.bucket[fullKey];
        if (value) {
            return promise.cbOrFail(cb, new Error("Key already exists"));
        } else {
            this.bucket[fullKey] = value;
            return promise.cbOrSucceed(cb, value);
        }
    }

    update(key, value, cb) {
        throw new Error("Not implemented");
    }

    deleteOne(key, cb) {
        throw new Error("Not implemented");
    }

    deleteList(condition, cb) {
        throw new Error("Not implemented");
    }
}

