const _ = require("lodash");
var level = require('level');
const NsStore = require("./nsstore");
const dbEngine = level("db", {keyEncoding: 'ascii', valueEncoding:'json'});

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
}

