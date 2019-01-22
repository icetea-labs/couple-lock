require('dotenv').config();

const web3 = require('../../helpers/getWeb3');

const userTask = require('./user');
const proposeTask = require('./propose');
const memoryTask = require('./memory');
const async = require('async');

(async () => {
    async.series([
        function (callback) {
            userTask.run(web3,callback);
        }
        ,
        function (callback) {
            proposeTask.run(web3,callback);
        },
        function (callback) {
            memoryTask.run(web3,callback);
        }
    ],
    // optional callback
    function(err, results) {
        console.log("Index async.series: ",err, results);
        process.exit();
    });
})();
