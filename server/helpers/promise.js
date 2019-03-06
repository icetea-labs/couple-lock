module.exports = class {
    static cbOrSucceed(value, cb) {
        if (cb) {
            cb(null, value);
        } else {
            return Promise.resolve(value);
        }
    }

    static cbOrFail(error, cb) {
        if (cb) {
            cb(error, {});
        } else {
            return Promise.reject(error);
        }
    }

    static cbOrAny(value, error, cb) {
        if (value) {
            return this.cbOrSucceed(value, cb);
        } else {
            return this.cbOrFail(error, cb);
        }
    }

    static cbOrNotFound(value, key, cb) {
        return this.cbOrAny(value, key + " not found", cb);
    }
};