const _ = require("lodash");
const promise = require("../helpers/promise");
const NsStore = require("./nsstore");

const storeBucket = {};

module.exports = class RamStore extends NsStore {
    constructor(namespace) {
        super(namespace);
        this.bucket = storeBucket;
    }

    nsFilter() {
        return _.pickBy(this.bucket, (value, key) => {
            return this.nsIs(key);
        })
    }

    one(key, cb) {
        const fullKey = this.nsKey(key);
        const value = this.bucket[fullKey];
        return promise.cbOrNotFound(value, fullKey, cb);
    }

    set(key, value, cb) {
        this.bucket[this.nsKey(key)] = value;
        return promise.cbOrSucceed(value, cb);
    }

    delete(key, cb) {
        const fullKey = this.nsKey(key);
        if (!this.bucket[fullKey]) {
            return promise.cbOrFail("Key not found", cb);
        } else {
            delete this.bucket[fullKey];
        }
    }

    list(condition, cb) {
        const items = this.nsFilter();
        let pickedItems;
        if (condition) {
            pickedItems = _.pickBy(items, (value) => {
                let picked = false;
                _.each(condition, (cv, ck) => {
                    if (value[ck] == cv) {
                        picked = true;
                        return false;
                    }
                })
                return picked;
            })
        } else {
            pickedItems = items;
        }
        return promise.cbOrSucceed(Object.values(pickedItems), cb);
    }
}

