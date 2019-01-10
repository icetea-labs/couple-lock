module.exports = class DataStore {
    // namespace = table in SQL
    select(namespace) {
        this.namespace = namespace;
        return this;
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