const _ = require("lodash");
var level = require('level');
const NsStore = require("./nsstore");
const dbEngine = level("db", { keyEncoding: 'ascii', valueEncoding: 'json' });

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

module.exports = class LevelStore extends NsStore {
    constructor(namespace) {
        super(namespace);
        this.setEngine(dbEngine);
    }

    list(condition, cb) {
        const prefix = this.namespace + ":";
        const arr = [];

        const stream = this.getEngine().createReadStream({
            keys: false,
            gte: prefix,
            lte: String.fromCharCode(prefix.charCodeAt(0) + 1)
        });

        stream.on('data', (value) => {
            if (!condition) {
                arr.push(value);
            } else {
                let ok = true
                _.each(condition, (cv, ck) => {
                    if (!_tryMatch(ck, cv, value)) {
                        ok = false
                        return false;
                    }
                })
                ok && arr.push(value);
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
}

