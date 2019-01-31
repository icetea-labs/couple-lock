module.exports = class {
    static succeed(value) {
        return new Promise(resolve => {
            resolve(value);
        })
    }

    static fail(error) {
        return new Promise((resolve, reject) => {
            reject(error);
        })
    }

    static cbOrSucceed(value, cb) {
        if (cb) {
            cb(null, value);
        } else {
            return this.succeed(value);
        }
    }

    static cbOrFail(error, cb) {
        if (cb) {
            cb(error, {});
        } else {
            return this.fail(error);
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