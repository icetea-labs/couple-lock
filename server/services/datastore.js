const _ = require("lodash");
const promise = require("../helpers/promise");

// tags.includes => includes
// proposeId => proposeId
// tags.startsWith => startsWith
function _isMatched(ck, cv, value) {
    if (!ck.includes('.')) {
        return cv == (ck !== '_self' ? value[ck] : value);
    }

    const parts = ck.split('.')
    const resolvedValue = parts.reduce((obj, p) => {
        if (p) {
            if (typeof obj === 'undefined' || obj === null) {
                return obj
            }
            if (p.endsWith('()')) {
                obj = obj[p.slice(0, -2)].call(obj)
            } else {
                obj = typeof obj[p] === 'function' ? obj[p].bind(obj) : obj[p]
            }
        }
        return obj
    }, value)

    if (typeof resolvedValue === 'undefined' || resolvedValue === null) {
        return false
    }

    return typeof resolvedValue === 'function' ? !!resolvedValue(cv) : resolvedValue == cv
}

function _tryMatch(...args) {
    try {
        return _isMatched(...args)
    } catch (error) {
        console.error('Error when matching conditions, maybe syntax is wrong or property/function is misspelled.', error)
        return false
    }
}

module.exports = class DataStore {

    constructor(namespace) {
        this.namespace = namespace;
    }

    // set (put) one item
    set(key, value, cb) {
        throw new Error("Not implemented");
    }

    // delete one item
    delete(key, cb) {
        throw new Error("Not implemented");
    }

    // get one item
    one(key, cb) {
        throw new Error("Not implemented");
    }

    // get an array of items whose values met the specified condition
    list(condition, and = true, cb) {
        throw new Error("Not implemented");
    }

    // for use inside list
    match(condition, and, value) {
        if (!condition) {
            return true;
        } else {
            let andOK = true;
            let orOK = false;
            _.each(condition, (cv, ck) => {
                if (!_tryMatch(ck, cv, value)) {
                    andOK = false;
                    if (and) return false;
                } else {
                    orOK = true;
                    if (!and) return false;
                }
            })
            return and ? andOK : orOK
        }
    }

    async tryOne(key, cb) {
        try {
            return promise.cbOrSucceed(await this.one(key), cb);
        } catch (error) {
            return promise.cbOrSucceed(undefined, cb); 
        }
    }

    async exist(key, cb) {
        const value = await this.tryOne(key);
        return promise.cbOrSucceed(!!value, cb);
    }

    all(cb) {
        return this.list(null, cb);
    }

    // insert, error if already exists
    async insert(key, value, cb) {
        const existent = await this.exist(key);
        if (!existent) {
            return this.set(key, value, cb);
        } else {
            return promise.cbOrFail("Key already exists", cb);
        }
    }

    // insert, ignore if already exists
    async tryInsert(key, value, cb) {
        const oldValue = await this.tryOne(key);
        if (!oldValue) {
            return this.set(key, value, cb);
        } else {
            return promise.cbOrSucceed(false, cb);
        }
    }

    // update, error if not exists
    async update(key, newProps, cb) {
        const value = await this.one(key);
        const newValue = Object.assign(value, newProps);
        const promise = this.set(key, newValue).then(() => newValue);
        if (cb) {
            promise.then(value => cb(undefined, value), cb)
        } else {
            return promise
        }
    }

    // update, insert if not exist
    async updateOrInsert(key, value, cb) {
        const oldValue = await this.tryOne(key);
        if (oldValue) {
            return this.set(key, Object.assign(oldValue, value), cb);
        } else {
            return this.set(key, value, cb);
        } 
    }


    async tryDelete(key, cb) {
        const existent = await this.exist(key);
        if (existent) {
            return this.delete(key, cb);
        }
        return promise.cbOrSucceed(false, cb);
    }
}