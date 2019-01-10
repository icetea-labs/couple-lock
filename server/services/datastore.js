module.exports = class DataStore {
    // namespace = table in SQL
    namespace(namespace) {
        this.namespace = namespace;
        return this;
    }

    one(key) {
        throw new Error("Not implemented");
    }

    list(condition) {
        throw new Error("Not implemented");
    }

    all() {
        throw new Error("Not implemented")
    }

    insert(key, value) {
        throw new Error("Not implemented");
    }

    update(key, value) {
        throw new Error("Not implemented");
    }

    deleteOne(key) {
        throw new Error("Not implemented");
    }

    deleteList(condition) {
        throw new Error("Not implemented");
    }
}