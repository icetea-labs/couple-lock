// load from RAM first, then load from disk
const promise = require("../helpers/promise");
const DataStore = require('./datastore');
const RamStore = require('./ram');
const LevelStore = require('./leveldb');

module.exports = class SmartStore extends DataStore {
    
    constructor(namespace) {
        super(namespace);
        this.ram = new RamStore(namespace);
        this.disk = new LevelStore(namespace);
    }

    async one(key, cb) {
        const ramValue = await this.ram.tryOne(key);
        if (ramValue) {
            console.log(`Value for ${this.namespace} ${key} got from RAM`);
            return promise.cbOrSucceed(ramValue, cb);
        }

        const diskValue = await this.disk.one(key);
        console.log(`Value for ${this.namespace} ${key} got from LevelDB`);
        this.ram.set(key, diskValue);
        return promise.cbOrSucceed(diskValue, cb);
    }

    list(condition, cb) {
        return this.disk.list(condition, cb);
    }

    async set(key, value, cb) {
        this.ram.set(key, value);
        return this.disk.set(key, value, cb);
    }

    async delete(key, cb) {
        this.ram.tryDelete(key);
        return this.disk.delete(key, cb);
    }
}