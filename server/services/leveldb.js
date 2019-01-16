const _ = require("lodash");
var level = require('level');
const promise = require("../helpers/promise");
const DataStore = require("./datastore");

module.exports = class LevelStore extends DataStore {
    constructor() {
        super();
        this.db = level("db", {valueEncoding:'json'});
    }

    nsKey(key) {
        return this.namespace + ":" + key;
    }

    nsIs(key) {
        return key.startsWith(this.namespace + ":");
    }

    exist(key, cb) {
        return this.db.get(this.nsKey(key))
        .then(value => {
            return promise.cbOrSucceed(!!value, cb);
        })
    }

    one(key, cb) {
        return this.db.get(this.nsKey(key), cb);
    }

    list(condition, cb) {
        const prefix = this.namespace + ":";
        const arr = [];

        const stream = this.db.createReadStream({
            keys: false,
            gte: prefix,
            lte: String.fromCharCode(prefix.charCodeAt(0) + 1)
        });

        stream.on('data', (value) => {
            if (!condition) {
                arr.push(value);
            } else {
                _.each(condition, (cv, ck) => {
                    if (value[ck] == cv) {
                        arr.push(value);
                        return false;
                    }
                })
            }
        })

        if (cb) {
            stream.on('error', (error) => {
                cb(error);
            })
            stream.on('end', () => {
                cb(null, arr);
            })
        } else {
            return new Promise((resolve, reject) => {
                stream.on('error', (error) => {
                    reject(error);
                })
                stream.on('end', () => {
                    resolve(arr);
                })
            })
        }
    }

    all(cb) {
        return this.list(null, cb);
    }

    async insert(key, value, cb) {
        const fullKey = this.nsKey(key);
        const oldValue = await this.db.get(fullKey);
        if (oldValue) {
            return promise.cbOrFail("Key already exists", cb);
        } else {
            return this.db.put(this.nsKey(key), value, cb);
        }
    }

    async tryInsert(key, value, cb) {
        const fullKey = this.nsKey(key);
        let oldValue;
        try {
            oldValue = await this.db.get(fullKey);
        } catch (error) {
            oldValue = false;
        }

        if (!oldValue) {
            return this.db.put(fullKey, value, cb);
        } else {
            return promise.cbOrSucceed(false, cb);
        }
    }

    async update(key, newProps, cb) {
        const fullKey = this.nsKey(key);
        const value = await this.db.get(fullKey);
        if (!value) {
            return promise.cbOrFail("Key not found", cb);
        } else {
            return this.db.put(this.nsKey(key), Object.assign(value, newProps), cb);
        }
    }

    put(key, value, cb) {
        const fullKey = this.nsKey(key);
        const oldValue = this.bucket[fullKey];
        if (oldValue) {
            return this.db.put(this.nsKey(key), Object.assign(oldValue, value), cb);
        } else {
            return this.db.put(this.nsKey(key), value, cb);
        } 
    }

    deleteOne(key, cb) {
        return this.db.del(this.nsKey(key), cb)
    }

    deleteList(condition, cb) {
        throw new Error("Not implemented");
    }
}

