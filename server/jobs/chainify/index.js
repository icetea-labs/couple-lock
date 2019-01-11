require('dotenv').config();

const web3 = require('../../helpers/getWeb3');

const userTask = require('./user');
const proposeTask = require('./propose');
const memoryTask = require('./memory');

(async () => {
    await userTask.run(web3);
    await proposeTask.run(web3);
    await memoryTask.run(web3);

    process.exit();
})();
