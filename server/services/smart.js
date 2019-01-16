// load from RAM first, then load from disk

module.exports = class SmartStore {
    
    constructor(ram, disk) {
        this.ram = ram;
        this.disk = disk;
    }

    exist(key, cb) {
        throw new Error("Not implemented");
    }

    one(key, cb) {
        throw new Error("Not implemented");
    }

    list(condition, cb) {
        throw new Error("Not implemented");
    }

    all(cb) {
        throw new Error("Not implemented")
    }

    insert(key, value, cb) {
        throw new Error("Not implemented");
    }

    tryInsert(key, value, cb) {
        throw new Error("Not implemented");
    }

    update(key, newProps, cb) {
        throw new Error("Not implemented");
    }

    put(key, value, cb) {
        throw new Error("Not implemented");
    }

    deleteOne(key, cb) {
        throw new Error("Not implemented");
    }

    deleteList(condition, cb) {
        throw new Error("Not implemented");
    }
}