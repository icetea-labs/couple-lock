module.exports = new class {
    succeed(value) {
        return new Promise(resolve => {
            resolve(value);
        })
    }

    fail(error) {
        return new Promise((resolve, reject) => {
            reject(error);
        })
    }

    cbOrSucceed(value, cb) {
        if (cb) {
            cb(null, value);
        } else {
            return this.succeed(value);
        }
    }

    cbOrFail(error, cb) {
        if (cb) {
            cb(error, {});
        } else {
            return this.fail(error);
        }
    }
}();